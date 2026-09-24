/**
 * ZHANANGBHOOMI - High-Performance Interactive Gallery & Lightbox
 * Features: Category Filtering, Album Collections, Photo Grid, Mobile Swipe Lightbox & Dual Language Sync
 */

(function () {
  'use strict';

  let currentCategory = 'all';
  let activeAlbumId = null; // null means viewing albums list or all photos grid
  let viewMode = 'albums'; // 'albums' or 'photos'
  let searchQuery = '';
  let activeLightboxIndex = -1;
  let activeLightboxImages = []; // List of image objects currently loaded in lightbox

  document.addEventListener('DOMContentLoaded', () => {
    initGalleryApp();
  });

  function initGalleryApp() {
    if (typeof GALLERY_ALBUMS === 'undefined' || typeof GALLERY_CATEGORIES === 'undefined') {
      console.warn('Gallery data files not loaded.');
      return;
    }

    renderCategoryFilters();
    renderGalleryView();
    initLightboxModal();
    initGallerySearch();
    initLanguageObserver();
  }

  /**
   * Get current language ('en' or 'hi')
   */
  function getLang() {
    return localStorage.getItem('zbhoomi_lang') || document.documentElement.lang || 'en';
  }

  /**
   * Render Category Filter Tab Buttons dynamically
   */
  function renderCategoryFilters() {
    const filterContainer = document.getElementById('gallery-category-filters');
    if (!filterContainer) return;

    const lang = getLang();

    let html = '';
    GALLERY_CATEGORIES.forEach(cat => {
      const isActive = cat.id === currentCategory ? 'active' : '';
      const label = cat.label[lang] || cat.label['en'];
      
      // Calculate count of albums for this category
      let count = 0;
      if (cat.id === 'all') {
        count = GALLERY_ALBUMS.length;
      } else {
        count = GALLERY_ALBUMS.filter(a => a.category === cat.id).length;
      }

      html += `
        <button type="button" 
                class="gallery-filter-btn ${isActive}" 
                data-category="${cat.id}"
                aria-pressed="${cat.id === currentCategory}">
          <span class="filter-label">${escapeHtml(label)}</span>
          <span class="filter-count">${count}</span>
        </button>
      `;
    });

    filterContainer.innerHTML = html;

    // Attach click events
    const filterBtns = filterContainer.querySelectorAll('.gallery-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.dataset.category;
        setCategoryFilter(cat);
      });
    });
  }

  function setCategoryFilter(category) {
    currentCategory = category;
    activeAlbumId = null; // Reset album detail view when changing category
    renderCategoryFilters();
    renderGalleryView();
  }

  /**
   * Main render dispatcher for Gallery content
   */
  function renderGalleryView() {
    const container = document.getElementById('gallery-content-area');
    if (!container) return;

    const lang = getLang();

    // If an album is opened, render single album detail view
    if (activeAlbumId) {
      renderAlbumDetail(container, lang);
      return;
    }

    // Otherwise render based on viewMode ('albums' or 'photos')
    if (viewMode === 'albums') {
      renderAlbumsGrid(container, lang);
    } else {
      renderAllPhotosGrid(container, lang);
    }
  }

  /**
   * Render Albums Collection Grid
   */
  function renderAlbumsGrid(container, lang) {
    let filteredAlbums = GALLERY_ALBUMS;

    if (currentCategory !== 'all') {
      filteredAlbums = filteredAlbums.filter(a => a.category === currentCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredAlbums = filteredAlbums.filter(a => {
        const title = (a.title[lang] || a.title['en']).toLowerCase();
        const desc = (a.description[lang] || a.description['en']).toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }

    if (filteredAlbums.length === 0) {
      const noResText = typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang]?.gallery_no_results 
        ? TRANSLATIONS[lang].gallery_no_results 
        : 'No albums found matching this filter.';
      container.innerHTML = `<div class="gallery-empty-state"><p>${escapeHtml(noResText)}</p></div>`;
      return;
    }

    let html = `
      <div class="gallery-albums-grid">
    `;

    filteredAlbums.forEach(album => {
      const title = album.title[lang] || album.title['en'];
      const desc = album.description[lang] || album.description['en'];
      const photoCount = album.images.length;
      const categoryObj = GALLERY_CATEGORIES.find(c => c.id === album.category);
      const categoryLabel = categoryObj ? (categoryObj.label[lang] || categoryObj.label['en']) : album.category;
      const openBtnText = typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang]?.gallery_open_album
        ? TRANSLATIONS[lang].gallery_open_album
        : 'Explore Album →';

      html += `
        <article class="album-card reveal active" data-album-id="${album.id}">
          <div class="album-card-image-wrapper">
            <img src="${album.coverImage}" 
                 alt="${escapeHtml(title)}" 
                 loading="lazy" 
                 width="400" 
                 height="260"
                 class="album-cover-img">
            <span class="album-category-badge">${escapeHtml(categoryLabel)}</span>
            <span class="album-count-badge">📷 ${photoCount} ${typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang]?.gallery_photos_count ? TRANSLATIONS[lang].gallery_photos_count : 'Photos'}</span>
          </div>
          <div class="album-card-body">
            <div class="album-meta-line">
              <span class="album-date">📅 ${escapeHtml(album.date)}</span>
              <span class="album-location">📍 ${escapeHtml(album.location)}</span>
            </div>
            <h3 class="album-card-title">${escapeHtml(title)}</h3>
            <p class="album-card-desc">${escapeHtml(desc)}</p>
            <button type="button" class="btn-explore-album">${escapeHtml(openBtnText)}</button>
          </div>
        </article>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // Attach click handlers to open album
    const albumCards = container.querySelectorAll('.album-card');
    albumCards.forEach(card => {
      card.addEventListener('click', () => {
        activeAlbumId = card.dataset.albumId;
        renderGalleryView();
        window.scrollTo({ top: container.offsetTop - 120, behavior: 'smooth' });
      });
    });
  }

  /**
   * Render Album Detail View (Photo Grid for a specific album)
   */
  function renderAlbumDetail(container, lang) {
    const album = GALLERY_ALBUMS.find(a => a.id === activeAlbumId);
    if (!album) {
      activeAlbumId = null;
      renderGalleryView();
      return;
    }

    const title = album.title[lang] || album.title['en'];
    const desc = album.description[lang] || album.description['en'];
    const categoryObj = GALLERY_CATEGORIES.find(c => c.id === album.category);
    const categoryLabel = categoryObj ? (categoryObj.label[lang] || categoryObj.label['en']) : album.category;
    const backBtnText = typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang]?.gallery_back_to_albums
      ? TRANSLATIONS[lang].gallery_back_to_albums
      : '← Back to All Albums';

    let html = `
      <div class="album-detail-header">
        <button type="button" class="btn-back-to-albums" id="js-back-to-albums">
          ${escapeHtml(backBtnText)}
        </button>
        <div class="album-detail-meta">
          <span class="badge badge-gold">${escapeHtml(categoryLabel)}</span>
          <span class="album-detail-date">📅 ${escapeHtml(album.date)} &bull; 📍 ${escapeHtml(album.location)}</span>
        </div>
        <h2 class="album-detail-title">${escapeHtml(title)}</h2>
        <p class="album-detail-desc">${escapeHtml(desc)}</p>
      </div>

      <div class="gallery-photo-grid">
    `;

    album.images.forEach((img, idx) => {
      const imgTitle = img.title[lang] || img.title['en'];
      const imgDesc = img.description[lang] || img.description['en'];

      html += `
        <div class="gallery-photo-item reveal active" data-img-index="${idx}">
          <div class="gallery-photo-card" role="button" tabindex="0" aria-label="${escapeHtml(imgTitle)}">
            <img src="${img.thumb}" 
                 data-full-src="${img.full}" 
                 alt="${escapeHtml(imgTitle)}" 
                 loading="lazy"
                 width="400"
                 height="280">
            <div class="gallery-photo-overlay">
              <span class="gallery-zoom-icon">🔍</span>
              <h4 class="gallery-photo-title">${escapeHtml(imgTitle)}</h4>
              <p class="gallery-photo-desc">${escapeHtml(imgDesc)}</p>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // Attach Back Button event
    const backBtn = container.querySelector('#js-back-to-albums');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        activeAlbumId = null;
        renderGalleryView();
      });
    }

    // Attach Photo Click & Keyboard events for Lightbox
    activeLightboxImages = album.images;
    const photoCards = container.querySelectorAll('.gallery-photo-card');
    photoCards.forEach(card => {
      const idx = parseInt(card.closest('.gallery-photo-item').dataset.imgIndex, 10);
      
      card.addEventListener('click', () => openLightbox(idx));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });
  }

  /**
   * Render All Photos Grid View across all albums
   */
  function renderAllPhotosGrid(container, lang) {
    let allImages = [];
    GALLERY_ALBUMS.forEach(album => {
      if (currentCategory === 'all' || album.category === currentCategory) {
        album.images.forEach(img => {
          allImages.push({
            ...img,
            albumTitle: album.title[lang] || album.title['en'],
            albumCategory: album.category
          });
        });
      }
    });

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      allImages = allImages.filter(img => {
        const title = (img.title[lang] || img.title['en']).toLowerCase();
        const desc = (img.description[lang] || img.description['en']).toLowerCase();
        return title.includes(q) || desc.includes(q);
      });
    }

    if (allImages.length === 0) {
      const noResText = typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang]?.gallery_no_results 
        ? TRANSLATIONS[lang].gallery_no_results 
        : 'No photos found.';
      container.innerHTML = `<div class="gallery-empty-state"><p>${escapeHtml(noResText)}</p></div>`;
      return;
    }

    activeLightboxImages = allImages;

    let html = `<div class="gallery-photo-grid">`;

    allImages.forEach((img, idx) => {
      const imgTitle = img.title[lang] || img.title['en'];
      const imgDesc = img.description[lang] || img.description['en'];

      html += `
        <div class="gallery-photo-item reveal active" data-img-index="${idx}">
          <div class="gallery-photo-card" role="button" tabindex="0" aria-label="${escapeHtml(imgTitle)}">
            <img src="${img.thumb}" 
                 data-full-src="${img.full}" 
                 alt="${escapeHtml(imgTitle)}" 
                 loading="lazy"
                 width="400"
                 height="280">
            <div class="gallery-photo-overlay">
              <span class="gallery-zoom-icon">🔍</span>
              <span class="gallery-photo-album-tag">${escapeHtml(img.albumTitle)}</span>
              <h4 class="gallery-photo-title">${escapeHtml(imgTitle)}</h4>
              <p class="gallery-photo-desc">${escapeHtml(imgDesc)}</p>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    const photoCards = container.querySelectorAll('.gallery-photo-card');
    photoCards.forEach(card => {
      const idx = parseInt(card.closest('.gallery-photo-item').dataset.imgIndex, 10);
      card.addEventListener('click', () => openLightbox(idx));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });
  }

  /**
   * Search / View Toggle Bar Handlers
   */
  function initGallerySearch() {
    const searchInput = document.getElementById('gallery-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderGalleryView();
      });
    }

    const viewAlbumsBtn = document.getElementById('btn-view-albums');
    const viewPhotosBtn = document.getElementById('btn-view-photos');

    if (viewAlbumsBtn && viewPhotosBtn) {
      viewAlbumsBtn.addEventListener('click', () => {
        viewMode = 'albums';
        activeAlbumId = null;
        viewAlbumsBtn.classList.add('active');
        viewPhotosBtn.classList.remove('active');
        renderGalleryView();
      });

      viewPhotosBtn.addEventListener('click', () => {
        viewMode = 'photos';
        activeAlbumId = null;
        viewPhotosBtn.classList.add('active');
        viewAlbumsBtn.classList.remove('active');
        renderGalleryView();
      });
    }
  }

  /**
   * Lightbox Modal & Mobile Touch Handling
   */
  let modal, modalImg, modalTitle, modalDesc, modalCounter, modalClose, modalPrev, modalNext;
  let touchStartX = 0;
  let touchEndX = 0;

  function initLightboxModal() {
    modal = document.getElementById('lightbox-modal');
    if (!modal) {
      // Create Lightbox Modal element if not present in HTML
      modal = document.createElement('div');
      modal.id = 'lightbox-modal';
      modal.className = 'lightbox-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Image Lightbox Viewer');
      modal.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-container">
          <div class="lightbox-top-bar">
            <span class="lightbox-counter"></span>
            <button type="button" class="lightbox-close" aria-label="Close Lightbox">&times;</button>
          </div>
          <button type="button" class="lightbox-prev" aria-label="Previous Image">&#10094;</button>
          <div class="lightbox-content">
            <div class="lightbox-image-wrapper">
              <div class="lightbox-spinner"></div>
              <img src="" alt="" class="lightbox-img">
            </div>
            <div class="lightbox-caption">
              <h3 class="lightbox-title"></h3>
              <p class="lightbox-desc"></p>
            </div>
          </div>
          <button type="button" class="lightbox-next" aria-label="Next Image">&#10095;</button>
        </div>
      `;
      document.body.appendChild(modal);
    }

    modalImg = modal.querySelector('.lightbox-img');
    modalTitle = modal.querySelector('.lightbox-title');
    modalDesc = modal.querySelector('.lightbox-desc');
    modalCounter = modal.querySelector('.lightbox-counter');
    modalClose = modal.querySelector('.lightbox-close');
    modalPrev = modal.querySelector('.lightbox-prev');
    modalNext = modal.querySelector('.lightbox-next');

    const overlay = modal.querySelector('.lightbox-overlay');

    if (modalClose) modalClose.addEventListener('click', closeLightbox);
    if (overlay) overlay.addEventListener('click', closeLightbox);
    if (modalPrev) modalPrev.addEventListener('click', showPrevPhoto);
    if (modalNext) modalNext.addEventListener('click', showNextPhoto);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevPhoto();
      if (e.key === 'ArrowRight') showNextPhoto();
    });

    // Touch Swipe Support for Mobile Devices
    const imgWrapper = modal.querySelector('.lightbox-content');
    if (imgWrapper) {
      imgWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      imgWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
      }, { passive: true });
    }
  }

  function handleSwipeGesture() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        showNextPhoto();
      } else {
        showPrevPhoto();
      }
    }
  }

  function openLightbox(index) {
    if (index < 0 || index >= activeLightboxImages.length) return;

    activeLightboxIndex = index;
    updateLightboxContent();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set focus to close button for keyboard accessibility
    if (modalClose) modalClose.focus();
  }

  function updateLightboxContent() {
    if (activeLightboxIndex < 0 || activeLightboxIndex >= activeLightboxImages.length) return;

    const imgData = activeLightboxImages[activeLightboxIndex];
    const lang = getLang();

    const title = imgData.title[lang] || imgData.title['en'];
    const desc = imgData.description[lang] || imgData.description['en'];

    const fullSrc = imgData.full || imgData.thumb;

    modalImg.style.opacity = '0.4';
    modalImg.src = fullSrc;
    modalImg.alt = title;

    modalImg.onload = () => {
      modalImg.style.opacity = '1';
    };

    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalCounter) {
      modalCounter.textContent = `${activeLightboxIndex + 1} / ${activeLightboxImages.length}`;
    }
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (modalImg) modalImg.src = '';
    }, 300);
  }

  function showPrevPhoto() {
    if (activeLightboxImages.length === 0) return;
    activeLightboxIndex = (activeLightboxIndex - 1 + activeLightboxImages.length) % activeLightboxImages.length;
    updateLightboxContent();
  }

  function showNextPhoto() {
    if (activeLightboxImages.length === 0) return;
    activeLightboxIndex = (activeLightboxIndex + 1) % activeLightboxImages.length;
    updateLightboxContent();
  }

  /**
   * Listen to global language switches from main.js
   */
  function initLanguageObserver() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          renderCategoryFilters();
          renderGalleryView();
          if (modal && modal.classList.contains('active')) {
            updateLightboxContent();
          }
        }, 50);
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

})();
