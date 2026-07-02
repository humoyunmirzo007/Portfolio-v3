/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
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
} from 'lucide-react';
import { translations } from './translations';

type Language = 'en' | 'ru';

/* ------------------------------------------------------------------ */
/*  EDIT ME: your links & contact-form endpoint                        */
/* ------------------------------------------------------------------ */
const SOCIALS = {
  telegram: 'https://t.me/iXumoyunmirzo',
  email: 'ikhumoyunmirzo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/your-handle', // TODO: replace
  instagram: 'https://instagram.com/your-handle', // TODO: replace
  github: 'https://github.com/humoyunmirzo007', // TODO: replace or remove
};

// Create a form at https://formspree.io (free) and paste your endpoint here.
// Until then the form falls back to opening the visitor's email client.
const FORMSPREE_ENDPOINT = ''; // e.g. 'https://formspree.io/f/xxxxxxx'
/* ------------------------------------------------------------------ */

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [dark, setDark] = useState(false);

  const t = translations[lang];

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'ru' : 'en'));

  const NavItem = ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
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
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-primary via-secondary to-tertiary"
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm py-4'
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
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary transition-all cursor-pointer"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary transition-all text-sm font-semibold cursor-pointer font-mono"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>
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
        {/* soft gradient glows */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-0 w-96 h-96 bg-tertiary/20 rounded-full blur-3xl" />

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
            <a
              href="/resume.pdf"
              download
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            >
              <Download size={20} />
              {t.hero.downloadCV}
            </a>
            <a
              href="#contact"
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold hover:border-primary transition-all"
            >
              {t.hero.contactMe}
            </a>
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
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800 backdrop-blur"
            >
              <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono uppercase tracking-wider">
                {s.label}
              </div>
            </div>
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
                const Icon = i === 1 ? BookOpen : i === 2 ? Briefcase : GraduationCap;
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
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                      <span className="font-mono text-xs text-primary">{item.period}</span>
                      <h3 className="text-lg font-bold mt-1">{item.role}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.org}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
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
              className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/10"
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

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact info + socials */}
            <div className="space-y-8">
              <ContactRow icon={<MapPin size={22} />} label={t.contact.location} value={t.contact.locationValue} />
              <ContactRow
                icon={<Mail size={22} />}
                label={t.contact.email}
                value={SOCIALS.email}
                href={`mailto:${SOCIALS.email}`}
              />
              <ContactRow
                icon={<Send size={22} />}
                label={t.contact.telegram}
                value={'@' + SOCIALS.telegram.split('/').pop()}
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

            {/* Contact form */}
            <ContactForm t={t.contact.form} />
          </div>
        </div>
      </section>

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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t.footer.backToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-tertiary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform cursor-pointer"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- helper components ---------- */

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
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-primary hover:to-tertiary flex items-center justify-center transition-all"
    >
      {children}
    </a>
  );
}

function ContactForm({
  t,
}: {
  t: {
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No Formspree endpoint configured → fall back to email client
    if (!FORMSPREE_ENDPOINT) {
      const name = data.get('name');
      const email = data.get('email');
      const message = data.get('message');
      window.location.href = `mailto:${SOCIALS.email}?subject=${encodeURIComponent(
        'Portfolio message from ' + name,
      )}&body=${encodeURIComponent(String(message) + '\n\nFrom: ' + name + ' (' + email + ')')}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        required
        placeholder={t.name}
        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-colors placeholder:text-slate-500"
      />
      <input
        name="email"
        type="email"
        required
        placeholder={t.email}
        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-colors placeholder:text-slate-500"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t.message}
        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-colors placeholder:text-slate-500 resize-none"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/25 disabled:opacity-60 cursor-pointer"
      >
        <Send size={18} />
        {status === 'sending' ? t.sending : t.send}
      </button>
      {status === 'success' && <p className="text-green-400 text-sm text-center">{t.success}</p>}
      {status === 'error' && <p className="text-red-400 text-sm text-center">{t.error}</p>}
    </form>
  );
}
