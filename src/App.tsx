/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
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
  Moon,
  Sun,
  ArrowUp,
  Linkedin,
  Instagram,
  Github,
  Quote,
  GraduationCap,
  Briefcase,
  Phone,
} from 'lucide-react';
import { translations } from './translations';

type Language = 'en' | 'ru';

/* ------------------------------------------------------------------ */
/*  EDIT ME: your links & contact-form endpoint                        */
/* ------------------------------------------------------------------ */
const SOCIALS = {
  telegram: 'https://t.me/iXumoyunmirzo',
  email: 'ikhumoyunmirzo@gmail.com',
  phone: '+998771121196',
  phoneDisplay: '+998-77-112-11-96',
  linkedin: 'https://www.linkedin.com/in/your-handle', // TODO: replace
  instagram: 'https://instagram.com/your-handle', // TODO: replace
  github: 'https://github.com/humoyunmirzo007',
};

// ── Contact form delivery ────────────────────────────────────────────────────
// Submissions go to /api/contact (Vercel serverless function), which forwards
// them to Telegram. The bot token lives ONLY in Vercel env vars — never here.
// If the API is unavailable (e.g. local dev), the form falls back to mailto.
const CONTACT_API = '/api/contact';
/* ------------------------------------------------------------------ */

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [dark, setDark] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [expIndex, setExpIndex] = useState<number | null>(null);

  const t = translations[lang];

  // Scroll progress bar (direct value — no spring, cheaper on scroll)
  const { scrollYProgress } = useScroll();

  // Init theme from storage / system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(stored ? stored === 'dark' : prefersDark);
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setFormOpen(false); setExpIndex(null); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ru' : 'en'));

  const NavItem = ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      className="group relative text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
      <span className="absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-primary to-tertiary rounded-full" />
    </a>
  );

  const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <span className="font-mono text-xs tracking-widest text-primary/80 dark:text-primary/90 uppercase">
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-neutral dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-primary/20 font-sans transition-colors duration-300">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-primary via-secondary to-tertiary will-change-transform"
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-950/95 shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.a
            href="#home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold font-mono bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
          >
            KT.
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavItem href="#home" label={t.nav.home} />
            <NavItem href="#about" label={t.nav.about} />
            <NavItem href="#skills" label={t.nav.skills} />
            <NavItem href="#experience" label={t.nav.experience} />
            <NavItem href="#projects" label={t.nav.projects} />
            <NavItem href="#contact" label={t.nav.contact} />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: -15 }}
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors cursor-pointer"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors text-sm font-semibold cursor-pointer font-mono"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setDark((d) => !d)} aria-label="Toggle theme" className="cursor-pointer">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={toggleLang} className="text-sm font-bold cursor-pointer font-mono">
              {lang.toUpperCase()}
            </button>
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
              className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 md:hidden shadow-xl"
            >
              <NavItem href="#home" label={t.nav.home} />
              <NavItem href="#about" label={t.nav.about} />
              <NavItem href="#skills" label={t.nav.skills} />
              <NavItem href="#experience" label={t.nav.experience} />
              <NavItem href="#projects" label={t.nav.projects} />
              <NavItem href="#contact" label={t.nav.contact} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-24 container mx-auto px-6 overflow-hidden">
        {/* soft gradient glows (radial gradients — cheap to render, no blur filter) */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[560px] h-[560px] bg-[radial-gradient(circle_at_center,rgba(77,107,255,0.18),transparent_65%)]" />
        <div className="pointer-events-none absolute top-24 -right-24 w-[560px] h-[560px] bg-[radial-gradient(circle_at_center,rgba(255,77,148,0.15),transparent_65%)]" />

        <div className="relative max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-slate-500 dark:text-slate-400">
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-primary font-semibold mb-4 tracking-wide uppercase text-sm"
          >
            {t.hero.greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
              {t.hero.name}
            </span>
            <span className="block text-2xl md:text-4xl font-bold text-slate-400 dark:text-slate-500 mt-2">
              {t.hero.patronymic}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 font-medium"
          >
            {t.hero.role}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
            >
              <Download size={20} />
              {t.hero.downloadCV}
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold hover:border-primary transition-colors"
            >
              {t.hero.contactMe}
            </motion.a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
        >
          {t.stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.03 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
            >
              <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/60 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-bold mt-2 mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-gradient-to-r from-primary to-tertiary rounded-full"></span>
                {t.about.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {t.about.text}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.about.strengths.map((s, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm"
                  >
                    <h4 className="font-bold text-primary mb-1">{s.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Currently leveling up — bright gradient chips */}
              <div className="mt-8">
                <p className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  {t.about.focusTitle}
                </p>
                <div className="flex flex-wrap gap-3">
                  {t.about.focus.map((f, i) => {
                    const gradients = [
                      'from-primary to-secondary',
                      'from-secondary to-tertiary',
                      'from-tertiary to-primary',
                      'from-primary via-secondary to-tertiary',
                    ];
                    return (
                      <motion.span
                        key={f}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className={`px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${gradients[i % gradients.length]} shadow-md shadow-primary/20 cursor-default`}
                      >
                        {f}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-tr from-primary/20 via-secondary/20 to-tertiary/20 overflow-hidden shadow-2xl flex items-center justify-center">
                <img
                  src="/profile.jpg"
                  alt="Khumoyunmirzo Tokhirjonov"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hidden md:block">
                <p className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {t.about.educationLabel}
                </p>
                <p className="font-bold text-lg">{t.about.educationValue}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 container mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow>{t.skills.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-bold mt-2">{t.skills.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto">
          {t.skills.items.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{s.name}</span>
                <span className="font-mono text-sm text-slate-400">{s.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <div className="max-w-4xl mx-auto mt-14">
          <h3 className="text-center font-mono text-sm uppercase tracking-widest text-slate-400 mb-6">
            {t.skills.languagesTitle}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {t.skills.languages.map((l, i) => (
              <div
                key={i}
                className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-center"
              >
                <div className="font-bold">{l.name}</div>
                <div className="text-xs text-primary font-mono">{l.level}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white/60 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow>{t.experience.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-bold mt-2">{t.experience.title}</h2>
          </div>
          <div className="max-w-3xl mx-auto relative">
            {/* vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-tertiary md:-translate-x-1/2" />
            <div className="space-y-10">
              {t.experience.items.map((item, i) => {
                const Icon = i === 0 ? Briefcase : i === 2 ? BookOpen : i === 3 ? TrendingUp : GraduationCap;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative pl-12 md:w-1/2 ${
                      i % 2 === 0 ? 'md:pr-12 md:pl-0 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto'
                    }`}
                  >
                    {/* node */}
                    <span
                      className={`absolute top-1 left-2 md:left-auto flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary to-tertiary text-white ${
                        i % 2 === 0 ? 'md:-right-3' : 'md:-left-3'
                      }`}
                    >
                      <Icon size={13} />
                    </span>
                    <motion.div
                      onClick={() => setExpIndex(i)}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-[border-color,box-shadow]"
                    >
                      <span className="font-mono text-xs text-primary">{item.period}</span>
                      <h3 className="text-lg font-bold mt-1">{item.role}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.org}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                      <span className={`mt-3 inline-flex items-center gap-1 font-mono text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        {t.experience.labels.hint}
                        <ChevronRight size={14} className={i % 2 === 0 ? 'md:rotate-180' : ''} />
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 container mx-auto px-6">
        <div className="text-center mb-12">
          <Eyebrow>{t.projects.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-bold mt-2">{t.projects.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.projects.items.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/40 transition-colors hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-tertiary group-hover:text-white transition-colors">
                {i === 0 ? <TrendingUp size={24} /> : i === 1 ? <BookOpen size={24} /> : <Presentation size={24} />}
              </div>
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm leading-relaxed">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {p.tech}
                </span>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white/60 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-bold mt-2">{t.testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.testimonials.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm relative"
              >
                <Quote className="text-primary/30 mb-4" size={32} />
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                  “{item.quote}”
                </p>
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm text-slate-400 font-mono">{item.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 dark:bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-widest text-tertiary uppercase">
              {t.contact.eyebrow}
            </span>
            <h2 className="text-4xl font-bold mt-2">{t.contact.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
            {/* Contact info + socials */}
            <div className="space-y-6">
              <ContactRow icon={<MapPin size={22} />} label={t.contact.location} value={t.contact.locationValue} />

              {/* Yandex Map — mounts only when scrolled into view */}
              <LazyMap />

              <ContactRow
                icon={<Phone size={22} />}
                label={t.contact.phone}
                value={SOCIALS.phoneDisplay}
                href={`tel:${SOCIALS.phone}`}
              />
              <ContactRow
                icon={<Mail size={22} />}
                label={t.contact.email}
                value={SOCIALS.email}
                href={`mailto:${SOCIALS.email}`}
              />
              <ContactRow
                icon={<Send size={22} />}
                label={t.contact.telegram}
                value="@ixumoyunmirzo"
                href={SOCIALS.telegram}
              />

              <div className="flex gap-3 pt-2">
                <SocialIcon href={SOCIALS.linkedin} label="LinkedIn"><Linkedin size={18} /></SocialIcon>
                <SocialIcon href={SOCIALS.instagram} label="Instagram"><Instagram size={18} /></SocialIcon>
                <SocialIcon href={SOCIALS.github} label="GitHub"><Github size={18} /></SocialIcon>
                <SocialIcon href={SOCIALS.telegram} label="Telegram"><Send size={18} /></SocialIcon>
                <SocialIcon href={`mailto:${SOCIALS.email}`} label="Email"><Mail size={18} /></SocialIcon>
              </div>
            </div>

            {/* CTA — opens modal */}
            <div className="flex flex-col items-center justify-center gap-6 py-12 px-8 rounded-3xl border border-white/10 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center shadow-lg shadow-primary/30">
                <Send size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{t.contact.writeUs}</h3>
                <p className="text-slate-400 text-sm">Ответ в течение 24 часов</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFormOpen(true)}
                className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/30 cursor-pointer"
              >
                <Send size={18} />
                {t.contact.writeUs}
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setFormOpen(false)}
            />
            {/* panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="relative z-10 w-full max-w-lg bg-slate-900 rounded-3xl p-8 shadow-2xl shadow-black/50 border border-white/10"
            >
              <button
                onClick={() => setFormOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <h3 className="text-2xl font-bold text-white mb-6">{t.contact.writeUs}</h3>
              <ContactForm t={t.contact.form} onSuccess={() => setFormOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {expIndex !== null && (() => {
          const item = t.experience.items[expIndex];
          const labels = t.experience.labels;
          const Icon = expIndex === 0 ? Briefcase : expIndex === 2 ? BookOpen : expIndex === 3 ? TrendingUp : GraduationCap;
          const chipGradients = [
            'from-primary to-secondary',
            'from-secondary to-tertiary',
            'from-tertiary to-primary',
          ];
          return (
            <motion.div
              key="exp-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            >
              {/* backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setExpIndex(null)}
              />
              {/* panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 rounded-3xl shadow-2xl shadow-black/50 border border-white/10"
              >
                {/* header */}
                <div className="relative p-8 pb-6 bg-gradient-to-br from-primary/25 via-secondary/10 to-tertiary/25">
                  <button
                    onClick={() => setExpIndex(null)}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/30"
                  >
                    <Icon size={28} />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-mono text-xs text-tertiary"
                  >
                    {item.period}
                  </motion.span>
                  <motion.h3
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-2xl md:text-3xl font-extrabold text-white mt-1"
                  >
                    {item.role}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-300 font-medium"
                  >
                    {item.org}
                  </motion.p>
                </div>

                {/* body */}
                <div className="p-8 pt-6 space-y-7 text-slate-300">
                  {/* About */}
                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
                      {labels.about}
                    </h4>
                    <p className="leading-relaxed">{item.details.summary}</p>
                  </motion.section>

                  {/* Responsibilities */}
                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                      {labels.responsibilities}
                    </h4>
                    <ul className="space-y-2">
                      {item.details.responsibilities.map((r, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + j * 0.07 }}
                          className="flex items-start gap-2"
                        >
                          <ChevronRight size={16} className="text-primary shrink-0 mt-1" />
                          <span>{r}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.section>

                  {/* Achievements */}
                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                      {labels.achievements}
                    </h4>
                    <ul className="space-y-2">
                      {item.details.achievements.map((a, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.65 + j * 0.07 }}
                          className="flex items-start gap-2"
                        >
                          <span className="text-tertiary mt-0.5">✦</span>
                          <span>{a}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.section>

                  {/* Skills */}
                  <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                  >
                    <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                      {labels.skills}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.details.skills.map((s, j) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + j * 0.06, type: 'spring', stiffness: 300 }}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${chipGradients[j % chipGradients.length]}`}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </motion.section>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-100 dark:border-slate-800 bg-neutral dark:bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
          <p className="font-mono">
            © {new Date().getFullYear()} Khumoyunmirzo Tokhirjonov. {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Linkedin size={18} /></a>
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Instagram size={18} /></a>
            <a href={SOCIALS.telegram} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Send size={18} /></a>
            <a href={`mailto:${SOCIALS.email}`} className="hover:text-primary transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t.footer.backToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-tertiary text-white flex items-center justify-center shadow-lg shadow-primary/30 cursor-pointer"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- helper components ---------- */

function LazyMap() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href="https://yandex.com/maps/?ll=69.1967%2C41.2925&z=15&pt=69.1967%2C41.2925,pm2rdm"
      target="_blank"
      rel="noreferrer"
      className="block overflow-hidden rounded-2xl border border-white/10 hover:border-primary/60 transition-colors h-[160px] bg-white/5"
    >
      {visible && (
        <iframe
          src="https://yandex.com/map-widget/v1/?ll=69.1967%2C41.2925&z=15&pt=69.1967%2C41.2925,pm2rdm&theme=dark"
          width="100%"
          height="160"
          frameBorder="0"
          title="Location map"
          className="pointer-events-none block"
        />
      )}
    </a>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 shrink-0 bg-white/10 rounded-full flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className="font-medium break-all">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block hover:text-tertiary transition-colors">
      {inner}
    </a>
  ) : (
    inner
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.9 }}
      className="w-11 h-11 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-primary hover:to-tertiary flex items-center justify-center transition-colors"
    >
      {children}
    </motion.a>
  );
}

function ContactForm({
  t,
  onSuccess,
}: {
  t: {
    name: string;
    phone: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name    = String(data.get('name') ?? '');
    const phone   = String(data.get('phone') ?? '');
    const email   = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');

    // ── Send via serverless API → Telegram ─────────────────────────────
    setStatus('sending');
    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message }),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => { onSuccess?.(); }, 1800);
        return;
      }
    } catch {
      /* fall through to mailto fallback */
    }

    // ── Fallback: open email client (e.g. local dev without the API) ───
    setStatus('idle');
    window.location.href =
      `mailto:${SOCIALS.email}` +
      `?subject=${encodeURIComponent('Portfolio message from ' + name)}` +
      `&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nPhone: ${phone}\nEmail: ${email}`)}`;
  };

  const inputClass =
    'w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-colors placeholder:text-slate-500 text-white';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <input name="name"  required placeholder={t.name}  className={inputClass} />
      <input name="phone" required placeholder={t.phone} type="tel" className={inputClass} />
      <input name="email" required placeholder={t.email} type="email" className={inputClass} />
      <textarea
        name="message"
        required
        rows={4}
        placeholder={t.message}
        className={`${inputClass} resize-none`}
      />
      <motion.button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-shadow disabled:opacity-60 cursor-pointer"
      >
        <motion.span
          animate={status === 'sending' ? { rotate: 360 } : { rotate: 0 }}
          transition={status === 'sending' ? { repeat: Infinity, duration: 0.8, ease: 'linear' } : {}}
          className="flex"
        >
          <Send size={18} />
        </motion.span>
        {status === 'sending' ? t.sending : t.send}
      </motion.button>
      {status === 'success' && <p className="text-green-400 text-sm text-center">{t.success}</p>}
      {status === 'error'   && <p className="text-red-400   text-sm text-center">{t.error}</p>}
    </form>
  );
}
