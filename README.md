# ZHANANGBHOOMI - Static Website & Deployment Guide

Welcome to the official static website repository for **ZHANANGBHOOMI** (*Buddhist Meditation & Vipassana Centre / Maitreya Medical Meditation Monastery*).

This is a **100% static, production-ready website** built with HTML5, modern custom CSS3, Vanilla JavaScript, and SVG vector graphics. It requires no server-side execution (No Node.js, Python, PHP, or Database) and is ready for instant deployment to any standard **cPanel shared web hosting account**.

---

## Table of Contents

1. [Project Directory Structure](#1-project-directory-structure)
2. [cPanel Deployment Instructions](#2-cpanel-deployment-instructions)
3. [Connecting Your Domain & Configuring HTTPS](#3-connecting-your-domain--configuring-https)
4. [Central Configuration (`assets/js/config.js`)](#4-central-configuration-assetsjsconfigjs)
5. [How to Customize Content & Media](#5-how-to-customize-content--media)
   - [A. Changing Contact Details & Social Links](#a-changing-contact-details--social-links)
   - [B. Updating Bank & UPI Details](#b-updating-bank--upi-details)
   - [C. Replacing the UPI QR Code](#c-replacing-the-upi-qr-code)
   - [D. Replacing & Adding Gallery Images](#d-replacing--adding-gallery-images)
   - [E. Updating Course Registration Portal Subdomain Link](#e-updating-course-registration-portal-subdomain-link)
   - [F. Updating Google Maps Embed & Directions Link](#f-updating-google-maps-embed--directions-link)
   - [G. Updating Courses & Programs](#g-updating-courses--programs)
   - [H. Updating Awards & Certificates](#h-updating-awards--certificates)
6. [Submitting Sitemap to Google Search Console](#6-submitting-sitemap-to-google-search-console)
7. [Pre-Flight Checklist Before Going Live](#7-pre-flight-checklist-before-going-live)

---

## 1. Project Directory Structure

```
zbhoomi_web3/
├── index.html                  # Home page
├── about.html                  # About Us page
├── programs.html               # Programs & Courses (with Medical Meditation Disclaimer)
├── gallery.html                # Photo Gallery (Category filterable + Lightbox)
├── awards.html                 # Awards & Recognition page
├── donation.html               # Donation page (UPI QR + Bank Transfer details)
├── contact.html                # Contact Us page (Contact info, Form, Maps)
├── privacy-policy.html         # Static Privacy Policy
├── disclaimer.html             # Site & Medical Disclaimer
├── robots.txt                  # Search engine crawler instructions
├── sitemap.xml                 # XML Sitemap for Search Engine Indexing
├── README.md                   # This Deployment & Maintenance Manual
└── assets/
    ├── css/
    │   ├── style.css           # Main CSS (Variables, Flexbox/Grid, Responsive 320px-1440px+)
    │   └── animation.css       # Scroll reveal & spiritual transitions
    ├── js/
    │   ├── config.js           # Central configuration for Phone, Email, WhatsApp, Maps & Bank
    │   ├── main.js             # Mobile drawer, sticky header transition, quote rotator
    │   └── gallery.js          # Filterable grid & interactive modal lightbox
    └── images/
        ├── logo/
        │   └── logo-mark.svg   # Vector Lotus & Dharma Wheel SVG logo mark
        ├── hero/
        │   ├── hero-bg.svg     # Hero section background pattern
        │   └── monastery-bg.svg# Monastery showcase banner background
        ├── programs/           # Course SVG graphic placeholders (vipassana, medical-meditation, etc.)
        ├── gallery/            # Gallery SVG placeholders (gallery-1.svg to gallery-10.svg)
        ├── awards/
        │   └── award-placeholder.svg # Award badge SVG emblem
        └── donation/
            └── donation-qr.svg # UPI QR code SVG placeholder
```

---

## 2. cPanel Deployment Instructions

Follow these step-by-step instructions to deploy your website on cPanel:

1. **Compress Website Files**:
   - On your local computer, select all files inside the `zbhoomi_web3` directory (`index.html`, `about.html`, `assets/`, etc.).
   - Create a single `.zip` file (e.g., `zhanangbhoomi_website.zip`).

2. **Log in to cPanel**:
   - Open your browser and navigate to your cPanel login URL (e.g., `https://yourdomain.com:2083` or `https://cpanel.yourhostingprovider.com`).
   - Enter your cPanel username and password.

3. **Navigate to File Manager**:
   - In cPanel, under the **Files** section, click on **File Manager**.
   - Navigate into the **`public_html`** directory.

4. **Upload the ZIP File**:
   - Click the **Upload** button in the top toolbar.
   - Select your `zhanangbhoomi_website.zip` file and wait for the upload progress bar to turn green (100%).

5. **Extract Files**:
   - Return to `public_html` in File Manager.
   - Click on `zhanangbhoomi_website.zip`, then click **Extract** in the top toolbar.
   - Specify `public_html` as the extraction target and click **Extract Files**.
   - Delete the `.zip` file after extraction to save server space.

6. **Verify File Placement**:
   - Ensure that `index.html` is directly inside `public_html` (i.e., `public_html/index.html`), NOT inside a nested subfolder like `public_html/zbhoomi_web3/index.html`.

---

## 3. Connecting Your Domain & Configuring HTTPS

1. **DNS Settings**:
   - Point your domain's **A Record** (`zhanangbhoomi.org`) to your cPanel server's IP address.
   - Ensure `www.zhanangbhoomi.org` points to `zhanangbhoomi.org`.

2. **SSL / HTTPS Setup**:
   - In cPanel, find **AutoSSL** or **SSL/TLS Status**.
   - Select `zhanangbhoomi.org` and click **Run AutoSSL** to issue a free Let's Encrypt SSL certificate.
   - In File Manager, ensure your `.htaccess` file redirects all HTTP traffic to HTTPS:
     ```apache
     RewriteEngine On
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
     ```

---

## 4. Central Configuration (`assets/js/config.js`)

Most phone numbers, email addresses, portal links, WhatsApp parameters, and bank details can be updated in a single file without modifying HTML code.

Open `assets/js/config.js`:

```javascript
const ZHANANG_CONFIG = {
  siteName: "ZHANANGBHOOMI",
  siteTagline: "Buddhist Meditation & Vipassana Centre",
  monasteryTitle: "Maitreya Medical Meditation Monastery",
  
  // Registration Portal Subdomain URL
  portalUrl: "https://course.zhanangbhoomi.org",
  
  // Primary Domain
  domain: "https://zhanangbhoomi.org",

  // Contact Information
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210", // Format: Country code without +
  whatsappMessage: "Hello, I would like to enquire about meditation courses at Zhanangbhoomi.",
  email: "info@zhanangbhoomi.org",
  enquiryEmail: "courses@zhanangbhoomi.org",

  // Location Details
  address: "Zhanangbhoomi Buddhist Monastery & Meditation Centre, [ADD LOCATION], Maharashtra, India",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Zhanangbhoomi+Buddhist+Meditation+Centre",

  // Social Links
  social: {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourhandle",
    youtube: "https://youtube.com/yourchannel"
  },

  // Bank & UPI Details
  donation: {
    accountName: "[ADD ACCOUNT NAME]",
    bankName: "[ADD BANK NAME]",
    accountNumber: "[ADD ACCOUNT NUMBER]",
    ifscCode: "[ADD IFSC]",
    branchName: "[ADD BRANCH]",
    upiId: "[ADD UPI ID]"
  }
};
```

---

## 5. How to Customize Content & Media

### A. Changing Contact Details & Social Links
1. Open `assets/js/config.js`.
2. Edit `phone`, `email`, `address`, and `social` URLs.
3. Save the file. All pages will update dynamically.

### B. Updating Bank & UPI Details
1. Open `assets/js/config.js` and update the `donation` object properties.
2. Open `donation.html` and replace placeholders like `[ADD ACCOUNT NAME]`, `[ADD BANK NAME]`, `[ADD ACCOUNT NUMBER]`, `[ADD IFSC]`, `[ADD BRANCH]`, and `[ADD UPI ID]` in the HTML markup.

### C. Replacing the UPI QR Code
1. Generate your official UPI QR code image (PNG, JPG, or SVG).
2. Rename your QR code file to `donation-qr.png` (or `.svg`).
3. Upload it to `assets/images/donation/` in cPanel File Manager (overwrite existing file).
4. If using a PNG/JPG format, update the `src` attribute in `donation.html`:
   ```html
   <img src="assets/images/donation/donation-qr.png" alt="Zhanangbhoomi UPI QR Code">
   ```

### D. Replacing & Adding Gallery Images
- **To Replace Existing Images**:
  - Upload your actual photos to `assets/images/gallery/` with names `gallery-1.jpg`, `gallery-2.jpg`, etc.
  - In `gallery.html`, update the `src` and `data-full-src` attributes:
    ```html
    <img src="assets/images/gallery/gallery-1.jpg" alt="Morning Meditation Hall" data-full-src="assets/images/gallery/gallery-1.jpg">
    ```
- **To Add New Images**:
  - Add a new `.gallery-item` div in `gallery.html` inside `<div class="gallery-grid">`:
    ```html
    <div class="gallery-item" data-category="monastery">
      <div class="gallery-card">
        <img src="assets/images/gallery/new-photo.jpg" alt="New Monastery Photo" data-full-src="assets/images/gallery/new-photo.jpg">
        <div class="gallery-overlay">
          <h4 class="gallery-title">New Photo Title</h4>
          <p class="gallery-desc">Photo description goes here</p>
        </div>
      </div>
    </div>
    ```

### E. Updating Course Registration Portal Subdomain Link
If your web application is hosted on a different URL (e.g., `https://portal.zhanangbhoomi.org`):
1. Open `assets/js/config.js`.
2. Update `portalUrl: "https://portal.zhanangbhoomi.org"`.
3. In `index.html`, `about.html`, `programs.html`, `gallery.html`, `awards.html`, `donation.html`, and `contact.html`, update any hardcoded `href` attributes on `.js-portal-url` links.

### F. Updating Google Maps Embed & Directions Link
1. Search for your monastery on Google Maps.
2. Click **Share** &rarr; **Embed a map**.
3. Copy the `src="..."` URL from the iframe HTML code.
4. Open `contact.html` and replace the iframe `src` attribute inside `<div class="map-container">`.
5. Update `googleMapsDirectionsUrl` in `assets/js/config.js`.

### G. Updating Courses & Programs
1. Open `programs.html`.
2. Edit course descriptions, durations, or schedules within the `<article class="course-card">` sections.
3. Keep the medical disclaimer box at the top of the page intact.

### H. Updating Awards & Certificates
1. Open `awards.html`.
2. Replace placeholder texts: `[Add Year]`, `[Add Organization]`.
3. Place certificate scan images in `assets/images/awards/certificate-1.jpg` and reference them in the card markup.

---

## 6. Submitting Sitemap to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your domain property: `https://zhanangbhoomi.org`.
3. Verify ownership via DNS TXT record or cPanel HTML file upload.
4. Navigate to **Sitemaps** in the left sidebar.
5. Enter `sitemap.xml` and click **Submit**.

---

## 7. Pre-Flight Checklist Before Going Live

Before launching your website publicly, verify the following:

- [ ] Replaced placeholders `[ADD ACCOUNT NAME]`, `[ADD BANK NAME]`, `[ADD ACCOUNT NUMBER]`, `[ADD IFSC]` in `donation.html` and `config.js` with real trust bank details.
- [ ] Uploaded real UPI QR code image to `assets/images/donation/donation-qr.svg` (or `.png`).
- [ ] Updated `whatsappNumber` in `assets/js/config.js` with your active WhatsApp phone number.
- [ ] Updated Google Maps embed URL in `contact.html`.
- [ ] Replaced placeholder award titles and years in `awards.html`.
- [ ] Tested course registration links pointing to `https://course.zhanangbhoomi.org`.
- [ ] Tested website on mobile devices (320px, 375px, 768px, 1024px+).
- [ ] Confirmed SSL certificate (HTTPS) is active.
