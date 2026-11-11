import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ShengmuSection } from './components/ShengmuSection';
import { YunmuSection } from './components/YunmuSection';
import { TonesSection } from './components/TonesSection';
import { ToneSandhiSection } from './components/ToneSandhiSection';
import { RulesSection } from './components/RulesSection';
import { PracticeSection } from './components/PracticeSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('shengmu');
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    // Smooth scroll to top of section content
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Main Educational Content Area */}
      <main className="flex-1">
        {/* Hero Banner & Syllable Anatomy Sandbox */}
        <HeroSection onExplore={handleSelectTab} />

        {/* Tab Content Router */}
        <div className="transition-opacity duration-200">
          {activeTab === 'shengmu' && <ShengmuSection />}
          {activeTab === 'yunmu' && <YunmuSection />}
          {activeTab === 'shengdiao' && <TonesSection />}
          {activeTab === 'sandhi-netral' && <ToneSandhiSection />}
          {activeTab === 'aturan' && <RulesSection />}
          {activeTab === 'latihan' && <PracticeSection />}
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
