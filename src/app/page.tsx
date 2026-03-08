'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const galleryImages = [
  { src: '/gallery/gallery7.jpeg',  alt: 'Asha Kumari — Odissi expression', w: 1280, h: 1600 },
  { src: '/gallery/gallery12.jpeg', alt: 'Asha Kumari — solo pose',          w: 1290, h: 1600 },
  { src: '/gallery/gallery13.jpeg', alt: 'Asha Kumari — stage performance',  w: 1142, h: 1600 },
  { src: '/gallery/gallery4.jpeg',  alt: 'Asha Kumari — dance closeup',      w: 1600, h: 1600 },
  { src: '/gallery/gallery6.jpeg',  alt: 'Spic Macay — outdoor workshop',    w: 1152, h: 560  },
  { src: '/gallery/gallery1.jpeg',  alt: 'Workshop with students',           w: 1600, h: 1200 },
  { src: '/gallery/gallery14.jpeg', alt: 'Asha Kumari — pink stage',         w: 904,  h: 1280 },
  { src: '/gallery/gallery15.jpeg', alt: 'Asha Kumari — stage solo',         w: 851,  h: 1280 },
  { src: '/gallery/gallery8.jpeg',  alt: 'Odissi group — outdoor',           w: 1000, h: 1500 },
  { src: '/gallery/gallery10.jpeg', alt: 'Odissi duo — studio',              w: 1000, h: 1500 },
  { src: '/gallery/gallery11.jpeg', alt: 'Stage performance — trio',         w: 1280, h: 960  },
  { src: '/gallery/gallery9.jpeg',  alt: 'Award ceremony',                   w: 1017, h: 1003 },
  { src: '/gallery/gallery5.jpeg',  alt: 'Kala Unnati students',             w: 1200, h: 1600 },
  { src: '/gallery/gallery16.jpeg', alt: 'Group — outdoor garden',           w: 960,  h: 1280 },
  { src: '/gallery/gallery3.jpeg',  alt: 'Colorful Odissi group',            w: 640,  h: 640  },
  { src: '/gallery/gallery2.jpeg',  alt: 'Workshop on stage',                w: 1600, h: 1066 },
];

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(() => setLightbox(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null), []);
  const nextImg = useCallback(() => setLightbox(i => i !== null ? (i + 1) % galleryImages.length : null), []);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    };
    window.addEventListener('keydown', handleKey);

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, [closeLightbox, prevImg, nextImg]);

  return (
    <>
      <style>{`
        /* ── NAV ── */
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 22px 60px; display: flex; align-items: center; justify-content: space-between; transition: background 0.5s, padding 0.4s; }
        nav.scrolled { background: rgba(246,241,232,0.96); backdrop-filter: blur(8px); padding: 14px 60px; border-bottom: 1px solid rgba(198,167,94,0.25); }
        .nav-logo { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 0.2em; color: var(--ivory); text-decoration: none; transition: color 0.4s; }
        nav.scrolled .nav-logo { color: var(--wine); }
        .nav-links { display: flex; gap: 40px; list-style: none; margin: 0; padding: 0; }
        .nav-links a { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.18em; color: rgba(246,241,232,0.85); text-decoration: none; text-transform: uppercase; transition: color 0.3s; }
        nav.scrolled .nav-links a { color: var(--charcoal-light); }
        .nav-links a:hover { color: var(--gold) !important; }

        /* ── HERO ── */
        #home { height: 100vh; min-height: 700px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: linear-gradient(160deg, #1a0a0e 0%, #3d1020 40%, #6E1E2E 100%); }
        .hero-pattern { position: absolute; inset: 0; opacity: 0.06; background-image: repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 8deg, rgba(198,167,94,1) 9deg, transparent 10deg), repeating-conic-gradient(from 45deg at 50% 50%, transparent 0deg, transparent 14deg, rgba(198,167,94,0.5) 15deg, transparent 16deg); background-size: 200px 200px, 300px 300px; }
        .hero-content { position: relative; z-index: 2; text-align: center; padding: 0 40px; max-width: 700px; opacity: 0; transform: translateY(30px); animation: fadeUp 1.2s ease forwards 0.3s; }
        .hero-kicker { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 24px; opacity: 0; animation: fadeUp 1s ease forwards 0.6s; }
        .hero-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 8vw, 96px); font-weight: 300; color: var(--ivory); line-height: 1.05; letter-spacing: 0.02em; margin-bottom: 8px; }
        .hero-name em { font-style: italic; color: var(--gold); }
        .hero-divider { width: 60px; height: 1px; background: var(--gold); margin: 28px auto; opacity: 0; animation: expandWidth 1s ease forwards 1s; }
        .hero-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(16px, 2.2vw, 22px); color: rgba(246,241,232,0.75); margin-bottom: 16px; font-weight: 300; opacity: 0; animation: fadeUp 1s ease forwards 1.1s; }
        .hero-subtitle { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.25em; color: rgba(198,167,94,0.7); text-transform: uppercase; margin-bottom: 48px; opacity: 0; animation: fadeUp 1s ease forwards 1.3s; }
        .hero-btn { display: inline-block; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); border: 1px solid var(--gold); padding: 14px 36px; text-decoration: none; transition: background 0.3s, color 0.3s; opacity: 0; animation: fadeUp 1s ease forwards 1.5s; }
        .hero-btn:hover { background: var(--gold); color: var(--wine-dark); }
        .hero-scroll-hint { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; animation: fadeUp 1s ease forwards 2s; }
        .scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollPulse 2s ease infinite; }
        @keyframes expandWidth { from { width: 0; opacity: 0; } to { width: 60px; opacity: 1; } }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

        /* ── SECTION COMMONS ── */
        .section-kicker { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.35em; color: var(--gold); text-transform: uppercase; text-align: center; margin-bottom: 20px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 5vw, 62px); font-weight: 300; color: var(--wine); text-align: center; line-height: 1.15; margin-bottom: 60px; }
        .gold-rule { width: 80px; height: 1px; background: var(--gold); margin: 0 auto 60px; }

        /* ── ABOUT ── */
        #about { background: var(--ivory); max-width: 1200px; margin: 0 auto; padding: 120px 60px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; max-width: 1100px; margin: 0 auto; }
        .about-img-wrap { position: relative; width: 100%; aspect-ratio: 1142/1600; overflow: hidden; border: 1px solid rgba(198,167,94,0.3); }
        .about-img-wrap img { object-fit: cover; object-position: top center; transition: transform 0.6s ease; }
        .about-img-wrap:hover img { transform: scale(1.03); }
        .about-intro { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px, 2.5vw, 26px); font-style: italic; color: var(--wine); line-height: 1.5; margin-bottom: 30px; font-weight: 300; }
        .about-body { font-size: 15.5px; color: var(--charcoal-light); line-height: 1.95; margin-bottom: 24px; }
        .achievements-block { margin-top: 60px; padding-top: 60px; border-top: 1px solid rgba(198,167,94,0.3); max-width: 1100px; margin-left: auto; margin-right: auto; }
        .achievements-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: var(--wine); margin-bottom: 40px; text-align: center; }
        .achievements-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .achievement-item { padding: 28px 24px; background: var(--sand); border-left: 3px solid var(--gold); transition: background 0.3s; }
        .achievement-item:hover { background: #cfc0a8; }
        .ach-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-style: italic; color: var(--wine); margin-bottom: 4px; font-weight: 500; }
        .ach-body { font-family: 'Lora', serif; font-size: 13px; color: var(--charcoal-light); line-height: 1.5; }

        /* ── GALLERY ── */
        #gallery { background: var(--sand); padding: 120px 60px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; max-width: 1100px; margin: 0 auto; }
        .gallery-cell { position: relative; overflow: hidden; cursor: pointer; background: #1a0a0e; }
        .cell-inner { position: relative; width: 100%; overflow: hidden; }
        .cell-inner img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: transform 0.5s ease; display: block; }
        .gallery-cell:hover .cell-inner img { transform: scale(1.04); }
        .hover-overlay { position: absolute; inset: 0; background: rgba(110,30,46,0); transition: background 0.4s; display: flex; align-items: center; justify-content: center; z-index: 2; }
        .gallery-cell:hover .hover-overlay { background: rgba(110,30,46,0.28); }
        .hover-overlay svg { opacity: 0; transition: opacity 0.3s; }
        .gallery-cell:hover .hover-overlay svg { opacity: 1; }
        .span2 { grid-column: span 2; }

        /* ── LIGHTBOX ── */
        .lightbox-backdrop { position: fixed; inset: 0; z-index: 1000; background: rgba(10,3,5,0.96); display: flex; align-items: center; justify-content: center; animation: lbFadeIn 0.25s ease; }
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-img-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
        .lightbox-img-wrap img { max-width: 90vw; max-height: 90vh; object-fit: contain; display: block; }
        .lb-close { position: fixed; top: 24px; right: 32px; font-size: 22px; color: rgba(246,241,232,0.7); cursor: pointer; background: none; border: none; z-index: 1001; transition: color 0.2s; line-height: 1; font-family: serif; }
        .lb-close:hover { color: var(--gold); }
        .lb-arrow { position: fixed; top: 50%; transform: translateY(-50%); background: none; border: 1px solid rgba(198,167,94,0.3); color: rgba(246,241,232,0.7); font-size: 26px; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s, color 0.2s; z-index: 1001; }
        .lb-arrow:hover { border-color: var(--gold); color: var(--gold); }
        .lb-prev { left: 20px; }
        .lb-next { right: 20px; }
        .lb-counter { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.25em; color: rgba(198,167,94,0.6); }

        /* ── KALA UNNATI ── */
        #kala-unnati { background: var(--ivory); padding: 120px 60px; position: relative; overflow: hidden; }
        .ku-watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: 'Cinzel', serif; font-size: 200px; font-weight: 600; color: var(--wine); opacity: 0.025; white-space: nowrap; pointer-events: none; user-select: none; text-align: center; line-height: 1.1; }
        .ku-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
        .ku-body { font-size: 16px; color: var(--charcoal-light); line-height: 1.95; max-width: 700px; margin: 0 auto 80px; text-align: center; }
        .ku-columns { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 60px; margin-bottom: 80px; align-items: start; }
        .ku-divider-v { background: var(--gold); opacity: 0.5; align-self: stretch; }
        .ku-col-title { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.25em; color: var(--gold); text-transform: uppercase; margin-bottom: 20px; }
        .ku-col-text { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; font-weight: 300; color: var(--charcoal); line-height: 1.6; }
        .mission-title { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.25em; color: var(--gold); text-transform: uppercase; text-align: center; margin-bottom: 32px; }
        .mission-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 80px; padding: 0; }
        .mission-list li { padding: 16px 24px; border-bottom: 1px solid rgba(198,167,94,0.2); border-right: 1px solid rgba(198,167,94,0.2); font-size: 15px; color: var(--charcoal-light); line-height: 1.6; display: flex; gap: 14px; align-items: flex-start; }
        .mission-list li:nth-child(even) { border-right: none; }
        .mission-list li::before { content: '—'; color: var(--gold); flex-shrink: 0; margin-top: 2px; }
        .ku-principle { text-align: center; padding: 60px 0 0; }
        .ku-principle-quote { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px, 3vw, 30px); font-style: italic; font-weight: 300; color: var(--wine); line-height: 1.5; margin-bottom: 16px; }
        .ku-principle-sub { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.3em; color: var(--gold); text-transform: uppercase; }

        /* ── CONTACT ── */
        #contact { background: var(--sand); padding: 120px 60px; }
        .contact-inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin: 60px 0; }
        .contact-item { padding: 36px 40px; background: rgba(246,241,232,0.6); text-align: left; transition: background 0.3s; }
        .contact-item:hover { background: rgba(246,241,232,0.9); }
        .contact-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.3em; color: var(--gold); text-transform: uppercase; margin-bottom: 10px; }
        .contact-value { font-family: 'Cormorant Garamond', serif; font-size: 19px; color: var(--wine); font-weight: 400; text-decoration: none; display: block; transition: color 0.3s; }
        .contact-value:hover { color: var(--charcoal); }
        .social-row { display: flex; justify-content: center; gap: 40px; margin-top: 60px; padding-top: 50px; border-top: 1px solid rgba(198,167,94,0.4); }
        .social-link { display: flex; flex-direction: column; align-items: center; gap: 10px; text-decoration: none; transition: opacity 0.3s; }
        .social-link:hover { opacity: 0.7; }
        .social-icon { width: 44px; height: 44px; border: 1px solid var(--gold); display: flex; align-items: center; justify-content: center; }
        .social-name { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.25em; color: var(--charcoal-light); text-transform: uppercase; }

        /* ── FOOTER ── */
        footer { background: var(--wine-dark); padding: 40px 60px; display: flex; align-items: center; justify-content: space-between; }
        .footer-name { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.2em; color: rgba(246,241,232,0.6); }
        .footer-copy { font-family: 'Lora', serif; font-size: 12px; color: rgba(246,241,232,0.35); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.2em; color: rgba(198,167,94,0.6); text-decoration: none; text-transform: uppercase; transition: color 0.3s; }
        .footer-links a:hover { color: var(--gold); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          nav { padding: 18px 28px; } nav.scrolled { padding: 12px 28px; } .nav-links { gap: 20px; }
          #about, #gallery, #kala-unnati, #contact { padding: 80px 28px; }
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .achievements-grid { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr 1fr; gap: 4px; }
          .ku-columns { grid-template-columns: 1fr; } .ku-divider-v { display: none; }
          .mission-list { grid-template-columns: 1fr; } .mission-list li { border-right: none; }
          .contact-grid { grid-template-columns: 1fr; }
          .social-row { flex-wrap: wrap; gap: 24px; }
          footer { flex-direction: column; gap: 16px; text-align: center; }
          .lb-prev { left: 8px; } .lb-next { right: 8px; }
        }
      `}</style>

      {/* NAV */}
      <nav ref={navRef}>
        <a href="#home" className="nav-logo">Y. Asha Kumari</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#kala-unnati">Kala Unnati</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="home">
        <div className="hero-bg"></div>
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <p className="hero-kicker">Odissi Artist &nbsp;·&nbsp; Choreographer &nbsp;·&nbsp; Teacher</p>
          <h1 className="hero-name">Y. <em>Asha</em><br />Kumari</h1>
          <div className="hero-divider"></div>
          <p className="hero-tagline">&ldquo;Where tradition becomes timeless expression.&rdquo;</p>
          <p className="hero-subtitle">Founder &amp; Director, Kala Unnati Dance Foundation</p>
          <a href="#kala-unnati" className="hero-btn">Discover Kala Unnati</a>
        </div>
        <div className="hero-scroll-hint"><div className="scroll-line"></div></div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <p className="section-kicker reveal">The Artist</p>
        <h2 className="section-title reveal reveal-delay-1">Y. Asha Kumari</h2>
        <div className="gold-rule reveal reveal-delay-2"></div>
        <div className="about-grid">
          <div className="reveal">
            <div className="about-img-wrap">
              <Image src="/gallery/main.jpeg" alt="Y. Asha Kumari — Odissi Artist" fill sizes="(max-width:900px) 100vw, 50vw" priority />
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            <p className="about-intro">A lifelong devotion to Odissi — one of India&apos;s most ancient classical dance forms.</p>
            <p className="about-body">Y. Asha Kumari began her journey at the tender age of 7, under the tutelage of Guru Shri Manoranjan Pradhan. She deepened her craft at the prestigious <strong>Orissa Dance Academy, Bhubaneswar</strong>, under Guru Shri Bichitrananda Swain, &amp; Padmashree Guru Aruna Mohanty, and under the watchful eye of Odissi doyen, the late Padmashree Guru Shri Gangadhar Pradhan.</p>
            <p className="about-body">She holds a <strong>Master&apos;s Degree in Odissi Dance</strong> from Pracheen Kala Kendra, Chandigarh — a testament to her commitment to both technical rigour and spiritual depth.</p>
            <p className="about-body">Her artistry has graced India&apos;s most revered stages — the <strong>Khajuraho Dance Festival, Mukteshwar Dance Festival, Konark Festival, Puri Beach Festival, Rashtriya Sanskrit Mahotsav, IIDF Delhi, International Odissi Dance Festival,</strong> and <strong>G20</strong> cultural celebrations. Internationally, she has represented India in <strong>Vietnam, Switzerland, Mauritius, Russia, North Korea, Sri Lanka, UK, Germany, Italy, Madagascar, Mexico, USA, Canada, Réunion,</strong> and <strong>Dubai</strong>, among others.</p>
            <p className="about-body">Today, Asha carries this living tradition forward — teaching students across India, conducting workshops for young rural children under <strong>Spic Macay</strong>, and serving as the Founder &amp; Director of Kala Unnati Dance Foundation.</p>
          </div>
        </div>
        <div className="achievements-block reveal">
          <h3 className="achievements-title">Honours &amp; Recognition</h3>
          <div className="achievements-grid">
            {[
              { title: "'Singarmani'", body: "Sur Singar Samsad, Mumbai" },
              { title: "'Nritya Sadhana' Award", body: "Gurgaon" },
              { title: "'Surabhi Sanmaan'", body: "2022" },
              { title: "Shashimani Devdasi Sanman", body: "2024 & 2025" },
              { title: "National Scholarship", body: "Ministry of Culture, Government of India" },
              { title: "Graded Artist", body: "Prasar Bharati Doordarshan Kendra" },
            ].map((a, i) => (
              <div className="achievement-item" key={i}>
                <div className="ach-title">{a.title}</div>
                <div className="ach-body">{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <p className="section-kicker reveal">Moments</p>
        <h2 className="section-title reveal reveal-delay-1">Gallery</h2>
        <div className="gold-rule reveal reveal-delay-2"></div>

        <div className="gallery-grid reveal">

          {/* ROW 1 — four portraits / square, each preserving their own ratio */}
          <div className="gallery-cell" onClick={() => openLightbox(0)}>
            <div className="cell-inner" style={{paddingBottom:'125%'}}>
              <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(1)}>
            <div className="cell-inner" style={{paddingBottom:'124%'}}>
              <Image src={galleryImages[1].src} alt={galleryImages[1].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(2)}>
            <div className="cell-inner" style={{paddingBottom:'140%'}}>
              <Image src={galleryImages[2].src} alt={galleryImages[2].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(3)}>
            <div className="cell-inner" style={{paddingBottom:'100%'}}>
              <Image src={galleryImages[3].src} alt={galleryImages[3].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>

          {/* ROW 2 — two wide landscapes spanning 2 cols each */}
          <div className="gallery-cell span2" onClick={() => openLightbox(4)}>
            <div className="cell-inner" style={{paddingBottom:'48.6%'}}>
              <Image src={galleryImages[4].src} alt={galleryImages[4].alt} fill sizes="50vw" style={{objectPosition:'center'}} />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell span2" onClick={() => openLightbox(5)}>
            <div className="cell-inner" style={{paddingBottom:'75%'}}>
              <Image src={galleryImages[5].src} alt={galleryImages[5].alt} fill sizes="50vw" style={{objectPosition:'center'}} />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>

          {/* ROW 3 — four portraits */}
          <div className="gallery-cell" onClick={() => openLightbox(6)}>
            <div className="cell-inner" style={{paddingBottom:'142%'}}>
              <Image src={galleryImages[6].src} alt={galleryImages[6].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(7)}>
            <div className="cell-inner" style={{paddingBottom:'150%'}}>
              <Image src={galleryImages[7].src} alt={galleryImages[7].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(8)}>
            <div className="cell-inner" style={{paddingBottom:'150%'}}>
              <Image src={galleryImages[8].src} alt={galleryImages[8].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(9)}>
            <div className="cell-inner" style={{paddingBottom:'150%'}}>
              <Image src={galleryImages[9].src} alt={galleryImages[9].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>

          {/* ROW 4 — wide landscape + square + portrait */}
          <div className="gallery-cell span2" onClick={() => openLightbox(10)}>
            <div className="cell-inner" style={{paddingBottom:'75%'}}>
              <Image src={galleryImages[10].src} alt={galleryImages[10].alt} fill sizes="50vw" style={{objectPosition:'center'}} />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(11)}>
            <div className="cell-inner" style={{paddingBottom:'98.6%'}}>
              <Image src={galleryImages[11].src} alt={galleryImages[11].alt} fill sizes="25vw" style={{objectPosition:'center'}} />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(12)}>
            <div className="cell-inner" style={{paddingBottom:'133%'}}>
              <Image src={galleryImages[12].src} alt={galleryImages[12].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>

          {/* ROW 5 — portrait + square + wide landscape */}
          <div className="gallery-cell" onClick={() => openLightbox(13)}>
            <div className="cell-inner" style={{paddingBottom:'133%'}}>
              <Image src={galleryImages[13].src} alt={galleryImages[13].alt} fill sizes="25vw" />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell" onClick={() => openLightbox(14)}>
            <div className="cell-inner" style={{paddingBottom:'100%'}}>
              <Image src={galleryImages[14].src} alt={galleryImages[14].alt} fill sizes="25vw" style={{objectPosition:'center'}} />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>
          <div className="gallery-cell span2" onClick={() => openLightbox(15)}>
            <div className="cell-inner" style={{paddingBottom:'66.6%'}}>
              <Image src={galleryImages[15].src} alt={galleryImages[15].alt} fill sizes="50vw" style={{objectPosition:'center'}} />
              <div className="hover-overlay"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(246,241,232,0.9)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg></div>
            </div>
          </div>

        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <button className="lb-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button className="lb-arrow lb-prev" onClick={(e) => { e.stopPropagation(); prevImg(); }} aria-label="Previous">‹</button>
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              width={galleryImages[lightbox].w}
              height={galleryImages[lightbox].h}
              style={{ maxWidth:'90vw', maxHeight:'90vh', width:'auto', height:'auto', objectFit:'contain' }}
              priority
            />
          </div>
          <button className="lb-arrow lb-next" onClick={(e) => { e.stopPropagation(); nextImg(); }} aria-label="Next">›</button>
          <div className="lb-counter">{lightbox + 1} / {galleryImages.length}</div>
        </div>
      )}

      {/* KALA UNNATI */}
      <section id="kala-unnati">
        <div className="ku-watermark"><span>Kala</span><br /><span>उन्नति</span></div>
        <p className="section-kicker reveal">The Institution</p>
        <h2 className="section-title reveal reveal-delay-1">
          Kala Unnati<br />
          <span style={{ fontSize:'0.55em', letterSpacing:'0.08em', fontStyle:'italic', color:'var(--charcoal-light)' }}>Dance Foundation</span>
        </h2>
        <div className="gold-rule reveal reveal-delay-2"></div>
        <div className="ku-inner">
          <p className="ku-body reveal">
            <strong>Kala Unnati Dance Foundation</strong> is an institution dedicated to the promotion, preservation, and advancement of Odissi dance, music, and Indian performing arts. It serves as a cultural platform nurturing talent, discipline, creativity, and spiritual expression through the art of movement.
          </p>
          <div className="ku-columns reveal">
            <div>
              <div className="ku-col-title">Our Vision</div>
              <p className="ku-col-text">To uphold the rich heritage of Odissi while shaping future generations of artists who carry forward the legacy of Indian classical arts with grace and authenticity.</p>
            </div>
            <div className="ku-divider-v"></div>
            <div>
              <div className="ku-col-title">Our Principle</div>
              <p className="ku-col-text">Art is not just performance — it is discipline, devotion, and a path toward cultural enrichment. <em>Kala Unnati</em> means Artistic Progress &amp; Advancement.</p>
            </div>
          </div>
          <div className="reveal">
            <div className="mission-title">What We Do</div>
            <ul className="mission-list">
              {[
                "Dedicated to preserving and promoting the classical dance tradition of Odissi.",
                "Nurturing young talents with disciplined training, creativity, and cultural values.",
                "Encouraging students to grow as confident and expressive performers.",
                "Conducting workshops, masterclasses, and lecture demonstrations.",
                "Creating opportunities for students to learn from renowned gurus and artists.",
                "Committed to building the next generation of dedicated classical dancers.",
              ].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="ku-principle reveal">
          <p className="ku-principle-quote">&ldquo;Preserving Tradition. Inspiring Excellence. Advancing Art.&rdquo;</p>
          <span className="ku-principle-sub">Kala Unnati Dance Foundation</span>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <p className="section-kicker reveal">Get In Touch</p>
        <h2 className="section-title reveal reveal-delay-1">Connect</h2>
        <div className="gold-rule reveal reveal-delay-2"></div>
        <div className="contact-inner">
          <div className="contact-grid reveal">
            <div className="contact-item">
              <div className="contact-label">Email</div>
              <a href="mailto:yashakumari1604@gmail.com" className="contact-value">yashakumari1604@gmail.com</a>
            </div>
            <div className="contact-item">
              <div className="contact-label">Phone</div>
              <a href="tel:+919777841320" className="contact-value">+91 97778 41320</a>
            </div>
            <div className="contact-item">
              <div className="contact-label">Based In</div>
              <span className="contact-value" style={{cursor:'default'}}>Bhubaneswar, Odisha</span>
            </div>
            <div className="contact-item">
              <div className="contact-label">Institution</div>
              <span className="contact-value" style={{cursor:'default', fontSize:16}}>Kala Unnati Dance Foundation</span>
            </div>
          </div>
          <div className="social-row reveal">
            <a href="https://www.instagram.com/ashakumariyerra" target="_blank" rel="noreferrer" className="social-link">
              <div className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="var(--wine)"/></svg>
              </div>
              <span className="social-name">@ashakumariyerra</span>
            </a>
            <a href="https://www.youtube.com/@ashakumariyeera9826" target="_blank" rel="noreferrer" className="social-link">
              <div className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--wine)" stroke="none"/>
                </svg>
              </div>
              <span className="social-name">YouTube</span>
            </a>
            <a href="https://www.instagram.com/kalaunnati_odissi/" target="_blank" rel="noreferrer" className="social-link">
              <div className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="var(--wine)"/></svg>
              </div>
              <span className="social-name">@kalaunnati_odissi</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-name">Y. Asha Kumari</span>
        <span className="footer-copy">© 2025 Kala Unnati Dance Foundation. All rights reserved.</span>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#kala-unnati">Kala Unnati</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </>
  );
}
