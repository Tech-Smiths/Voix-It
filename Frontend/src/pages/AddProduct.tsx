import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import VoiceInput from '@/components/VoiceInput';
import LanguageToggle from '@/components/LanguageToggle';
import Navigation from '@/components/Navigation';
import { Mic2, Type, Camera, Sparkles, Check, RotateCcw } from 'lucide-react';

interface ProductData {
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  detectedLanguage: string;
}

const AddProduct: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [isProcessing, setIsProcessing] = useState(false);
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    price: 0,
    quantity: 1,
    category: '',
    description: '',
    detectedLanguage: ''
  });
  const [rawTranscript, setRawTranscript] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleVoiceTranscript = async (transcript: string, detectedLang: string) => {
    setIsProcessing(true);
    setRawTranscript(transcript);
    
    try {
      // Simulate AI processing - in real implementation, call your AI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI extraction
      const mockData: ProductData = {
        name: extractProductName(transcript),
        price: extractPrice(transcript),
        quantity: extractQuantity(transcript),
        category: extractCategory(transcript),
        description: generateDescription(transcript),
        detectedLanguage: detectedLang
      };
      
      setProductData(mockData);
      setShowPreview(true);
      
      toast({
        title: "Product Extracted Successfully!",
        description: "AI has processed your voice input.",
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process voice input. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock AI extraction functions (replace with actual API calls)
  const extractProductName = (text: string): string => {
    // Simple extraction logic - in real app, use AI
    const words = text.toLowerCase().split(' ');
    if (words.includes('tomato') || words.includes('tomatoes')) return 'Fresh Tomatoes';
    if (words.includes('rice')) return 'Basmati Rice';
    if (words.includes('milk')) return 'Fresh Milk';
    return 'Extracted Product';
  };

  const extractPrice = (text: string): number => {
    const priceMatch = text.match(/\d+/);
    return priceMatch ? parseInt(priceMatch[0]) : 100;
  };

  const extractQuantity = (text: string): number => {
    if (text.includes('kg') || text.includes('kilogram')) return 1;
    if (text.includes('dozen')) return 12;
    return 1;
  };

  const extractCategory = (text: string): string => {
    const words = text.toLowerCase();
    if (words.includes('vegetable') || words.includes('tomato')) return 'Vegetables';
    if (words.includes('grain') || words.includes('rice')) return 'Grains';
    if (words.includes('dairy') || words.includes('milk')) return 'Dairy';
    return 'General';
  };

  const generateDescription = (text: string): string => {
    return `AI-generated description based on: "${text}". Fresh, high-quality product available for immediate purchase.`;
  };

  const handleManualSubmit = () => {
    if (!productData.name || productData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setShowPreview(true);
  };

  const handleSaveProduct = () => {
    // In real app, save to database/API
    toast({
      title: "Product Saved!",
      description: `${productData.name} has been added to your catalog.`,
    });
    
    // Reset form
    setProductData({
      name: '',
      price: 0,
      quantity: 1,
      category: '',
      description: '',
      detectedLanguage: ''
    });
    setShowPreview(false);
    setRawTranscript('');
  };

  const resetForm = () => {
    setProductData({
      name: '',
      price: 0,
      quantity: 1,
      category: '',
      description: '',
      detectedLanguage: ''
    });
    setShowPreview(false);
    setRawTranscript('');
  };

  return (
    <div className="min-h-screen bg-gradient-warm pb-20 md:pb-0">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6">
        <h1 className="text-2xl font-bold text-foreground">{t('addProduct')}</h1>
        <LanguageToggle />
      </header>

      <main className="px-4 md:px-6 max-w-4xl mx-auto">
        {/* Input Mode Toggle */}
        <Card className="bg-card border border-border shadow-card p-4 mb-6">
          <div className="flex space-x-4">
            <Button
              variant={inputMode === 'voice' ? 'default' : 'outline'}
              onClick={() => setInputMode('voice')}
              className={inputMode === 'voice' ? 'bg-gradient-voice text-white' : ''}
            >
              <Mic2 className="w-4 h-4 mr-2" />
              {t('voiceInput')}
            </Button>
            <Button
              variant={inputMode === 'text' ? 'default' : 'outline'}
              onClick={() => setInputMode('text')}
            >
              <Type className="w-4 h-4 mr-2" />
              {t('textInput')}
            </Button>
          </div>
        </Card>

        {inputMode === 'voice' ? (
          // Voice Input Section
          <div className="space-y-6">
            <VoiceInput 
              onTranscript={handleVoiceTranscript}
              isProcessing={isProcessing}
            />
            
            {rawTranscript && (
              <Card className="bg-secondary/50 border border-border p-4">
                <Label className="text-sm font-medium text-muted-foreground">Raw Transcript:</Label>
                <p className="text-foreground mt-1">{rawTranscript}</p>
              </Card>
            )}
          </div>
        ) : (
          // Manual Text Input Section
          <Card className="bg-card border border-border shadow-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('productName')} *</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) => setProductData({...productData, name: e.target.value})}
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <Label htmlFor="category">{t('category')}</Label>
                <Input
                  id="category"
                  value={productData.category}
                  onChange={(e) => setProductData({...productData, category: e.target.value})}
                  placeholder="e.g., Vegetables, Grains"
                />
              </div>
              
              <div>
                <Label htmlFor="price">{t('price')} (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={productData.price || ''}
                  onChange={(e) => setProductData({...productData, price: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>
              
              <div>
                <Label htmlFor="quantity">{t('quantity')}</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={productData.quantity}
                  onChange={(e) => setProductData({...productData, quantity: Number(e.target.value)})}
                  placeholder="1"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description">{t('description')}</Label>
                <Textarea
                  id="description"
                  value={productData.description}
                  onChange={(e) => setProductData({...productData, description: e.target.value})}
                  placeholder="Product description..."
                  rows={3}
                />
              </div>
            </div>
            
            <Button onClick={handleManualSubmit} className="w-full mt-6">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('confirm')}
            </Button>
          </Card>
        )}

        {/* Product Preview */}
        {showPreview && (
          <Card className="bg-gradient-card border border-border shadow-card p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Product Preview</h3>
              {productData.detectedLanguage && (
                <Badge variant="outline">
                  {productData.detectedLanguage.toUpperCase()}
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label className="text-sm text-muted-foreground">{t('productName')}</Label>
                <p className="font-medium">{productData.name}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">{t('price')}</Label>
                <p className="font-medium text-primary">₹{productData.price}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">{t('quantity')}</Label>
                <p className="font-medium">{productData.quantity}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">{t('category')}</Label>
                <p className="font-medium">{productData.category}</p>
              </div>
            </div>
            
            {productData.description && (
              <div className="mb-6">
                <Label className="text-sm text-muted-foreground">{t('description')}</Label>
                <p className="text-sm mt-1">{productData.description}</p>
              </div>
            )}
            
            <div className="flex space-x-4">
              <Button onClick={handleSaveProduct} className="flex-1 bg-success hover:bg-success/90">
                <Check className="w-4 h-4 mr-2" />
                {t('save')}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                <RotateCcw className="w-4 h-4 mr-2" />
                {t('retry')}
              </Button>
            </div>
          </Card>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default AddProduct;