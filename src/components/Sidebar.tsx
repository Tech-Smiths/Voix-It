import React from 'react';
import { 
  Home, 
  Mic, 
  ShoppingCart, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  HelpCircle,
  User,
  Bell,
  TrendingUp,
  Package,
  Users
} from 'lucide-react';
import { getTranslation } from '../utils/translations';
import Logo from './Logo';

interface SidebarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  language: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentStep, 
  onStepChange, 
  language, 
  isCollapsed,
  onToggleCollapse 
}) => {
  const t = (key: string, params?: Record<string, string | number>) => getTranslation(language, key, params);

  const menuItems = [
    { id: 0, icon: Home, label: t('dashboard'), color: 'text-voix-600', bgColor: 'bg-voix-50' },
    { id: 1, icon: Mic, label: t('voiceInput'), color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 2, icon: Package, label: t('productListing'), color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 3, icon: TrendingUp, label: t('aiSuggestions'), color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 4, icon: MessageCircle, label: t('whatsappShare'), color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 5, icon: Users, label: t('customerChat'), color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { id: 6, icon: ShoppingCart, label: t('catalog'), color: 'text-red-600', bgColor: 'bg-red-50' },
  ];

  const bottomMenuItems = [
    { icon: BarChart3, label: t('analytics'), color: 'text-gray-600' },
    { icon: Settings, label: t('settings'), color: 'text-gray-600' },
    { icon: HelpCircle, label: t('help'), color: 'text-gray-600' },
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-lg font-inter`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <Logo size={isCollapsed ? 'sm' : 'md'} showText={!isCollapsed} animated={true} />
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-voix-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{t('vendorName')}</p>
              <p className="text-xs text-gray-500">{t('vendorLocation')}</p>
            </div>
            <Bell className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onStepChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                currentStep === item.id
                  ? `${item.bgColor} ${item.color} shadow-sm`
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentStep === item.id ? item.color : 'text-gray-500'}`} />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
              {currentStep === item.id && !isCollapsed && (
                <div className="ml-auto w-2 h-2 bg-current rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          {bottomMenuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all duration-200"
            >
              <item.icon className="w-5 h-5" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200"
      >
        <div className={`w-3 h-3 border-l-2 border-t-2 border-gray-400 transform transition-transform duration-200 ${
          isCollapsed ? 'rotate-45' : '-rotate-135'
        }`}></div>
      </button>
    </div>
  );
};

export default Sidebar;