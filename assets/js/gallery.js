/**
 * ZHANANGBHOOMI - Gallery Filter & Interactive Lightbox JavaScript
 * Responsive masonry grid filtering & accessible lightbox modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
  initGalleryLightbox();
});

/* ==========================================================================
   1. GALLERY CATEGORY FILTER
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.filter;

      // Active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      // Filter gallery cards
      galleryItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   2. INTERACTIVE LIGHTBOX MODAL
   ========================================================================== */
function initGalleryLightbox() {
  const galleryGrid = document.querySelector('.gallery-grid');
  if (!galleryGrid) return;

  // Create Modal DOM Structure
  const modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Image preview lightbox');
  modal.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-container">
      <button type="button" class="lightbox-close" aria-label="Close image lightbox">&times;</button>
      <button type="button" class="lightbox-prev" aria-label="Previous image">&#10094;</button>
      <div class="lightbox-content">
        <div class="lightbox-image-wrapper">
          <img src="" alt="" class="lightbox-img">
        </div>
        <div class="lightbox-caption"></div>
      </div>
      <button type="button" class="lightbox-next" aria-label="Next image">&#10095;</button>
    </div>
  `;

  document.body.appendChild(modal);

  const imgEl = modal.querySelector('.lightbox-img');
  const captionEl = modal.querySelector('.lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');
  const prevBtn = modal.querySelector('.lightbox-prev');
  const nextBtn = modal.querySelector('.lightbox-next');
  const overlay = modal.querySelector('.lightbox-overlay');

  let activeIndex = -1;
  let visibleItems = [];

  function updateVisibleItems() {
    const allItems = Array.from(document.querySelectorAll('.gallery-item'));
    visibleItems = allItems.filter(item => item.style.display !== 'none');
  }

  function openLightbox(index) {
    updateVisibleItems();
    if (index < 0 || index >= visibleItems.length) return;

    activeIndex = index;
    const targetItem = visibleItems[activeIndex];
    const image = targetItem.querySelector('img');
    const title = targetItem.querySelector('.gallery-title')?.textContent || '';
    const desc = targetItem.querySelector('.gallery-desc')?.textContent || '';

    if (image) {
      imgEl.src = image.getAttribute('data-full-src') || image.src;
      imgEl.alt = image.alt || title;
      captionEl.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(desc)}</p>`;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      imgEl.src = '';
    }, 300);
  }

  function showPrev() {
    updateVisibleItems();
    if (!visibleItems.length) return;
    activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(activeIndex);
  }

  function showNext() {
    updateVisibleItems();
    if (!visibleItems.length) return;
    activeIndex = (activeIndex + 1) % visibleItems.length;
    openLightbox(activeIndex);
  }

  // Attach Click Handlers to Gallery Trigger Cards
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (card) {
      const item = card.closest('.gallery-item');
      if (item) {
        updateVisibleItems();
        const index = visibleItems.indexOf(item);
        if (index !== -1) {
          openLightbox(index);
        }
      }
    }
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
