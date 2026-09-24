/**
 * ZHANANGBHOOMI - Central Configuration File
 * Real data extracted from official monastery boards & posters.
 */

const ZHANANG_CONFIG = {
  siteName: "ZHANANGBHOOMI",
  siteTagline: "Buddhist Meditation & Vipassana Centre",
  monasteryTitle: "Maitreya Medical Meditation Monastery",

  // Founder & Chief Instructors
  chiefInstructor: "Dhamma-samanvit Mitra Dr. Bodhi Ashok (MBBS, MD)",
  chiefInstructorRole: "Physician Jnan Bhikkhu, Subject Creator & Chief Instructor | President, Maitrey Bodh Sanstha",
  yogaTeacher: "Yoga Teacher Bodhi Prakash",
  
  // Registration Portal Subdomain URL
  portalUrl: "https://course.zhanangbhoomi.org",
  
  // Primary Domain
  domain: "https://zhanangbhoomi.org",

  // Official Contact Numbers (Real Data from Posters)
  phone: "+91 98229 46598",
  phonePrimary: "+91 98229 46598",
  phoneSecondary: "+91 94213 39911",
  whatsappNumber: "919822946598",
  whatsappMessage: "Namo Buddhaya, I would like to register for the 5-day Medical Meditation & Vipassana camp at Zhanangbhoomi.",
  email: "contact@zhanangbhoomi.org",
  enquiryEmail: "courses@zhanangbhoomi.org",

  // Exact Location Details (Chaparda, Yavatmal, Maharashtra)
  address: "Zhanangbhoomi, Maitreya Medical Meditation Monastery, Chaparda, Taluka Kalamb, District Yavatmal, Maharashtra - 445401, India",
  locationMarathi: "ज्ञान भूमी, मैत्रेय मेडिकल मेडिटेशन मौनॉस्ट्री, चापर्डा, ता. कळंब, जि. यवतमाळ (महाराष्ट्र)",
  googleMapsEmbedUrl: "https://maps.app.goo.gl/v7jAV742tUJyavh2A",
  googleMapsDirectionsUrl: "https://maps.app.goo.gl/v7jAV742tUJyavh2A",

  // Social Links (Commented Out)
  /*
  social: {
    facebook: "https://facebook.com/zhanangbhoomi",
    instagram: "https://instagram.com/zhanangbhoomi",
    youtube: "https://youtube.com/@zhanangbhoomi",
    whatsapp: "https://wa.me/919822946598"
  },
  */

  // Real Bank & Trust Details (State Bank of India / Maitrey Bodh Sanstha)
  donation: {
    accountName: "Maitrey Bodh Sanstha (मैत्रेय बोध संस्था)",
    regNo: "Reg. No. 648/2008",
    bankName: "State Bank of India (भारतीय स्टेट बैंक)",
    accountNumber: "32748438276",
    ifscCode: "00000000000",
    panNumber: "AACTM7290C",
    taxStatus: "80G Tax Exempt (80G के अंतर्गत करमुक्त)"
  }
};

if (typeof Object.freeze === 'function') {
  Object.freeze(ZHANANG_CONFIG);
}
