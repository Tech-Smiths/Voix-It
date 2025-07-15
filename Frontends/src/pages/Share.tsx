import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProductCard, { Product } from '@/components/ProductCard';
import LanguageToggle from '@/components/LanguageToggle';
import Navigation from '@/components/Navigation';
import { Share as ShareIcon, MessageCircle, Copy, QrCode, ExternalLink, Check } from 'lucide-react';

const Share: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Mock data - same as catalog
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Fresh Tomatoes',
        price: 80,
        quantity: 50,
        category: 'Vegetables',
        description: 'Farm-fresh organic tomatoes, perfect for cooking and salads.',
        status: 'in-stock',
        language: 'en',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Basmati Rice',
        price: 120,
        quantity: 5,
        category: 'Grains',
        description: 'Premium quality basmati rice, aged for perfect aroma.',
        status: 'low-stock',
        language: 'en',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: 'Organic Onions',
        price: 40,
        quantity: 30,
        category: 'Vegetables',
        description: 'Chemical-free organic onions from local farms.',
        status: 'in-stock',
        language: 'en',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    setProducts(mockProducts.filter(p => p.status !== 'out-of-stock'));
    
    // Generate mock share URL
    setShareUrl(`https://voix-it.app/catalog/shared/${Date.now()}`);
  }, []);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllProducts = () => {
    setSelectedProducts(products.map(p => p.id));
  };

  const clearSelection = () => {
    setSelectedProducts([]);
  };

  const generateWhatsAppMessage = () => {
    const selectedItems = products.filter(p => selectedProducts.includes(p.id));
    if (selectedItems.length === 0) return '';
    
    let message = `🛒 *Fresh Products Available!*\n\n`;
    
    selectedItems.forEach((product, index) => {
      message += `${index + 1}. *${product.name}*\n`;
      message += `   💰 ₹${product.price}\n`;
      message += `   📦 ${product.quantity} available\n`;
      if (product.description) {
        message += `   📝 ${product.description.slice(0, 50)}...\n`;
      }
      message += `\n`;
    });
    
    message += `📱 Order now: ${shareUrl}\n`;
    message += `🚚 Fast delivery available!`;
    
    return encodeURIComponent(message);
  };

  const shareToWhatsApp = () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "No Products Selected",
        description: "Please select at least one product to share.",
        variant: "destructive"
      });
      return;
    }
    
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Shared to WhatsApp!",
      description: `${selectedProducts.length} products shared successfully.`,
    });
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Link Copied!",
        description: "Share link has been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link to clipboard.",
        variant: "destructive"
      });
    }
  };

  const selectedProductsData = products.filter(p => selectedProducts.includes(p.id));

  return (
    <div className="min-h-screen bg-gradient-warm pb-20 md:pb-0">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('share')}</h1>
          <p className="text-sm text-muted-foreground">Share your products with customers</p>
        </div>
        <LanguageToggle />
      </header>

      <main className="px-4 md:px-6 max-w-4xl mx-auto space-y-6">
        {/* Selection Controls */}
        <Card className="bg-card border border-border shadow-card p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="font-semibold text-foreground">
                Select Products to Share
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedProducts.length} of {products.length} products selected
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllProducts}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Products Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card 
              key={product.id}
              className={`
                cursor-pointer transition-all duration-200 border-2
                ${selectedProducts.includes(product.id)
                  ? 'border-primary bg-primary/5 shadow-warm' 
                  : 'border-border hover:border-primary/50'
                }
              `}
              onClick={() => toggleProductSelection(product.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{product.name}</h4>
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${selectedProducts.includes(product.id)
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'
                    }
                  `}>
                    {selectedProducts.includes(product.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">₹{product.price}</span>
                    <span className="text-sm text-muted-foreground">{product.quantity} available</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Share Options */}
        {selectedProducts.length > 0 && (
          <Card className="bg-gradient-card border border-border shadow-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Share Options</h3>
            
            {/* WhatsApp Preview */}
            <div className="bg-secondary/30 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-foreground mb-2">WhatsApp Preview:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>🛒 <strong>Fresh Products Available!</strong></p>
                {selectedProductsData.slice(0, 2).map((product, index) => (
                  <div key={product.id}>
                    <p>{index + 1}. <strong>{product.name}</strong></p>
                    <p className="ml-4">💰 ₹{product.price} | 📦 {product.quantity} available</p>
                  </div>
                ))}
                {selectedProductsData.length > 2 && (
                  <p>... and {selectedProductsData.length - 2} more items</p>
                )}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={shareToWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Share on WhatsApp
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" onClick={copyShareLink} size="lg">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Share Link
                    </>
                  )}
                </Button>
                
                <Button variant="outline" size="lg">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
              </div>
            </div>

            {/* Share URL */}
            <div className="mt-6 p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Share URL:</p>
              <p className="text-sm font-mono text-foreground break-all">{shareUrl}</p>
            </div>
          </Card>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default Share;