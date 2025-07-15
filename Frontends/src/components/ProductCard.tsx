import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Share, Package, AlertTriangle } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  image?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onShare: (product: Product) => void;
  onUpdateStock: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onShare,
  onUpdateStock
}) => {
  const { t } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-success text-white';
      case 'low-stock':
        return 'bg-warning text-white';
      case 'out-of-stock':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return t('inStock');
      case 'low-stock':
        return t('lowStock');
      case 'out-of-stock':
        return t('outOfStock');
      default:
        return status;
    }
  };

  return (
    <Card className="bg-gradient-card border border-border shadow-card hover:shadow-warm transition-all duration-300 hover:scale-[1.02] group">
      <div className="p-4 space-y-4">
        {/* Product Image */}
        <div className="relative">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg bg-secondary"
            />
          ) : (
            <div className="w-full h-40 bg-gradient-warm rounded-lg flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          
          {/* Status Badge */}
          <Badge className={`absolute top-2 right-2 ${getStatusColor(product.status)}`}>
            {product.status === 'low-stock' && <AlertTriangle className="w-3 h-3 mr-1" />}
            {getStatusText(product.status)}
          </Badge>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('quantity')}: {product.quantity}
            </p>
          </div>

          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(product)}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            {t('edit')}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare(product)}
            className="flex-1"
          >
            <Share className="w-4 h-4 mr-1" />
            {t('share')}
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(product.id)}
            className="px-3"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        {product.status === 'low-stock' && (
          <Button
            onClick={() => onUpdateStock(product.id)}
            className="w-full bg-warning hover:bg-warning/90 text-white"
            size="sm"
          >
            <Package className="w-4 h-4 mr-2" />
            {t('update')} {t('quantity')}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;