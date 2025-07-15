import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Home, Plus, Package, Share, Mic2 } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/add-product', icon: Plus, label: t('addProduct') },
    { path: '/catalog', icon: Package, label: t('catalog') },
    { path: '/share', icon: Share, label: t('share') }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-card border-t border-border z-50 md:relative md:border-t-0 md:bg-transparent">
      <div className="flex justify-around items-center px-4 py-3 md:justify-start md:space-x-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Button
              key={path}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate(path)}
              className={`
                flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 
                px-3 py-2 h-auto min-w-[60px] md:min-w-auto transition-all duration-200
                ${isActive 
                  ? 'bg-gradient-primary text-primary-foreground shadow-warm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs md:text-sm font-medium">{label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;