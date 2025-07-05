import React from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  MessageCircle, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  Share2,
  DollarSign
} from 'lucide-react';
import { getTranslation } from '../utils/translations';

interface DashboardProps {
  language: string;
  catalog: any[];
  onNavigate: (step: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ language, catalog, onNavigate }) => {
  const t = (key: string, params?: Record<string, string | number>) => getTranslation(language, key, params);

  const stats = [
    {
      title: t('totalProducts'),
      value: catalog.length.toString(),
      change: '+12%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: t('totalViews'),
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: t('totalMessages'),
      value: '89',
      change: '+23%',
      trend: 'up',
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: t('totalRevenue'),
      value: '₹12,450',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  const recentActivity = [
    { action: t('newProductAdded'), product: 'Tomatoes', time: '2 hours ago', type: 'product' },
    { action: t('customerInquiry'), product: 'Onions', time: '4 hours ago', type: 'message' },
    { action: t('priceUpdated'), product: 'Potatoes', time: '6 hours ago', type: 'update' },
    { action: t('productShared'), product: 'Tomatoes', time: '1 day ago', type: 'share' }
  ];

  const quickActions = [
    { title: t('addProduct'), description: t('addProductDesc'), action: () => onNavigate(1), color: 'bg-green-500' },
    { title: t('viewCatalog'), description: t('viewCatalogDesc'), action: () => onNavigate(6), color: 'bg-blue-500' },
    { title: t('checkMessages'), description: t('checkMessagesDesc'), action: () => onNavigate(5), color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{t('welcomeBack')}</h1>
            <p className="text-green-100">{t('dashboardSubtitle')}</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white rounded-xl p-6 border ${stat.borderColor} shadow-sm hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('quickActions')}</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 group-hover:text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recentActivity')}</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'product' ? 'bg-green-100 text-green-600' :
                    activity.type === 'message' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'update' ? 'bg-orange-100 text-orange-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'product' && <ShoppingCart className="w-5 h-5" />}
                    {activity.type === 'message' && <MessageCircle className="w-5 h-5" />}
                    {activity.type === 'update' && <TrendingUp className="w-5 h-5" />}
                    {activity.type === 'share' && <Share2 className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.product}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      {catalog.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('topProducts')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {catalog.slice(0, 3).map((product, index) => (
              <div key={product.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🍅</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span>24</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;