/**
 * ZHANANGBHOOMI - Gallery Data Structure
 * Organized into Categories and Albums/Collections for static site performance.
 * 
 * HOW TO MAINTAIN THIS GALLERY:
 * 1. Add a new Category: Add an entry to `GALLERY_CATEGORIES` below.
 * 2. Add a new Album: Add an album object to `GALLERY_ALBUMS` under the desired category.
 * 3. Add a new Photo: Add an image object to an album's `images` array.
 */

const GALLERY_CATEGORIES = [
  {
    id: "all",
    key: "filter_all",
    icon: "grid",
    label: { en: "All Collections", hi: "सभी संग्रह" }
  },
  {
    id: "nature",
    key: "filter_nature",
    icon: "leaf",
    label: { en: "Nature & Forest", hi: "प्रकृति व परिसर" }
  },
  {
    id: "monastery",
    key: "filter_monastery",
    icon: "home",
    label: { en: "Monastery & Architecture", hi: "मठ व स्थापत्य" }
  },
  {
    id: "monuments",
    key: "filter_monuments",
    icon: "landmark",
    label: { en: "Monuments & Statues", hi: "बौद्ध स्मारक व प्रतिमाएं" }
  },
  {
    id: "events",
    key: "filter_events",
    icon: "calendar",
    label: { en: "Events & Ceremonies", hi: "समारोह व उत्सव" }
  },
  {
    id: "programs",
    key: "filter_programs",
    icon: "award",
    label: { en: "Meditation Programs", hi: "ध्यान व शिविर" }
  },
  {
    id: "special_visits",
    key: "filter_special_visits",
    icon: "users",
    label: { en: "Special Person Visits", hi: "विशिष्ट अतिथि व भिक्खू" }
  }
];

