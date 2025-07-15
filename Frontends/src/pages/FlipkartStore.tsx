import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import LanguageToggle from '@/components/LanguageToggle';
import Navigation from '@/components/Navigation';
import { Product } from '@/components/ProductCard';
import {
  Search,
  Grid,
  List,
  Star,
  ShoppingBag,
  TrendingUp,
  Eye
} from 'lucide-react';

const FlipkartStore: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const flipkartProducts: Product[] = [
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
        quantity: 25,
        category: 'Grains',
        description: 'Premium quality basmati rice, aged for perfect aroma.',
        status: 'in-stock',
        language: 'en',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    setProducts(flipkartProducts);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProduct = (product: Product) => {
    toast({
      title: "📊 Product Analytics",
      description: `${product.name}: 45 views, 12 wishlisted, 3 orders.`,
    });
  };

  const MockRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">(4.{rating})</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-flipkart-blue/5 via-background to-flipkart-yellow/5 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-flipkart-blue text-white p-4 md:p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-8 h-8" />
            <div>
              <h1 className="text-2xl text-black font-bold">My Flipkart Store</h1>
              <p className="text-black text-sm">{products.length} products live</p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="px-4 md:px-6 max-w-7xl mx-auto space-y-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-flipkart text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black opacity-90">Total Sales</p>
                <p className="text-black font-bold">₹12,450</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </Card>
          <Card className="bg-green-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <ShoppingBag className="w-8 h-8 opacity-80" />
            </div>
          </Card>
          <Card className="bg-yellow-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Views</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <Eye className="w-8 h-8 opacity-80" />
            </div>
          </Card>
          <Card className="bg-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Orders</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <Star className="w-8 h-8 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Search & View Mode */}
        <Card className="bg-card border border-border shadow-lg p-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search your Flipkart products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-1 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <Card className="bg-card border border-border shadow-card p-12 text-center">
            <div className="w-16 h-16 bg-flipkart-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-flipkart-blue" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
            <p className="text-muted-foreground mb-4">
              Start adding products to your Flipkart store
            </p>
            <Button onClick={() => window.location.href = '/add-product'} className="bg-flipkart-blue hover:bg-flipkart-blue/90">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Card>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'}>
            {filteredProducts.map(product => (
              <Card key={product.id} className="bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-flipkart-blue text-white">
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      Flipkart Listed
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="relative">
                    <div className="w-full h-40 bg-gradient-marketplace rounded-lg flex items-center justify-center border-2 border-flipkart-blue/20">
                      <ShoppingBag className="w-12 h-12 text-flipkart-blue/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-flipkart-blue transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-flipkart-blue">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Stock: {product.quantity}
                      </p>
                    </div>
                    <MockRating rating={4} />
                    {product.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="bg-flipkart-blue/5 rounded-lg p-3 text-sm">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="font-semibold text-flipkart-blue">45</p>
                          <p className="text-muted-foreground text-xs">Views</p>
                        </div>
                        <div>
                          <p className="font-semibold text-green-600">12</p>
                          <p className="text-muted-foreground text-xs">Wishlist</p>
                        </div>
                        <div>
                          <p className="font-semibold text-yellow-600">3</p>
                          <p className="text-muted-foreground text-xs">Orders</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleViewProduct(product)}
                      className="w-full bg-flipkart-blue hover:bg-flipkart-blue/90 text-white"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default FlipkartStore;
