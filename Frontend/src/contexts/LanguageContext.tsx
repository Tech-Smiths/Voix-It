import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi' | 'te' | 'kn';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // App Name
    appName: "Voix'it",
    tagline: "Speak. Sell. Scale.",
    
    // Home Page
    welcome: "Welcome to Voix'it",
    subtitle: "Your AI Catalog Partner",
    speakToAdd: "🎙 Speak to Add Product",
    viewCatalog: "📋 View My Catalog",
    shareWhatsApp: "📤 Share via WhatsApp",
    
    // Navigation
    home: "Home",
    addProduct: "Add Product", 
    catalog: "Catalog",
    share: "Share",
    
    // Product Listing
    voiceInput: "Voice Input",
    textInput: "Text Input", 
    speakNow: "Speak Now",
    recording: "Recording...",
    processing: "Processing...",
    productName: "Product Name",
    quantity: "Quantity",
    price: "Price",
    category: "Category",
    description: "Description",
    uploadImage: "Upload Image",
    confirm: "Confirm & Save",
    retry: "Retry",
    
    // Status
    inStock: "In Stock",
    lowStock: "Low Stock",
    outOfStock: "Out of Stock",
    
    // Actions
    edit: "Edit",
    delete: "Delete",
    update: "Update",
    save: "Save",
    cancel: "Cancel",
    
    // Languages
    english: "English",
    tamil: "தமிழ்",
    hindi: "हिंदी", 
    telugu: "తెలుగు",
    kannada: "ಕನ್ನಡ"
  },
  ta: {
    appName: "Voix'it",
    tagline: "பேசு. விற்று. வளர்.",
    
    welcome: "Voix'it க்கு வரவேற்கிறோம்",
    subtitle: "உங்கள் AI பட்டியல் பார்ட்னர்",
    speakToAdd: "🎙 தயாரிப்பு சேர்க்க பேசவும்",
    viewCatalog: "📋 என் பட்டியலைக் காண்க",
    shareWhatsApp: "📤 WhatsApp வழியாக பகிர்",
    
    home: "முகப்பு",
    addProduct: "தயாரிப்பு சேர்க்க",
    catalog: "பட்டியல்",
    share: "பகிர்",
    
    voiceInput: "குரல் உள்ளீடு",
    textInput: "உரை உள்ளீடு",
    speakNow: "இப்போது பேசவும்",
    recording: "பதிவு செய்கிறது...",
    processing: "செயலாக்கம்...",
    productName: "தயாரிப்பு பெயர்",
    quantity: "அளவு",
    price: "விலை",
    category: "வகை",
    description: "விளக்கம்",
    uploadImage: "படம் பதிவேற்று",
    confirm: "உறுதிப்படுத்து & சேமி",
    retry: "மீண்டும் முயற்சி",
    
    inStock: "இருப்பில் உள்ளது",
    lowStock: "குறைவான இருப்பு",
    outOfStock: "இருப்பில் இல்லை",
    
    edit: "திருத்து",
    delete: "நீக்கு",
    update: "புதுப்பி",
    save: "சேமி",
    cancel: "ரத்து",
    
    english: "English",
    tamil: "தமிழ்",
    hindi: "हिंदी",
    telugu: "తెలుగు", 
    kannada: "ಕನ್ನಡ"
  },
  hi: {
    appName: "Voix'it",
    tagline: "बोलो. बेचो. बढ़ो।",
    
    welcome: "Voix'it में आपका स्वागत है",
    subtitle: "आपका AI कैटलॉग साथी",
    speakToAdd: "🎙 प्रोडक्ट जोड़ने के लिए बोलें",
    viewCatalog: "📋 मेरा कैटलॉग देखें",
    shareWhatsApp: "📤 WhatsApp से शेयर करें",
    
    home: "होम",
    addProduct: "प्रोडक्ट जोड़ें",
    catalog: "कैटलॉग",
    share: "शेयर",
    
    voiceInput: "वॉइस इनपुट",
    textInput: "टेक्स्ट इनपुट",
    speakNow: "अब बोलें",
    recording: "रिकॉर्डिंग...",
    processing: "प्रोसेसिंग...",
    productName: "प्रोडक्ट का नाम",
    quantity: "मात्रा",
    price: "कीमत",
    category: "श्रेणी",
    description: "विवरण",
    uploadImage: "इमेज अपलोड करें",
    confirm: "पुष्टि करें और सेव करें",
    retry: "फिर से कोशिश करें",
    
    inStock: "स्टॉक में",
    lowStock: "कम स्टॉक",
    outOfStock: "स्टॉक खत्म",
    
    edit: "संपादित करें",
    delete: "डिलीट करें",
    update: "अपडेट करें",
    save: "सेव करें",
    cancel: "रद्द करें",
    
    english: "English",
    tamil: "தமிழ்",
    hindi: "हिंदी",
    telugu: "తెలుగు",
    kannada: "ಕನ್ನಡ"
  },
  te: {
    appName: "Voix'it",
    tagline: "మాట్లాడు. అమ్ము. పెరుగు.",
    
    welcome: "Voix'it కి స్వాగతం",
    subtitle: "మీ AI కేటలాగ్ భాగస్వామి",
    speakToAdd: "🎙 ఉత్పత్తి జోడించడానికి మాట్లాడండి",
    viewCatalog: "📋 నా కేటలాగ్ చూడండి",
    shareWhatsApp: "📤 WhatsApp ద్వారా షేర్ చేయండి",
    
    home: "హోమ్",
    addProduct: "ఉత్పత్తి జోడించు",
    catalog: "కేటలాగ్",
    share: "షేర్",
    
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    textInput: "టెక్స్ట్ ఇన్‌పుట్",
    speakNow: "ఇప్పుడు మాట్లాడండి",
    recording: "రికార్డింగ్...",
    processing: "ప్రాసెసింగ్...",
    productName: "ఉత్పత్తి పేరు",
    quantity: "పరిమాణం",
    price: "ధర",
    category: "వర్గం",
    description: "వివరణ",
    uploadImage: "చిత్రం అప్‌లోడ్ చేయండి",
    confirm: "నిర్ధారించు & సేవ్ చేయు",
    retry: "మళ్లీ ప్రయత్నించు",
    
    inStock: "స్టాక్‌లో ఉంది",
    lowStock: "తక్కువ స్టాక్",
    outOfStock: "స్టాక్ అయిపోయింది",
    
    edit: "సవరించు",
    delete: "తొలగించు",
    update: "అప్‌డేట్ చేయు",
    save: "సేవ్ చేయు",
    cancel: "రద్దు చేయు",
    
    english: "English",
    tamil: "தமிழ்",
    hindi: "हिंदी",
    telugu: "తెలుగు",
    kannada: "ಕನ್ನಡ"
  },
  kn: {
    appName: "Voix'it",
    tagline: "ಮಾತನಾಡು. ಮಾರು. ಬೆಳೆ.",
    
    welcome: "Voix'it ಗೆ ಸ್ವಾಗತ",
    subtitle: "ನಿಮ್ಮ AI ಕ್ಯಾಟಲಾಗ್ ಪಾಲುದಾರ",
    speakToAdd: "🎙 ಉತ್ಪನ್ನ ಸೇರಿಸಲು ಮಾತನಾಡಿ",
    viewCatalog: "📋 ನನ್ನ ಕ್ಯಾಟಲಾಗ್ ನೋಡಿ",
    shareWhatsApp: "📤 WhatsApp ಮೂಲಕ ಹಂಚಿಕೊಳ್ಳಿ",
    
    home: "ಮುಖಪುಟ",
    addProduct: "ಉತ್ಪನ್ನ ಸೇರಿಸಿ",
    catalog: "ಕ್ಯಾಟಲಾಗ್",
    share: "ಹಂಚಿಕೊಳ್ಳಿ",
    
    voiceInput: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
    textInput: "ಪಠ್ಯ ಇನ್‌ಪುಟ್",
    speakNow: "ಈಗ ಮಾತನಾಡಿ",
    recording: "ರೆಕಾರ್ಡಿಂಗ್...",
    processing: "ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
    productName: "ಉತ್ಪನ್ನದ ಹೆಸರು",
    quantity: "ಪ್ರಮಾಣ",
    price: "ಬೆಲೆ",
    category: "ವರ್ಗ",
    description: "ವಿವರಣೆ",
    uploadImage: "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    confirm: "ದೃಢೀಕರಿಸಿ ಮತ್ತು ಉಳಿಸಿ",
    retry: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    
    inStock: "ಸ್ಟಾಕ್‌ನಲ್ಲಿದೆ",
    lowStock: "ಕಡಿಮೆ ಸ್ಟಾಕ್",
    outOfStock: "ಸ್ಟಾಕ್ ಖಾಲಿ",
    
    edit: "ಸಂಪಾದಿಸಿ",
    delete: "ಅಳಿಸಿ",
    update: "ನವೀಕರಿಸಿ",
    save: "ಉಳಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    
    english: "English",
    tamil: "தமிழ்",
    hindi: "हिंदी",
    telugu: "తెలుగు",
    kannada: "ಕನ್ನಡ"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};