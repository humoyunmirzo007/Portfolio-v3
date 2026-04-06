/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Mail, 
  MapPin, 
  Send, 
  Menu, 
  X, 
  Globe, 
  ChevronRight,
  Presentation,
  TrendingUp,
  BookOpen,
  Layout
} from 'lucide-react';
import { translations } from './translations';

type Language = 'en' | 'ru';

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ru' : 'en');

  const NavItem = ({ href, label }: { href: string, label: string }) => (
    <a 
      href={href} 
      className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </a>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 text-slate-900 selection:bg-blue-100 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent"
          >
            KT.
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavItem href="#home" label={t.nav.home} />
            <NavItem href="#about" label={t.nav.about} />
            <NavItem href="#projects" label={t.nav.projects} />
            <NavItem href="#contact" label={t.nav.contact} />
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 hover:border-blue-300 transition-all text-sm font-semibold cursor-pointer"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="text-sm font-bold cursor-pointer">{lang.toUpperCase()}</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
            >
              <NavItem href="#home" label={t.nav.home} />
              <NavItem href="#about" label={t.nav.about} />
              <NavItem href="#projects" label={t.nav.projects} />
              <NavItem href="#contact" label={t.nav.contact} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 container mx-auto px-6">
        <div className="max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-semibold mb-4 tracking-wide uppercase text-sm"
          >
            {t.hero.greeting}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            {t.hero.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 mb-8 font-medium"
          >
            {t.hero.role}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed"
          >
            {t.hero.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="/resume.pdf" 
              download 
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <Download size={20} />
              {t.hero.downloadCV}
            </a>
            <a 
              href="#contact" 
              className="bg-white border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:border-blue-400 transition-all"
            >
              {t.hero.contactMe}
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                {t.about.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {t.about.text}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.about.strengths.map((s, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-blue-600 mb-1">{s.title}</h4>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-tr from-blue-100 to-pink-100 overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="text-slate-400">
                  <Layout size={80} strokeWidth={1} />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Education</p>
                <p className="font-bold text-lg">WIUT Student</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">{t.projects.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {t.projects.items.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-50/50"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {i === 0 ? <TrendingUp size={24} /> : i === 1 ? <BookOpen size={24} /> : <Presentation size={24} />}
              </div>
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{p.tech}</span>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">{t.contact.title}</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <p className="text-slate-400 text-sm">{t.contact.location}</p>
              <p className="font-medium text-sm md:text-base">E quarter, 9, Chilanzar, Tashkent</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
                <Mail size={24} />
              </div>
              <p className="text-slate-400 text-sm">{t.contact.email}</p>
              <a href="mailto:ikhumoyunmirzo@gmail.com" className="font-medium hover:text-blue-400 transition-colors break-all">ikhumoyunmirzo@gmail.com</a>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
                <Send size={24} />
              </div>
              <p className="text-slate-400 text-sm">{t.contact.telegram}</p>
              <a href="https://t.me/your_username" target="_blank" rel="noreferrer" className="font-medium hover:text-blue-400 transition-colors">@your_username</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Khumoyunmirzo Tokhirjonov. All rights reserved.</p>
      </footer>
    </div>
  );
}

