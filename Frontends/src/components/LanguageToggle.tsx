import React from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages: Array<{ code: Language; label: string; flag: string }> = [
    { code: 'en', label: t('english'), flag: '🇬🇧' },
    { code: 'ta', label: t('tamil'), flag: '🇮🇳' },
    { code: 'hi', label: t('hindi'), flag: '🇮🇳' },
    { code: 'te', label: t('telugu'), flag: '🇮🇳' },
    { code: 'kn', label: t('kannada'), flag: '🇮🇳' }
  ];

  return (
    <div className="flex items-center space-x-2 bg-card rounded-xl p-2 shadow-card border border-border">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex space-x-1">
        {languages.map(({ code, label, flag }) => (
          <Button
            key={code}
            variant={language === code ? "default" : "ghost"}
            size="sm"
            onClick={() => setLanguage(code)}
            className={`
              px-3 py-1.5 h-auto text-xs font-medium rounded-lg transition-all duration-200
              ${language === code 
                ? 'bg-gradient-primary text-primary-foreground shadow-warm scale-105' 
                : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <span className="mr-1.5">{flag}</span>
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden uppercase">{code}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;