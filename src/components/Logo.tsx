import React from 'react';
import { Mic, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, animated = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Main logo container with gradient background */}
        <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-voix-500 via-purple-600 to-indigo-600 flex items-center justify-center relative overflow-hidden ${animated ? 'logo-gradient' : ''}`}>
          {/* Voice waves background effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-1 h-4 bg-white/20 rounded-full mx-0.5 ${animated ? 'voice-wave' : ''}`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-1 h-6 bg-white/30 rounded-full mx-0.5 ${animated ? 'voice-wave' : ''}`} style={{ animationDelay: '200ms' }}></div>
            <div className={`w-1 h-8 bg-white/40 rounded-full mx-0.5 ${animated ? 'voice-wave' : ''}`} style={{ animationDelay: '400ms' }}></div>
            <div className={`w-1 h-6 bg-white/30 rounded-full mx-0.5 ${animated ? 'voice-wave' : ''}`} style={{ animationDelay: '600ms' }}></div>
            <div className={`w-1 h-4 bg-white/20 rounded-full mx-0.5 ${animated ? 'voice-wave' : ''}`} style={{ animationDelay: '800ms' }}></div>
          </div>
          
          {/* Main microphone icon */}
          <Mic className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-white relative z-10`} />
          
          {/* Lightning bolt for AI indication */}
          <Zap className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-300 absolute top-1 right-1 z-10`} />
        </div>
        
        {/* Glow effect */}
        {animated && (
          <div className={`${sizeClasses[size]} absolute inset-0 rounded-xl bg-gradient-to-br from-voix-500 via-purple-600 to-indigo-600 opacity-30 blur-md -z-10 pulse-slow`}></div>
        )}
      </div>
      
      {showText && (
        <div>
          <h1 className={`${textSizeClasses[size]} font-orbitron font-bold text-gradient leading-none`}>
            VOIX'IT
          </h1>
          <p className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'} font-inter text-gray-500 font-medium tracking-wide`}>
            AI Voice Commerce
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;