const GALLERY_ALBUMS = [
  /* --------------------------------------------------------------------------
     1. NATURE & FOREST
     -------------------------------------------------------------------------- */
  {
    id: "album-nature-hills",
    category: "nature",
    title: {
      en: "Pristine Forest & Hill Sanctuary",
      hi: "चापर्डा वन एवं पर्वत ध्यान क्षेत्र"
    },
    date: "2026",
    location: "Chaparda, Yavatmal",
    description: {
      en: "Serene views of the lush green hills and untouched forest canopy surrounding Zhanangbhoomi Sanctuary.",
      hi: "झानंगभूमि परिसर को घेरे हुए मनमोहक हरे-भरे पहाड़ और शांत प्राकृतिक वन वातावरण।"
    },
    coverImage: "assets/images/gallery/monastery-nature-hills.jpg",
    images: [
      {
        id: "nature-1",
        thumb: "assets/images/gallery/monastery-nature-hills.jpg",
        full: "assets/images/gallery/monastery-nature-hills.jpg",
        title: {
          en: "Forest Hill Panorama at Chaparda",
          hi: "चापर्डा पर्वतमाला का रमणीय दृश्य"
        },
        description: {
          en: "Lush green forest hills providing natural silence for deep Vipassana practice.",
          hi: "विपश्यना साधना के लिए अनुकूल शांत और प्रदूषण मुक्त हरा-भरा वन क्षेत्र।"
        }
      },
      {
        id: "nature-2",
        thumb: "assets/images/gallery/gallery-5.svg",
        full: "assets/images/gallery/gallery-5.svg",
        title: {
          en: "Medicinal Plant & Herb Gardens",
          hi: "औषधीय वनस्पति एवं आयुर्वेद उद्यान"
        },
        description: {
          en: "Organically maintained herb gardens supporting holistic health and wellness retreats.",
          hi: "जैविक रूप से संरक्षित औषधीय पौधे जो आरोग्य शिविर में सहायक हैं।"
        }
      },
      {
        id: "nature-3",
        thumb: "assets/images/gallery/gallery-6.svg",
        full: "assets/images/gallery/gallery-6.svg",
        title: {
          en: "Walking Meditation Nature Trails",
          hi: "प्रकृति चंक्रमण ध्यान मार्ग"
        },
        description: {
          en: "Shaded stone trails designed for mindful walking (Chankamana) amidst singing birds.",
          hi: "पक्षी कलरव के बीच सचेतन पदयात्रा (चंक्रमण ध्यान) के लिए निर्मित प्राकृतिक मार्ग।"
        }
      },
      {
        id: "nature-4",
        thumb: "assets/images/gallery/pagoda-stupa.jpg",
        full: "assets/images/gallery/pagoda-stupa.jpg",
        title: {
          en: "Lotus Pond & Garden Surroundings",
          hi: "कमल ताल व उद्यान परिसर"
        },
        description: {
          en: "Blooming lotus flowers and green lawn hedges around the main monastery walkway.",
          hi: "मुख्य मठ मार्ग के चारों ओर खिले हुए कमल और हरी झाड़ियां।"
        }
      }
    ]
  },

  /* --------------------------------------------------------------------------
     2. MONASTERY & ARCHITECTURE
     -------------------------------------------------------------------------- */
  {
    id: "album-monastery-complex",
    category: "monastery",
    title: {
      en: "Main Monastic Complex & Pagodas",
      hi: "मुख्य मठ भवन व पैगोडा परिसर"
    },
    date: "2026",
    location: "Chaparda Monastery",
    description: {
      en: "Architectural blend of traditional Buddhist heritage and modern eco-friendly monastic design.",
      hi: "पारंपरिक बौद्ध वास्तुकला और आधुनिक पर्यावरण-अनुकूल मठ संरचना का सुंदर संगम।"
    },
    coverImage: "assets/images/gallery/monastery-pillar.jpg",
    images: [
      {
        id: "monastery-1",
        thumb: "assets/images/gallery/monastery-pillar.jpg",
        full: "assets/images/gallery/monastery-pillar.jpg",
        title: {
          en: "Monastery Gate & Golden Pillar Pavilion",
          hi: "मुख्य द्वार एवं स्वर्ण स्तंभ मंडप"
        },
        description: {
          en: "Golden Ashoka Pillar on lotus pedestal greeting all retreatants and pilgrims.",
          hi: "साधकों व दर्शनार्थियों का स्वागत करता हुआ कमल पीठ पर स्थापित स्वर्ण स्तंभ।"
        }
      },
      {
        id: "monastery-2",
        thumb: "assets/images/gallery/pagoda-stupa.jpg",
        full: "assets/images/gallery/pagoda-stupa.jpg",
        title: {
          en: "Sacred White Stupas & Campus Gardens",
          hi: "पवित्र श्वेत स्तूप एवं उद्यान परिसर"
        },
        description: {
          en: "Peaceful monastery campus adorned with white Buddhist stupas and lush hedges.",
          hi: "श्वेत स्तूपों और हरी झाड़ियों से सुसज्जित शांत मोनेस्ट्री प्रांगन।"
        }
      },
      {
        id: "monastery-3",
        thumb: "assets/images/gallery/gallery-3.svg",
        full: "assets/images/gallery/gallery-3.svg",
        title: {
          en: "Main Vipassana Meditation Hall",
          hi: "मुख्य विपश्यना साधना भवन"
        },
        description: {
          en: "Spacious, naturally ventilated hall engineered for silent group meditation sessions.",
          hi: "मौन समूह ध्यान साधना के लिए निर्मित विशाल एवं हवादार ध्यान कक्ष।"
        }
      },
      {
        id: "monastery-4",
        thumb: "assets/images/gallery/gallery-7.svg",
        full: "assets/images/gallery/gallery-7.svg",
        title: {
          en: "Monk Residence & Zen Study Cells",
          hi: "भिक्खू निवास व अध्ययन कक्ष"
        },
        description: {
          en: "Quiet residential quarters for resident Bhikkhus and dedicated long-term meditators.",
          hi: "निवासी भिक्खुओं और दीर्घकालिक साधकों के लिए निर्मित शांत आवास।"
        }
      }
    ]
  },

  /* --------------------------------------------------------------------------
     3. MONUMENTS & STATUES
     -------------------------------------------------------------------------- */
  {
    id: "album-monuments-statues",
    category: "monuments",
    title: {
      en: "Ashoka Stambha & Sacred Monuments",
      hi: "अशोक स्तंभ व बौद्ध स्मारक"
    },
    date: "2026",
    location: "Monastery Grounds",
    description: {
      en: "Authentic replicas of historical Buddhist symbols, Ashoka Lion Capital, and golden Buddha sculptures.",
      hi: "ऐतिहासिक बौद्ध प्रतीकों, अशोक सिंह शीर्ष और स्वर्णिम बुद्ध मूर्तियों के दिव्य दर्शन।"
    },
    coverImage: "assets/images/gallery/ashoka-lion-capital.jpg",
    images: [
      {
        id: "monument-1",
        thumb: "assets/images/gallery/ashoka-lion-capital.jpg",
        full: "assets/images/gallery/ashoka-lion-capital.jpg",
        title: {
          en: "Four-Headed Lion Capital of Emperor Ashoka",
          hi: "सम्राट अशोक का चार मुखी सिंह शीर्ष"
        },
        description: {
          en: "Magnificent four-lion capital atop the Ashoka Stambha representing courage and Dhamma truth.",
          hi: "धम्म विजय और साहस का प्रतीक अशोक स्तंभ पर उत्कीर्ण चतुर्मुखी सिंह शीर्ष।"
        }
      },
      {
        id: "monument-2",
        thumb: "assets/images/gallery/buddha-statue-flags.jpg",
        full: "assets/images/gallery/buddha-statue-flags.jpg",
        title: {
          en: "Golden Lord Buddha Statue with Sacred Flags",
          hi: "भगवान बुद्ध की स्वर्ण प्रतिमा व पंचशील ध्वज"
        },
        description: {
          en: "Revered Buddha in meditation mudra, decorated with colorful Panchasheel flags.",
          hi: "ध्यान मुद्रा में विराजमान भगवान बुद्ध की प्रतिमा और लहराते पंचशील ध्वज।"
        }
      },
      {
        id: "monument-3",
        thumb: "assets/images/gallery/monastery-pillar.jpg",
        full: "assets/images/gallery/monastery-pillar.jpg",
        title: {
          en: "Lotus Base of Ashoka Pillar",
          hi: "अशोक स्तंभ का कमल पीठम"
        },
        description: {
          en: "Intricately carved inverted lotus base holding the sacred Dhamma Chakra pillar.",
          hi: "धम्मचक्र स्तंभ को सुशोभित करता हुआ बारीकी से उकेरा गया अधोमुख कमल पीठ।"
        }
      },
      {
        id: "monument-4",
        thumb: "assets/images/gallery/gallery-8.svg",
        full: "assets/images/gallery/gallery-8.svg",
        title: {
          en: "Dharmachakra Pravartana Monument",
          hi: "धम्मचक्र प्रवर्तन स्मारक"
        },
        description: {
          en: "Sculpted wheel of law commemorating Tathagata Buddha's first sermon.",
          hi: "तथागत बुद्ध के प्रथम धम्म देशना की स्मृति में निर्मित धम्मचक्र स्मारक।"
        }
      }
    ]
  },

  /* --------------------------------------------------------------------------
     4. EVENTS & CEREMONIES
     -------------------------------------------------------------------------- */
  {
    id: "album-events-celebrations",
    category: "events",
    title: {
      en: "Buddha Purnima & Annual Ceremonies",
      hi: "बुद्ध पूर्णिमा व धम्म समारोह 2026"
    },
    date: "May 2026",
    location: "Main Courtyard",
    description: {
      en: "Joyous celebrations of Buddha Jayanti, Dhammachakra Day, and sacred community gatherings.",
      hi: "बुद्ध जयंती, धम्मचक्र प्रवर्तन दिवस और पावन जन-समारोहों के उल्लासपूर्ण पल।"
    },
    coverImage: "assets/images/gallery/buddha-statue-flags.jpg",
    images: [
      {
        id: "event-1",
        thumb: "assets/images/gallery/buddha-statue-flags.jpg",
        full: "assets/images/gallery/buddha-statue-flags.jpg",
        title: {
          en: "Buddha Purnima Vandana & Flag Hoisting",
          hi: "बुद्ध पूर्णिमा वंदना एवं ध्वजारोहण"
        },
        description: {
          en: "Pilgrims and Bhikkhus offering Trisharan Panchasheel Vandana during Buddha Jayanti.",
          hi: "बुद्ध जयंती पर त्रिशरण पंचशील वंदना करते साधक और धम्म प्रेमी।"
        }
      },
      {
        id: "event-2",
        thumb: "assets/images/gallery/gallery-4.svg",
        full: "assets/images/gallery/gallery-4.svg",
        title: {
          en: "Candlelight Peace Procession & Chanting",
          hi: "दीपक शांति पदयात्रा व धम्म पाठ"
        },
        description: {
          en: "Evening candlelight walk around the stupa chanting Metta Sutta for world peace.",
          hi: "विश्व शांति की कामना के साथ स्तूप परिक्रमा एवं सांध्य दीपदान।"
        }
      },
      {
        id: "event-3",
        thumb: "assets/images/gallery/gallery-9.svg",
        full: "assets/images/gallery/gallery-9.svg",
        title: {
          en: "Community Meal (Sangha Dana) Gathering",
          hi: "संघदान एवं सामुदायिक भोजन प्रसादम"
        },
        description: {
          en: "Wholesome vegetarian food distribution to all meditators and visiting guests.",
          hi: "साधकों और श्रद्धालुओं के लिए सात्विक अन्नछत्र एवं संघदान।"
        }
      }
    ]
  },

  /* --------------------------------------------------------------------------
     5. MEDITATION & VIPASSANA PROGRAMS
     -------------------------------------------------------------------------- */
  {
    id: "album-programs-meditation",
    category: "programs",
    title: {
      en: "5-Day Sakriya Vipassana & MBBS Camps",
      hi: "५-दिवसीय सक्रिय विपश्यना व MBBS शिविर"
    },
    date: "Every Sat - Wed",
    location: "Meditation Pavilion",
    description: {
      en: "10-stage Sakriya Vipassana, Mind-Body Balancing Sadhana (MBBS), and medical yoga sessions.",
      hi: "१०-चरणीय सक्रिय ध्यान, माइंड बॉडी बैलेंसिंग साधना व चिकित्सा योग अभ्यास।"
    },
    coverImage: "assets/images/gallery/gallery-1.svg",
    images: [
      {
        id: "prog-1",
        thumb: "assets/images/gallery/gallery-1.svg",
        full: "assets/images/gallery/gallery-1.svg",
        title: {
          en: "6:00 AM Morning Sakriya Vipassana",
          hi: "प्रातः ६ बजे सक्रिय विपश्यना अभ्यास"
        },
        description: {
          en: "100-minute structured mindfulness practice guided by Dr. Bodhi Ashok and Bodhi Prakash.",
          hi: "डॉ. बोधी अशोक और बोधी प्रकाश के मार्गदर्शन में १०० मिनट का दैनिक ध्यान।"
        }
      },
      {
        id: "prog-2",
        thumb: "assets/images/gallery/gallery-2.svg",
        full: "assets/images/gallery/gallery-2.svg",
        title: {
          en: "Vipassana Noble Silence (Vevibo Sadhana)",
          hi: "अक्रिय मौन विपश्यना साधना"
        },
        description: {
          en: "Deep inner stillness in Sukhasana abiding in non-dual witness awareness.",
          hi: "सुखासन में बैठकर अंतरमन की शांति और साक्षी भाव का अनुभव।"
        }
      },
      {
        id: "prog-3",
        thumb: "assets/images/gallery/gallery-10.svg",
        full: "assets/images/gallery/gallery-10.svg",
        title: {
          en: "Total Body Vibration & Tension Release",
          hi: "कायानुपस्सना शरीर कंपन विधि"
        },
        description: {
          en: "Conscious rhythmic body movement releasing accumulated physical and nervous stress.",
          hi: "शारीरिक व तंत्रिका तनावमुक्ति हेतु बोधपूर्वक कम्पन अभ्यास।"
        }
      }
    ]
  },

  /* --------------------------------------------------------------------------
     6. SPECIAL PERSON VISITS & BHIKKHUS
     -------------------------------------------------------------------------- */
  {
    id: "album-special-visits",
    category: "special_visits",
    title: {
      en: "Venerable Bhikkhus & Guest Dignitaries",
      hi: "पूज्य भिक्खू संघ व विशिष्ट अतिथि आगमन"
    },
    date: "2026",
    location: "Monastery Reception",
    description: {
      en: "Visits by senior Bhikkhus, medical doctors, yoga scholars, and community leaders.",
      hi: "वरिष्ठ भिक्खू संघ, डॉक्टरों, योग विशेषज्ञों और विचारकों का मठ आगमन व मार्गदर्शन।"
    },
    coverImage: "assets/images/instructors/dr-bodhi-ashok.jpg",
    images: [
      {
        id: "visit-1",
        thumb: "assets/images/instructors/dr-bodhi-ashok.jpg",
        full: "assets/images/instructors/dr-bodhi-ashok.jpg",
        title: {
          en: "Founder Physician Zhan Bhikkhu Dr. Bodhi Ashok",
          hi: "संस्थापक चिकित्सक ज्ञान भिक्खू डॉ. बोधी अशोक (MBBS, MD)"
        },
        description: {
          en: "Chief Instructor and subject creator addressing retreatants during camp orientation.",
          hi: "शिविरार्थियों को संबोधित करते संस्थापक व मुख्य प्रशिक्षक डॉ. बोधी अशोक।"
        }
      },
      {
        id: "visit-2",
        thumb: "assets/images/instructors/bodhi-prakash.jpg",
        full: "assets/images/instructors/bodhi-prakash.jpg",
        title: {
          en: "Senior Instructor Yoga Teacher Bodhi Prakash",
          hi: "वरिष्ठ योग शिक्षक बोधी प्रकाश"
        },
        description: {
          en: "Demonstrating precision Yogasana postures for health balancing.",
          hi: "रोगमुक्ति एवं स्वास्थ्य संतुलन हेतु योगासन का मार्गदर्शन करते बोधी प्रकाश।"
        }
      },
      {
        id: "visit-3",
        thumb: "assets/images/gallery/gallery-3.svg",
        full: "assets/images/gallery/gallery-3.svg",
        title: {
          en: "International Sangha & Scholar Exchange",
          hi: "अंतर्राष्ट्रीय संघ व विद्वान संगोष्ठी"
        },
        description: {
          en: "Dialogue on 21st Century Ambedkari Buddhism and Nalanda University vision.",
          hi: "२१वीं सदी के आम्बेडकरी बौद्ध धर्म और नालंदा विश्वविद्यालय दृष्टि पर संवाद।"
        }
      }
    ]
  }
];
