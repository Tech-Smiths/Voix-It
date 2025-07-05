import React, { useState } from 'react';
import { Mic, Edit3, Zap, MessageCircle, ShoppingCart, ArrowRight, ArrowLeft, Check, RefreshCw, Menu, X } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { getTranslation } from './utils/translations';

interface Product {
  id: string;
  name: string;
  quantity: string;
  price: number;
  category: string;
  description: string;
  timestamp: Date;
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [voiceInput, setVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [language, setLanguage] = useState('en');
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [descriptionVariant, setDescriptionVariant] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = (key: string, params?: Record<string, string | number>) => getTranslation(language, key, params);

  const getExampleInputs = () => [
    t('example1'),
    t('example2'),
    t('example3')
  ];

  const getDescriptions = (product: Product) => [
    t('desc1', { product: product.name.toLowerCase(), price: product.price, quantity: product.quantity }),
    t('desc2', { product: product.name.toLowerCase() }),
    t('desc3', { product: product.name.toLowerCase(), price: product.price, quantity: product.quantity })
  ];

  const parseVoiceInput = (input: string) => {
    // Enhanced parsing for multiple languages
    const patterns = [
      // English patterns
      /(\d+)\s*(kg|kilo)\s*([a-zA-Z]+).*?(\d+)/i,
      // Hindi patterns
      /(\d+|[०-९]+)\s*(किलो|kg)\s*([a-zA-Z\u0900-\u097F]+).*?(\d+|[०-९]+)/i,
      // Tamil patterns
      /(\d+|[௦-௯]+)\s*(கிலோ|kg)\s*([a-zA-Z\u0B80-\u0BFF]+).*?(\d+|[௦-௯]+)/i
    ];

    for (const pattern of patterns) {
      const matches = input.match(pattern);
      if (matches) {
        const [, quantity, unit, productName, price] = matches;
        
        // Product name mapping for different languages
        const getProductName = (name: string) => {
          const lowerName = name.toLowerCase();
          if (lowerName.includes('tomato') || lowerName.includes('टमाटर') || lowerName.includes('தக்காளி')) {
            return language === 'hi' ? 'टमाटर' : language === 'ta' ? 'தக்காளி' : 'Tomatoes';
          }
          if (lowerName.includes('onion') || lowerName.includes('प्याज') || lowerName.includes('வெங்காயம்')) {
            return language === 'hi' ? 'प्याज' : language === 'ta' ? 'வெங்காயம்' : 'Onions';
          }
          if (lowerName.includes('potato') || lowerName.includes('आलू') || lowerName.includes('உருளைக்கிழங்கு')) {
            return language === 'hi' ? 'आलू' : language === 'ta' ? 'உருளைக்கிழங்கு' : 'Potatoes';
          }
          return name.charAt(0).toUpperCase() + name.slice(1);
        };

        const getCategoryName = () => {
          return language === 'hi' ? 'सब्जियां' : language === 'ta' ? 'காய்கறிகள்' : 'Vegetables';
        };

        return {
          name: getProductName(productName),
          quantity: `${quantity} ${unit}`,
          price: parseInt(price.toString()),
          category: getCategoryName()
        };
      }
    }
    return null;
  };

  const handleVoiceSubmit = () => {
    if (!voiceInput.trim()) return;
    
    const parsed = parseVoiceInput(voiceInput);
    if (parsed) {
      const product: Product = {
        id: Date.now().toString(),
        ...parsed,
        description: getDescriptions(parsed as Product)[0],
        timestamp: new Date()
      };
      setCurrentProduct(product);
      setCurrentStep(2);
    }
  };

  const handleProductConfirm = () => {
    if (currentProduct) {
      setCatalog(prev => [...prev, currentProduct]);
      setCurrentStep(3);
    }
  };

  const updatePrice = (newPrice: number) => {
    if (currentProduct) {
      setCurrentProduct({ ...currentProduct, price: newPrice });
    }
  };

  const regenerateDescription = () => {
    if (currentProduct) {
      const descriptions = getDescriptions(currentProduct);
      const nextVariant = (descriptionVariant + 1) % descriptions.length;
      setDescriptionVariant(nextVariant);
      setCurrentProduct({ ...currentProduct, description: descriptions[nextVariant] });
    }
  };

  const getChatMessages = () => [
    { type: 'buyer', text: t('chatBuyer1') },
    { 
      type: 'bot', 
      text: t('chatBot1', { 
        quantity: currentProduct?.quantity || '2kg', 
        product: currentProduct?.name?.toLowerCase() || 'tomatoes', 
        price: currentProduct?.price || 40 
      }) 
    },
    { type: 'buyer', text: t('chatBuyer2') },
    { 
      type: 'bot', 
      text: t('chatBot2', { 
        price: currentProduct ? currentProduct.price * 2 : 80 
      }) 
    }
  ];

  const startListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const examples = getExampleInputs();
      setVoiceInput(examples[Math.floor(Math.random() * examples.length)]);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Dashboard language={language} catalog={catalog} onNavigate={setCurrentStep} />;

      case 1:
        return (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Mic className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('step1Title')}</h2>
                <p className="text-gray-600">{t('step1Subtitle')}</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('voiceInputLabel')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={voiceInput}
                      onChange={(e) => setVoiceInput(e.target.value)}
                      placeholder={t('voiceInputPlaceholder')}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={startListening}
                      disabled={isListening}
                      className={`absolute right-3 top-3 p-2 rounded-full ${
                        isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500 hover:bg-green-600'
                      } text-white transition-all duration-200`}
                    >
                      <Mic className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">{t('tryExample')}</p>
                  <div className="space-y-2">
                    {getExampleInputs().map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setVoiceInput(example)}
                        className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                      >
                        "{example}"
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleVoiceSubmit}
                  disabled={!voiceInput.trim()}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {t('processVoiceInput')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Edit3 className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('step2Title')}</h2>
                <p className="text-gray-600">{t('step2Subtitle')}</p>
              </div>

