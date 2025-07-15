import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ProductCard, { Product } from '@/components/ProductCard';
import LanguageToggle from '@/components/LanguageToggle';
import Navigation from '@/components/Navigation';
import { Search, Grid, List, Filter, Plus, AlertTriangle } from 'lucide-react';

const Catalog: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'in-stock' | 'low-stock' | 'out-of-stock'>('all');

  useEffect(() => {
    // Mock data - in real app, fetch from API
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
        id: '3',
        name: 'Fresh Milk',
        price: 60,
        quantity: 0,
        category: 'Dairy',
        description: 'Pure cow milk, delivered fresh daily.',
        status: 'out-of-stock',
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
    
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || product.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (product: Product) => {
    // In real app, navigate to edit page
    toast({
      title: "Edit Product",
      description: `Editing ${product.name}`,
    });
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from your catalog.",
    });
  };

  const handleShare = (product: Product) => {
    // In real app, implement sharing logic
    toast({
      title: "Share Product",
      description: `Sharing ${product.name}`,
    });
  };

  const handleUpdateStock = (id: string) => {
    // In real app, open update stock modal
    toast({
      title: "Update Stock",
      description: "Stock update functionality coming soon!",
    });
  };

  const getFilterCount = (filterType: typeof filter) => {
    if (filterType === 'all') return products.length;
    return products.filter(p => p.status === filterType).length;
  };

  const lowStockCount = products.filter(p => p.status === 'low-stock').length;
  const outOfStockCount = products.filter(p => p.status === 'out-of-stock').length;

  return (
    <div className="min-h-screen bg-gradient-warm pb-20 md:pb-0">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('catalog')}</h1>
          <p className="text-sm text-muted-foreground">{products.length} products total</p>
        </div>
        <LanguageToggle />
      </header>

      <main className="px-4 md:px-6 max-w-6xl mx-auto space-y-6">
        {/* Alerts */}
        {(lowStockCount > 0 || outOfStockCount > 0) && (
          <Card className="bg-warning/10 border-warning/20 p-4">
            <div className="flex items-center space-x-2 text-warning">
              <AlertTriangle className="w-5 h-5" />
              <div>
                <p className="font-medium">Inventory Alerts</p>
                <p className="text-sm">
                  {lowStockCount > 0 && `${lowStockCount} items low on stock`}
                  {lowStockCount > 0 && outOfStockCount > 0 && ', '}
                  {outOfStockCount > 0 && `${outOfStockCount} items out of stock`}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Controls */}
        <Card className="bg-card border border-border shadow-card p-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter */}
            <div className="flex space-x-2">
              {(['all', 'in-stock', 'low-stock', 'out-of-stock'] as const).map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                  className="whitespace-nowrap"
                >
                  {filterType === 'all' ? 'All' : filterType.replace('-', ' ')}
                  <span className="ml-1 text-xs">({getFilterCount(filterType)})</span>
                </Button>
              ))}
            </div>

            {/* View Mode */}
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

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <Card className="bg-card border border-border shadow-card p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first product'}
            </p>
            <Button onClick={() => window.location.href = '/add-product'}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Card>
        ) : (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }
          `}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onShare={handleShare}
                onUpdateStock={handleUpdateStock}
              />
            ))}
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default Catalog;