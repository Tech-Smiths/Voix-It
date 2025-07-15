import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LanguageToggle from '@/components/LanguageToggle';
import { Mic2, Package, Share, Sparkles, Users, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-voice-catalog.jpg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: Mic2,
      title: "Voice-First",
      description: "Just speak to add products",
      color: "text-voice-primary"
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Smart product extraction",
      color: "text-ai-accent"
    },
    {
      icon: Share,
      title: "Easy Sharing",
      description: "WhatsApp & social media",
      color: "text-success"
    },
    {
      icon: TrendingUp,
      title: "Grow Sales",
      description: "Reach more customers",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Mic2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('appName')}</h1>
            <p className="text-sm text-muted-foreground">{t('tagline')}</p>
          </div>
        </div>
        <LanguageToggle />
      </header>

      {/* Hero Section */}
      <main className="px-4 md:px-6 pb-24 md:pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <Card className="bg-gradient-card border border-border shadow-card overflow-hidden mb-8">
            {/* Hero Image */}
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img 
                src={heroImage} 
                alt="Voice-powered catalog for rural sellers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {t('welcome')}
                </h2>
                <p className="text-lg opacity-90">
                  {t('subtitle')}
                </p>
              </div>
            </div>
            
            <div className="p-8 space-y-6 text-center">
              
              {/* Main Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <Button
                  onClick={() => navigate('/add-product')}
                  size="lg"
                  className="bg-gradient-voice text-white hover:scale-105 transition-transform duration-200 shadow-voice h-16"
                >
                  <Mic2 className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">{t('speakToAdd')}</div>
                    <div className="text-xs opacity-90">Quick & Easy</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => navigate('/catalog')}
                  variant="outline"
                  size="lg"
                  className="border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 h-16"
                >
                  <Package className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">{t('viewCatalog')}</div>
                    <div className="text-xs opacity-70">Manage Products</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => navigate('/share')}
                  variant="outline"
                  size="lg"
                  className="border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200 h-16"
                >
                  <Share className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">{t('shareWhatsApp')}</div>
                    <div className="text-xs opacity-70">Reach Customers</div>
                  </div>
                </Button>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border border-border shadow-card p-4 text-center hover:shadow-warm transition-shadow duration-200">
                <feature.icon className={`w-8 h-8 mx-auto mb-3 ${feature.color}`} />
                <h4 className="font-semibold text-sm text-foreground mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <Card className="bg-gradient-primary text-white p-6 shadow-warm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm opacity-90">Languages</div>
              </div>
              <div>
                <div className="text-2xl font-bold">AI</div>
                <div className="text-sm opacity-90">Powered</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-90">Support</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;