              {currentProduct && (
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('productLabel')}</label>
                      <div className="p-3 bg-gray-50 rounded-lg font-semibold">{currentProduct.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('quantityLabel')}</label>
                      <div className="p-3 bg-gray-50 rounded-lg font-semibold">{currentProduct.quantity}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('priceLabel')}</label>
                      <div className="p-3 bg-gray-50 rounded-lg font-semibold">₹{currentProduct.price}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{t('categoryLabel')}</label>
                      <div className="p-3 bg-gray-50 rounded-lg font-semibold">{currentProduct.category}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      {t('editDetails')}
                    </button>
                    <button
                      onClick={handleProductConfirm}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {t('confirmContinue')}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('step3Title')}</h2>
                <p className="text-gray-600">{t('step3Subtitle')}</p>
              </div>

              <div className="space-y-6">
                {/* Auto Description */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {t('autoDescription')}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-800">{currentProduct?.description}</p>
                  </div>
                  <button
                    onClick={regenerateDescription}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {t('regenerate')}
                  </button>
                </div>

                {/* Smart Pricing */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {t('smartPricing')}
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-gray-800">
                      {t('pricingSuggestion', {
                        product: currentProduct?.name?.toLowerCase() || 'tomatoes',
                        min: currentProduct ? currentProduct.price + 5 : 45,
                        max: currentProduct ? currentProduct.price + 8 : 48,
                        suggested: currentProduct ? currentProduct.price + 3 : 43
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => updatePrice(currentProduct ? currentProduct.price + 3 : 43)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    {t('applySuggestedPrice')}
                  </button>
                </div>

                <button
                  onClick={() => setCurrentStep(4)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {t('continueToWhatsApp')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('step4Title')}</h2>
                <p className="text-gray-600">{t('step4Subtitle')}</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <button
                  onClick={() => setShowWhatsApp(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mb-6"
                >
                  {t('pushToWhatsApp')}
                  <ArrowRight className="w-5 h-5" />
                </button>

                {showWhatsApp && (
                  <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                    <div className="bg-green-600 text-white p-3 rounded-t-lg -mx-4 -mt-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold">B</span>
                        </div>
                        <span className="font-semibold">{t('appName')}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🍅</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{currentProduct?.name}</h4>
                          <p className="text-sm text-gray-600">{currentProduct?.description}</p>
                          <p className="text-lg font-bold text-green-600">₹{currentProduct?.price}</p>
                        </div>
                      </div>
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-700 transition-colors">
                        {t('orderNow')}
                      </button>
                    </div>
                    
                    <div className="text-right mt-2">
                      <span className="text-xs text-gray-500">{t('delivered')}</span>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    {t('back')}
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {t('seeCustomerChat')}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="p-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="bg-indigo-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('step5Title')}</h2>
                <p className="text-gray-600">{t('step5Subtitle')}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('chatLanguage')}</label>
                  <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 min-h-64">
                  <div className="space-y-3">
                    {getChatMessages().slice(0, chatStep + 1).map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.type === 'buyer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.type === 'buyer'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-800 border'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => setChatStep(Math.min(chatStep + 1, getChatMessages().length - 1))}
                    disabled={chatStep >= getChatMessages().length - 1}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {t('nextMessage')}
                  </button>
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {t('viewCatalog')}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('step6Title')}</h2>
                <p className="text-gray-600">{t('step6Subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {catalog.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🍅</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.quantity}</p>
                        <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                        {t('edit')}
                      </button>
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                        {t('share')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setVoiceInput('');
                    setCurrentProduct(null);
                    setShowWhatsApp(false);
                    setChatStep(0);
                    setDescriptionVariant(0);
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {t('addNewProduct')}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-50 transition-transform duration-300`}>
        <Sidebar
          currentStep={currentStep}
          onStepChange={(step) => {
            setCurrentStep(step);
            setMobileMenuOpen(false);
          }}
          language={language}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="hidden lg:block">
                <h1 className="text-xl font-semibold text-gray-800">
                  {currentStep === 0 ? t('dashboard') : 
                   currentStep === 1 ? t('voiceInput') :
                   currentStep === 2 ? t('productListing') :
                   currentStep === 3 ? t('aiSuggestions') :
                   currentStep === 4 ? t('whatsappShare') :
                   currentStep === 5 ? t('customerChat') :
                   t('catalog')}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
              {currentStep > 0 && (
                <div className="hidden sm:block text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {t('stepOf', { current: currentStep, total: 6 })}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Progress Bar (only show for steps 1-6) */}
        {currentStep > 0 && (
          <div className="bg-white border-b border-gray-200">
            <div className="px-4 py-2">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div key={step} className="flex-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        step <= currentStep ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {renderStep()}
        </main>
      </div>
    </div>
  );
}

export default App;