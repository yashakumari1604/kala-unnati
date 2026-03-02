'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Nav scroll
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 22px 60px; display: flex; align-items: center; justify-content: space-between; transition: background 0.5s, padding 0.4s; }
        nav.scrolled { background: rgba(246,241,232,0.96); backdrop-filter: blur(8px); padding: 14px 60px; border-bottom: 1px solid rgba(198,167,94,0.25); }
        .nav-logo { font-family: 'Cinzel', serif; font-size: 13px; letter-spacing: 0.2em; color: var(--ivory); text-decoration: none; transition: color 0.4s; }
        nav.scrolled .nav-logo { color: var(--wine); }
        .nav-links { display: flex; gap: 40px; list-style: none; }
        .nav-links a { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.18em; color: rgba(246,241,232,0.85); text-decoration: none; text-transform: uppercase; transition: color 0.3s; }
        nav.scrolled .nav-links a { color: var(--charcoal-light); }
        .nav-links a:hover { color: var(--gold) !important; }

        #home { height: 100vh; min-height: 700px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: linear-gradient(160deg, #1a0a0e 0%, #3d1020 40%, #6E1E2E 100%); }
        .hero-pattern { position: absolute; inset: 0; opacity: 0.06; background-image: repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 8deg, rgba(198,167,94,1) 9deg, transparent 10deg), repeating-conic-gradient(from 45deg at 50% 50%, transparent 0deg, transparent 14deg, rgba(198,167,94,0.5) 15deg, transparent 16deg); background-size: 200px 200px, 300px 300px; }
        .hero-image-placeholder { position: absolute; right: 8%; bottom: 0; width: 38vw; max-width: 500px; height: 85vh; border-left: 1px solid rgba(198,167,94,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.5; }
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

        .section-kicker { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.35em; color: var(--gold); text-transform: uppercase; text-align: center; margin-bottom: 20px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 5vw, 62px); font-weight: 300; color: var(--wine); text-align: center; line-height: 1.15; margin-bottom: 60px; }
        .gold-rule { width: 80px; height: 1px; background: var(--gold); margin: 0 auto 60px; }

        #about { background: var(--ivory); max-width: 1200px; margin: 0 auto; padding: 120px 60px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; max-width: 1100px; margin: 0 auto; }
        .about-placeholder { width: 100%; aspect-ratio: 3/4; background: var(--sand); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; border: 1px solid rgba(198,167,94,0.3); position: relative; overflow: hidden; }
        .about-placeholder::before { content: ''; position: absolute; inset: 12px; border: 1px solid rgba(198,167,94,0.2); }
        .ph-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.3em; color: rgba(110,30,46,0.4); text-transform: uppercase; }
        .about-intro { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px, 2.5vw, 26px); font-style: italic; color: var(--wine); line-height: 1.5; margin-bottom: 30px; font-weight: 300; }
        .about-body { font-size: 15.5px; color: var(--charcoal-light); line-height: 1.95; margin-bottom: 24px; }
        .achievements-block { margin-top: 60px; padding-top: 60px; border-top: 1px solid rgba(198,167,94,0.3); max-width: 1100px; margin-left: auto; margin-right: auto; }
        .achievements-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: var(--wine); margin-bottom: 40px; text-align: center; }
        .achievements-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .achievement-item { padding: 28px 24px; background: var(--sand); border-left: 3px solid var(--gold); transition: background 0.3s; }
        .achievement-item:hover { background: #cfc0a8; }
        .ach-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-style: italic; color: var(--wine); margin-bottom: 4px; font-weight: 500; }
        .ach-body { font-family: 'Lora', serif; font-size: 13px; color: var(--charcoal-light); line-height: 1.5; }

        #gallery { background: var(--sand); padding: 120px 60px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: 280px 280px; gap: 4px; max-width: 1100px; margin: 0 auto; }
        .gallery-cell { background: #c4b4a0; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; cursor: pointer; transition: opacity 0.3s; }
        .gallery-cell:hover { opacity: 0.85; }
        .gallery-cell:nth-child(1) { grid-column: 1 / 3; grid-row: 1; }
        .gallery-cell:nth-child(2) { grid-column: 3; grid-row: 1; }
        .gallery-cell:nth-child(3) { grid-column: 4; grid-row: 1; }
        .gallery-cell:nth-child(4) { grid-column: 1; grid-row: 2; }
        .gallery-cell:nth-child(5) { grid-column: 2; grid-row: 2; }
        .gallery-cell:nth-child(6) { grid-column: 3 / 5; grid-row: 2; }
        .gallery-ph { display: flex; flex-direction: column; align-items: center; gap: 10px; opacity: 0.5; }
        .gallery-ph span { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.3em; color: var(--wine); text-transform: uppercase; }

        #kala-unnati { background: var(--ivory); padding: 120px 60px; position: relative; overflow: hidden; }
        .ku-watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: 'Cinzel', serif; font-size: 200px; font-weight: 600; color: var(--wine); opacity: 0.025; white-space: nowrap; pointer-events: none; user-select: none; }
        .ku-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
        .ku-body { font-size: 16px; color: var(--charcoal-light); line-height: 1.95; max-width: 700px; margin: 0 auto; text-align: center; margin-bottom: 80px; }
        .ku-columns { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 60px; margin-bottom: 80px; align-items: start; }
        .ku-divider-v { background: var(--gold); opacity: 0.5; align-self: stretch; }
        .ku-col-title { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.25em; color: var(--gold); text-transform: uppercase; margin-bottom: 20px; }
        .ku-col-text { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; font-weight: 300; color: var(--charcoal); line-height: 1.6; }
        .mission-title { font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.25em; color: var(--gold); text-transform: uppercase; text-align: center; margin-bottom: 32px; }
        .mission-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin-bottom: 80px; }
        .mission-list li { padding: 16px 24px; border-bottom: 1px solid rgba(198,167,94,0.2); border-right: 1px solid rgba(198,167,94,0.2); font-size: 15px; color: var(--charcoal-light); line-height: 1.6; display: flex; gap: 14px; align-items: flex-start; }
        .mission-list li:nth-child(even) { border-right: none; }
        .mission-list li::before { content: '—'; color: var(--gold); flex-shrink: 0; margin-top: 2px; }
        .milestone-strip { background: var(--wine); margin: 0 -60px; padding: 50px 60px; display: flex; align-items: center; justify-content: center; gap: 60px; }
        .milestone-date { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 8px; }
        .milestone-label { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.25em; color: rgba(246,241,232,0.6); text-transform: uppercase; }
        .milestone-sep { width: 1px; height: 50px; background: rgba(198,167,94,0.3); }
        .ku-principle { text-align: center; padding: 60px 0 0; }
        .ku-principle-quote { font-family: 'Cormorant Garamond', serif; font-size: clamp(20px, 3vw, 30px); font-style: italic; font-weight: 300; color: var(--wine); line-height: 1.5; margin-bottom: 16px; }
        .ku-principle-sub { font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.3em; color: var(--gold); text-transform: uppercase; }

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

        footer { background: var(--wine-dark); padding: 40px 60px; display: flex; align-items: center; justify-content: space-between; }
        .footer-name { font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.2em; color: rgba(246,241,232,0.6); }
        .footer-copy { font-family: 'Lora', serif; font-size: 12px; color: rgba(246,241,232,0.35); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-family: 'Cinzel', serif; font-size: 8px; letter-spacing: 0.2em; color: rgba(198,167,94,0.6); text-decoration: none; text-transform: uppercase; transition: color 0.3s; }
        .footer-links a:hover { color: var(--gold); }

        @media (max-width: 900px) {
          nav { padding: 18px 28px; }
          nav.scrolled { padding: 12px 28px; }
          #about, #gallery, #kala-unnati, #contact { padding: 80px 28px; }
          .about-grid { grid-template-columns: 1fr; gap: 48px; }
          .about-placeholder { aspect-ratio: 4/3; }
          .achievements-grid { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: repeat(4, 220px); }
          .gallery-cell:nth-child(1) { grid-column: 1 / 3; grid-row: 1; }
          .gallery-cell:nth-child(2) { grid-column: 1; grid-row: 2; }
          .gallery-cell:nth-child(3) { grid-column: 2; grid-row: 2; }
          .gallery-cell:nth-child(4) { grid-column: 1; grid-row: 3; }
          .gallery-cell:nth-child(5) { grid-column: 2; grid-row: 3; }
          .gallery-cell:nth-child(6) { grid-column: 1 / 3; grid-row: 4; }
          .ku-columns { grid-template-columns: 1fr; }
          .ku-divider-v { display: none; }
          .mission-list { grid-template-columns: 1fr; }
          .mission-list li { border-right: none; }
          .milestone-strip { flex-direction: column; gap: 30px; margin: 0 -28px; padding: 40px 28px; }
          .milestone-sep { width: 40px; height: 1px; }
          .contact-grid { grid-template-columns: 1fr; }
          .social-row { flex-wrap: wrap; gap: 24px; }
          footer { flex-direction: column; gap: 16px; text-align: center; }
          .nav-links { gap: 20px; }
          .hero-image-placeholder { display: none; }
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
        <div className="hero-image-placeholder">
          <div style={{ width: 60, height: 60, border: '1px solid rgba(198,167,94,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(198,167,94,0.5)" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(198,167,94,0.6)', textTransform: 'uppercase' }}>Performance Portrait</span>
        </div>
        <div className="hero-content">
          <p className="hero-kicker">Odissi Artist &nbsp;·&nbsp; Choreographer &nbsp;·&nbsp; Teacher</p>
          <h1 className="hero-name">Y. <em>Asha</em><br />Kumari</h1>
          <div className="hero-divider"></div>
          <p className="hero-tagline">&ldquo;Where tradition becomes timeless expression.&rdquo;</p>
          <p className="hero-subtitle">Founder &amp; Director, Kala Unnati Dance Foundation</p>
          <a href="#kala-unnati" className="hero-btn">Discover Kala Unnati</a>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <p className="section-kicker reveal">The Artist</p>
        <h2 className="section-title reveal reveal-delay-1">Y. Asha Kumari</h2>
        <div className="gold-rule reveal reveal-delay-2"></div>
        <div className="about-grid">
          <div className="reveal">
            <div className="about-placeholder">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(110,30,46,0.3)" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
              </svg>
              <span className="ph-label">Photograph — Coming Soon</span>
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            <p className="about-intro">A lifelong devotion to Odissi — one of India&apos;s most ancient classical dance forms.</p>
            <p className="about-body">Y. Asha Kumari began her journey at the tender age of 7, under the tutelage of Guru Shri Manoranjan Pradhan. She deepened her craft at the prestigious <strong>Orissa Dance Academy, Bhubaneswar</strong>, under Guru Shri Bichitrananda Swain, guided by the watchful eye of Odissi doyen, the late Padmashree Guru Shri Gangadhar Pradhan.</p>
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
          {['Performance', 'Stage', 'Portrait', 'Workshop', 'Festival', 'International Tour'].map((label, i) => (
            <div className="gallery-cell" key={i}>
              <div className="gallery-ph">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(110,30,46,0.5)" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                </svg>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KALA UNNATI */}
      <section id="kala-unnati">
        <div className="ku-watermark">कला</div>
        <p className="section-kicker reveal">The Institution</p>
        <h2 className="section-title reveal reveal-delay-1">
          Kala Unnati<br />
          <span style={{ fontSize: '0.55em', letterSpacing: '0.08em', fontStyle: 'italic', color: 'var(--charcoal-light)' }}>Dance Foundation Trust</span>
        </h2>
        <div className="gold-rule reveal reveal-delay-2"></div>
        <div className="ku-inner">
          <p className="ku-body reveal">
            <strong>Kala Unnati Dance Foundation Trust</strong> is a Public Charitable Trust established under the Indian Trust Act, 1882, founded on 23rd March 2023. Rooted in tradition and driven by artistic excellence, it is dedicated to the promotion, preservation, and advancement of Odissi dance, music, and Indian performing arts — nurturing talent, discipline, creativity, and spiritual expression through movement.
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
                'Promote and spread Odissi dance nationally and internationally',
                'Provide structured training in Pada Bheda, Taal, and Abhinaya',
                'Organise festivals, workshops, and cultural events',
                'Foster research in Indian dance, drama, and music',
                'Encourage artistic collaboration and cultural exchange',
                'Train performers, educators, and researchers',
                'Establish library and archival resources for the arts',
                'Publish literature and support creative productions',
              ].map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="milestone-strip reveal">
          {[
            { date: '2023', label: 'Year Founded' },
            { date: '23 March', label: 'Established' },
            { date: 'Bhubaneswar', label: 'Registered, Odisha' },
            { date: 'Public Trust', label: 'Indian Trust Act, 1882' },
          ].map((m, i) => (
            <>
              {i > 0 && <div className="milestone-sep" key={`sep-${i}`}></div>}
              <div className="milestone-item" key={i}>
                <div className="milestone-date">{m.date}</div>
                <div className="milestone-label">{m.label}</div>
              </div>
            </>
          ))}
        </div>
        <div className="ku-principle reveal">
          <p className="ku-principle-quote">&ldquo;Preserving Tradition. Inspiring Excellence. Advancing Art.&rdquo;</p>
          <span className="ku-principle-sub">Kala Unnati Dance Foundation Trust</span>
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
              <span className="contact-value" style={{ cursor: 'default' }}>Bhubaneswar, Odisha</span>
            </div>
            <div className="contact-item">
              <div className="contact-label">Institution</div>
              <span className="contact-value" style={{ cursor: 'default', fontSize: 16 }}>Kala Unnati Dance Foundation Trust</span>
            </div>
          </div>
          <div className="social-row reveal">
            <a href="https://www.instagram.com/ashakumariyerra" target="_blank" rel="noreferrer" className="social-link">
              <div className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="var(--wine)"/>
                </svg>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="var(--wine)"/>
                </svg>
              </div>
              <span className="social-name">@kalaunnati_odissi</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-name">Y. Asha Kumari</span>
        <span className="footer-copy">© 2025 Kala Unnati Dance Foundation Trust. All rights reserved.</span>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#kala-unnati">Kala Unnati</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </>
  );
}