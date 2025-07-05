export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    // Header
    appName: 'VOIX\'IT',
    tagline: 'AI Voice Commerce',
    stepOf: 'Step {current} of {total}',
    
    // Navigation
    dashboard: 'Dashboard',
    voiceInput: 'Voice Input',
    productListing: 'Product Listing',
    aiSuggestions: 'AI Suggestions',
    whatsappShare: 'WhatsApp Share',
    customerChat: 'Customer Chat',
    catalog: 'My Catalog',
    analytics: 'Analytics',
    settings: 'Settings',
    help: 'Help & Support',
    
    // User Profile
    vendorName: 'Rajesh Kumar',
    vendorLocation: 'Mumbai Market',
    
    // Dashboard
    welcomeBack: 'Welcome back, Rajesh!',
    dashboardSubtitle: 'Here\'s what\'s happening with your business today',
    totalProducts: 'Total Products',
    totalViews: 'Total Views',
    totalMessages: 'Messages',
    totalRevenue: 'Revenue',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    topProducts: 'Top Products',
    
    // Quick Actions
    addProduct: 'Add New Product',
    addProductDesc: 'List a new item using voice',
    viewCatalog: 'View Catalog',
    viewCatalogDesc: 'See all your products',
    checkMessages: 'Check Messages',
    checkMessagesDesc: 'Customer inquiries',
    
    // Activity
    newProductAdded: 'New product added',
    customerInquiry: 'Customer inquiry received',
    priceUpdated: 'Price updated for',
    productShared: 'Product shared on WhatsApp',
    
    // Step 1 - Voice Input
    step1Title: '🎙️ Speak to Sell',
    step1Subtitle: 'Tell us about your product in any language',
    voiceInputLabel: 'Voice Input (Simulated)',
    voiceInputPlaceholder: 'Type or click mic to simulate voice...',
    tryExample: 'Try saying something like:',
    processVoiceInput: 'Process Voice Input',
    
    // Step 2 - Product Listing
    step2Title: '🧾 Your Product Listing',
    step2Subtitle: "We've organized your product details",
    productLabel: '🛒 Product',
    quantityLabel: '📦 Quantity',
    priceLabel: '💰 Price',
    categoryLabel: '🏷️ Category',
    editDetails: 'Edit Details',
    confirmContinue: 'Confirm & Continue',
    
    // Step 3 - AI Suggestions
    step3Title: '🧠 AI Smart Suggestions',
    step3Subtitle: 'Let AI help optimize your listing',
    autoDescription: '✍️ Auto Description Generator',
    regenerate: 'Regenerate',
    smartPricing: '💡 Smart Pricing Coach',
    applySuggestedPrice: 'Apply Suggested Price',
    continueToWhatsApp: 'Continue to WhatsApp',
    
    // Step 4 - WhatsApp
    step4Title: '📤 Push to WhatsApp',
    step4Subtitle: 'Share your product with customers',
    pushToWhatsApp: '📤 Push Listing to WhatsApp',
    orderNow: '🛍️ Order Now',
    delivered: '✓✓ Delivered',
    back: 'Back',
    seeCustomerChat: 'See Customer Chat',
    
    // Step 5 - Customer Chat
    step5Title: '💬 Customer Chat',
    step5Subtitle: 'See how customers interact with your listing',
    chatLanguage: 'Chat Language',
    nextMessage: 'Next Message',
    viewCatalog: 'View Catalog',
    
    // Step 6 - Catalog
    step6Title: '🛒 My Product Catalog',
    step6Subtitle: 'All your listed products',
    edit: 'Edit',
    share: 'Share',
    addNewProduct: 'Add New Product',
    
    // Chat Messages
    chatBuyer1: 'Is this still available?',
    chatBot1: 'Yes, {quantity} {product} are available at ₹{price}. Delivery in 1 day.',
    chatBuyer2: 'Can I get 4kg?',
    chatBot2: 'Sure! 4kg will be ₹{price}. Want to confirm the order?',
    
    // Examples
    example1: '2kg tomatoes for ₹40',
    example2: '3kg onions at ₹60',
    example3: '1kg potatoes for ₹25',
    
    // Descriptions
    desc1: 'Farm-fresh {product}, ₹{price} for {quantity} — straight from local growers.',
    desc2: 'Premium quality {product} at great prices. Fresh from the farm to your table.',
    desc3: 'Organic {product} perfect for cooking. Best quality guaranteed at ₹{price}/{quantity}.',
    
    // Pricing suggestion
    pricingSuggestion: 'Other vendors list {product} at ₹{min}–₹{max}. You could try ₹{suggested} for better sales.'
  },
  
  hi: {
    // Header
    appName: 'VOIX\'IT',
    tagline: 'AI आवाज़ व्यापार',
    stepOf: 'चरण {current} का {total}',
    
    // Navigation
    dashboard: 'डैशबोर्ड',
    voiceInput: 'आवाज़ इनपुट',
    productListing: 'उत्पाद सूची',
    aiSuggestions: 'AI सुझाव',
    whatsappShare: 'व्हाट्सऐप शेयर',
    customerChat: 'ग्राहक चैट',
    catalog: 'मेरा कैटलॉग',
    analytics: 'विश्लेषण',
    settings: 'सेटिंग्स',
    help: 'सहायता और समर्थन',
    
    // User Profile
    vendorName: 'राजेश कुमार',
    vendorLocation: 'मुंबई मार्केट',
    
    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है, राजेश!',
    dashboardSubtitle: 'आज आपके व्यापार के साथ यह हो रहा है',
    totalProducts: 'कुल उत्पाद',
    totalViews: 'कुल दृश्य',
    totalMessages: 'संदेश',
    totalRevenue: 'आय',
    quickActions: 'त्वरित कार्य',
    recentActivity: 'हाल की गतिविधि',
    topProducts: 'शीर्ष उत्पाद',
    
    // Quick Actions
    addProduct: 'नया उत्पाद जोड़ें',
    addProductDesc: 'आवाज़ का उपयोग करके नई वस्तु सूचीबद्ध करें',
    viewCatalog: 'कैटलॉग देखें',
    viewCatalogDesc: 'अपने सभी उत्पाद देखें',
    checkMessages: 'संदेश जांचें',
    checkMessagesDesc: 'ग्राहक पूछताछ',
    
    // Activity
    newProductAdded: 'नया उत्पाद जोड़ा गया',
    customerInquiry: 'ग्राहक पूछताछ प्राप्त हुई',
    priceUpdated: 'कीमत अपडेट की गई',
    productShared: 'उत्पाद व्हाट्सऐप पर साझा किया गया',
    
    // Step 1 - Voice Input
    step1Title: '🎙️ बोलकर बेचें',
    step1Subtitle: 'अपने उत्पाद के बारे में किसी भी भाषा में बताएं',
    voiceInputLabel: 'आवाज़ इनपुट (सिमुलेटेड)',
    voiceInputPlaceholder: 'टाइप करें या आवाज़ सिमुलेट करने के लिए माइक पर क्लिक करें...',
    tryExample: 'कुछ इस तरह कहें:',
    processVoiceInput: 'आवाज़ इनपुट प्रोसेस करें',
    
    // Step 2 - Product Listing
    step2Title: '🧾 आपकी उत्पाद सूची',
    step2Subtitle: 'हमने आपके उत्पाद की जानकारी व्यवस्थित की है',
    productLabel: '🛒 उत्पाद',
    quantityLabel: '📦 मात्रा',
    priceLabel: '💰 कीमत',
    categoryLabel: '🏷️ श्रेणी',
    editDetails: 'विवरण संपादित करें',
    confirmContinue: 'पुष्टि करें और जारी रखें',
    
    // Step 3 - AI Suggestions
    step3Title: '🧠 AI स्मार्ट सुझाव',
    step3Subtitle: 'AI को अपनी लिस्टिंग को बेहतर बनाने में मदद करने दें',
    autoDescription: '✍️ ऑटो विवरण जेनरेटर',
    regenerate: 'पुनर्जनन',
    smartPricing: '💡 स्मार्ट प्राइसिंग कोच',
    applySuggestedPrice: 'सुझाई गई कीमत लागू करें',
    continueToWhatsApp: 'व्हाट्सऐप पर जारी रखें',
    
    // Step 4 - WhatsApp
    step4Title: '📤 व्हाट्सऐप पर भेजें',
    step4Subtitle: 'अपना उत्पाद ग्राहकों के साथ साझा करें',
    pushToWhatsApp: '📤 व्हाट्सऐप पर लिस्टिंग भेजें',
    orderNow: '🛍️ अभी ऑर्डर करें',
    delivered: '✓✓ डिलीवर हो गया',
    back: 'वापस',
    seeCustomerChat: 'ग्राहक चैट देखें',
    
    // Step 5 - Customer Chat
    step5Title: '💬 ग्राहक चैट',
    step5Subtitle: 'देखें कि ग्राहक आपकी लिस्टिंग के साथ कैसे बातचीत करते हैं',
    chatLanguage: 'चैट भाषा',
    nextMessage: 'अगला संदेश',
    viewCatalog: 'कैटलॉग देखें',
    
    // Step 6 - Catalog
    step6Title: '🛒 मेरा उत्पाद कैटलॉग',
    step6Subtitle: 'आपके सभी सूचीबद्ध उत्पाद',
    edit: 'संपादित करें',
    share: 'साझा करें',
    addNewProduct: 'नया उत्पाद जोड़ें',
    
    // Chat Messages
    chatBuyer1: 'क्या यह अभी भी उपलब्ध है?',
    chatBot1: 'हाँ, {quantity} {product} ₹{price} में उपलब्ध है। 1 दिन में डिलीवरी।',
    chatBuyer2: 'क्या मुझे 4 किलो मिल सकता है?',
    chatBot2: 'ज़रूर! 4 किलो ₹{price} होगा। ऑर्डर कन्फर्म करना चाहते हैं?',
    
    // Examples
    example1: '2 किलो टमाटर ₹40 में',
    example2: '3 किलो प्याज़ ₹60 में',
    example3: '1 किलो आलू ₹25 में',
    
    // Descriptions
    desc1: 'ताज़े {product}, ₹{price} {quantity} के लिए — सीधे स्थानीय किसानों से।',
    desc2: 'बेहतरीन गुणवत्ता के {product} बेहतरीन कीमतों पर। खेत से सीधे आपकी मेज़ तक।',
    desc3: 'जैविक {product} खाना पकाने के लिए बिल्कुल सही। ₹{price}/{quantity} पर सर्वोत्तम गुणवत्ता की गारंटी।',
    
    // Pricing suggestion
    pricingSuggestion: 'अन्य विक्रेता {product} को ₹{min}–₹{max} में बेचते हैं। बेहतर बिक्री के लिए आप ₹{suggested} की कोशिश कर सकते हैं।'
  },
  
  ta: {
    // Header
    appName: 'VOIX\'IT',
    tagline: 'AI குரல் வணிகம்',
    stepOf: 'படி {current} / {total}',
    
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    voiceInput: 'குரல் உள்ளீடு',
    productListing: 'தயாரிப்பு பட்டியல்',
    aiSuggestions: 'AI பரிந்துரைகள்',
    whatsappShare: 'வாட்ஸ்அப் பகிர்வு',
    customerChat: 'வாடிக்கையாளர் அரட்டை',
    catalog: 'எனது பட்டியல்',
    analytics: 'பகுப்பாய்வு',
    settings: 'அமைப்புகள்',
    help: 'உதவி மற்றும் ஆதரவு',
    
    // User Profile
    vendorName: 'ராஜேஷ் குமார்',
    vendorLocation: 'மும்பை சந்தை',
    
    // Dashboard
    welcomeBack: 'மீண்டும் வரவேற்கிறோம், ராஜேஷ்!',
    dashboardSubtitle: 'இன்று உங்கள் வணிகத்தில் என்ன நடக்கிறது என்பது இங்கே',
    totalProducts: 'மொத்த தயாரிப்புகள்',
    totalViews: 'மொத்த பார்வைகள்',
    totalMessages: 'செய்திகள்',
    totalRevenue: 'வருமானம்',
    quickActions: 'விரைவு செயல்கள்',
    recentActivity: 'சமீபத்திய செயல்பாடு',
    topProducts: 'சிறந்த தயாரிப்புகள்',
    
    // Quick Actions
    addProduct: 'புதிய தயாரிப்பைச் சேர்க்கவும்',
    addProductDesc: 'குரலைப் பயன்படுத்தி புதிய பொருளைப் பட்டியலிடுங்கள்',
    viewCatalog: 'பட்டியலைப் பார்க்கவும்',
    viewCatalogDesc: 'உங்கள் அனைத்து தயாரிப்புகளையும் பார்க்கவும்',
    checkMessages: 'செய்திகளைச் சரிபார்க்கவும்',
    checkMessagesDesc: 'வாடிக்கையாளர் விசாரணைகள்',
    
    // Activity
    newProductAdded: 'புதிய தயாரிப்பு சேர்க்கப்பட்டது',
    customerInquiry: 'வாடிக்கையாளர் விசாரணை பெறப்பட்டது',
    priceUpdated: 'விலை புதுப்பிக்கப்பட்டது',
    productShared: 'தயாரிப்பு வாட்ஸ்அப்பில் பகிரப்பட்டது',
    
    // Step 1 - Voice Input
    step1Title: '🎙️ பேசி விற்கவும்',
    step1Subtitle: 'உங்கள் தயாரிப்பு பற்றி எந்த மொழியிலும் சொல்லுங்கள்',
    voiceInputLabel: 'குரல் உள்ளீடு (உருவகப்படுத்தப்பட்டது)',
    voiceInputPlaceholder: 'டைப் செய்யுங்கள் அல்லது குரலை உருவகப்படுத்த மைக்கை கிளிக் செய்யுங்கள்...',
    tryExample: 'இப்படி ஏதாவது சொல்லுங்கள்:',
    processVoiceInput: 'குரல் உள்ளீட்டை செயலாக்கவும்',
    
    // Step 2 - Product Listing
    step2Title: '🧾 உங்கள் தயாரிப்பு பட்டியல்',
    step2Subtitle: 'உங்கள் தயாரிப்பு விவரங்களை நாங்கள் ஒழுங்கமைத்துள்ளோம்',
    productLabel: '🛒 தயாரிப்பு',
    quantityLabel: '📦 அளவு',
    priceLabel: '💰 விலை',
    categoryLabel: '🏷️ வகை',
    editDetails: 'விவரங்களை திருத்தவும்',
    confirmContinue: 'உறுதிப்படுத்தி தொடரவும்',
    
    // Step 3 - AI Suggestions
    step3Title: '🧠 AI ஸ்மார்ட் பரிந்துரைகள்',
    step3Subtitle: 'உங்கள் பட்டியலை மேம்படுத்த AI-ஐ அனுமதிக்கவும்',
    autoDescription: '✍️ ஆட்டோ விளக்க ஜெனரேட்டர்',
    regenerate: 'மீண்டும் உருவாக்கவும்',
    smartPricing: '💡 ஸ்மார்ட் விலை நிர்ணய பயிற்சியாளர்',
    applySuggestedPrice: 'பரிந்துரைக்கப்பட்ட விலையை பயன்படுத்தவும்',
    continueToWhatsApp: 'வாட்ஸ்அப்பிற்கு தொடரவும்',
    
    // Step 4 - WhatsApp
    step4Title: '📤 வாட்ஸ்அப்பிற்கு அனுப்பவும்',
    step4Subtitle: 'உங்கள் தயாரிப்பை வாடிக்கையாளர்களுடன் பகிரவும்',
    pushToWhatsApp: '📤 வாட்ஸ்அப்பிற்கு பட்டியலை அனுப்பவும்',
    orderNow: '🛍️ இப்போது ஆர்டர் செய்யுங்கள்',
    delivered: '✓✓ வழங்கப்பட்டது',
    back: 'பின்னால்',
    seeCustomerChat: 'வாடிக்கையாளர் அரட்டையைப் பார்க்கவும்',
    
    // Step 5 - Customer Chat
    step5Title: '💬 வாடிக்கையாளர் அரட்டை',
    step5Subtitle: 'வாடிக்கையாளர்கள் உங்கள் பட்டியலுடன் எவ்வாறு தொடர்பு கொள்கிறார்கள் என்பதைப் பார்க்கவும்',
    chatLanguage: 'அரட்டை மொழி',
    nextMessage: 'அடுத்த செய்தி',
    viewCatalog: 'பட்டியலைப் பார்க்கவும்',
    
    // Step 6 - Catalog
    step6Title: '🛒 எனது தயாரிப்பு பட்டியல்',
    step6Subtitle: 'உங்கள் அனைத்து பட்டியலிடப்பட்ட தயாரிப்புகள்',
    edit: 'திருத்தவும்',
    share: 'பகிரவும்',
    addNewProduct: 'புதிய தயாரிப்பைச் சேர்க்கவும்',
    
    // Chat Messages
    chatBuyer1: 'இது இன்னும் கிடைக்குமா?',
    chatBot1: 'ஆம், {quantity} {product} ₹{price}-க்கு கிடைக்கிறது. 1 நாளில் டெலிவரி.',
    chatBuyer2: 'எனக்கு 4 கிலோ கிடைக்குமா?',
    chatBot2: 'நிச்சயமாக! 4 கிலோ ₹{price} ஆகும். ஆர்டரை உறுதிப்படுத்த விரும்புகிறீர்களா?',
    
    // Examples
    example1: '2 கிலோ தக்காளி ₹40-க்கு',
    example2: '3 கிலோ வெங்காயம் ₹60-க்கு',
    example3: '1 கிலோ உருளைக்கிழங்கு ₹25-க்கு',
    
    // Descriptions
    desc1: 'பண்ணையில் இருந்து புதிய {product}, {quantity}-க்கு ₹{price} — நேரடியாக உள்ளூர் விவசாயிகளிடமிருந்து.',
    desc2: 'சிறந்த விலையில் பிரீமியம் தரமான {product}. பண்ணையில் இருந்து நேரடியாக உங்கள் மேசைக்கு.',
    desc3: 'சமையலுக்கு ஏற்ற ஆர்கானிக் {product}. ₹{price}/{quantity}-க்கு சிறந்த தரம் உத்தரவாதம்.',
    
    // Pricing suggestion
    pricingSuggestion: 'மற்ற விற்பனையாளர்கள் {product}-ஐ ₹{min}–₹{max}-க்கு பட்டியலிடுகிறார்கள். சிறந்த விற்பனைக்காக நீங்கள் ₹{suggested} முயற்சி செய்யலாம்.'
  }
};

export const getTranslation = (language: string, key: string, params?: Record<string, string | number>): string => {
  let text = translations[language]?.[key] || translations['en'][key] || key;
  
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`{${param}}`, 'g'), String(value));
    });
  }
  
  return text;
};