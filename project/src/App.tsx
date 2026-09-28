import { useEffect, useState, useRef, type ReactNode, type CSSProperties } from 'react';
import { ArrowUpRight, ChevronRight, Instagram, MapPin, Phone, Home as HomeIcon, UtensilsCrossed, Info } from 'lucide-react';
import { menuCategories } from '@/data/menuData';

const instagramUrl = 'https://www.instagram.com/pablo.cafe2020/';

const photos = {
  hero: 'https://images.pexels.com/photos/11287941/pexels-photo-11287941.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  river: 'https://images.pexels.com/photos/36224723/pexels-photo-36224723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  coffee: 'https://images.pexels.com/photos/6612662/pexels-photo-6612662.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  matcha: 'https://images.pexels.com/photos/30494513/pexels-photo-30494513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  dessert: 'https://images.pexels.com/photos/33384164/pexels-photo-33384164.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  pastry: 'https://images.pexels.com/photos/34773646/pexels-photo-34773646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior: 'https://images.pexels.com/photos/18617712/pexels-photo-18617712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

function Logo() {
  return <a className="logo" href="/" aria-label="Pablo Cafe home"><img src="/assets/logo/image.png" alt="Pablo Cafe" /></a>;
}

function Button({ children, href = '#', variant = 'solid' }: { children: ReactNode; href?: string; variant?: 'solid' | 'line' | 'light' }) {
  return <a className={`button button-${variant}`} href={href}>{children}<ArrowUpRight size={16} strokeWidth={1.8} /></a>;
}

function ScrollReveal({ children, className = 'reveal', delay }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const delayClass = delay === 1 ? 'reveal-delay-1' : delay === 2 ? 'reveal-delay-2' : delay === 3 ? 'reveal-delay-3' : '';
  return <div ref={ref} className={`${className} ${visible ? 'visible' : ''} ${delayClass}`}>{children}</div>;
}

const bottomNavItems = [
  { label: 'Home', href: '/', icon: HomeIcon },
  { label: 'Menu', href: '/menu', icon: UtensilsCrossed },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Location', href: '/location', icon: MapPin },
];

function MobileBottomNav({ currentPath }: { currentPath: string }) {
  return <nav className="bottom-nav" aria-label="Mobile navigation">
    <div className="bottom-nav-inner">
      {bottomNavItems.map(({ label, href, icon: Icon }) => {
        const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));
        return <a key={label} href={href} className={`bottom-nav-item${isActive ? ' active' : ''}`}>{<Icon size={22} />}<span className="bottom-nav-label">{label}</span></a>;
      })}
      <a href="https://www.instagram.com/pablo.cafe2020/" target="_blank" rel="noreferrer" className="bottom-nav-item nav-instagram" aria-label="Instagram"><Instagram size={22} /><span className="bottom-nav-label">More</span></a>
    </div>
  </nav>;
}

function Nav({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const links = [['Home', '/'], ['Menu', '/menu'], ['About', '/about'], ['Location', '/location']];
  const menuItems = [
    ...links.map(([label, href], index) => ({ number: `0${index + 1}`, label, href: href as string, external: false })),
    { number: '05', label: 'Instagram', href: instagramUrl, external: true },
  ];

  useEffect(() => {
    const handler = () => { setScrolled(window.scrollY > 40); if (window.scrollY > 4) setOpen(false); };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // The panel is content-driven: measure it so the open/close animation never
  // overshoots into empty space or needs a viewport height.
  useEffect(() => {
    const inner = panelRef.current;
    if (!inner) return;
    const measure = () => setPanelHeight(inner.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 801px)');
    const onChange = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  const handleToggle = () => setOpen(value => !value);

  return <header className={`nav-wrap${scrolled ? ' scrolled' : ''}${currentPath === '/' ? '' : ' on-light'}`}>
    <div className={`mobile-menu-scrim${open ? ' open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
    <nav className="nav shell"><Logo /><div className="desktop-links">{links.map(([label, href]) => <a className={`nav-link${currentPath === href || (href !== '/' && currentPath.startsWith(href)) ? ' active' : ''}`} href={href} key={label}>{label}</a>)}</div><div className="nav-actions"><a className="nav-instagram" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} /> <span>@pablo.cafe2020</span></a><a className="nav-cta" href="/location">Visit us <ArrowUpRight size={14} /></a></div>
      <button ref={toggleRef} type="button" className={`menu-toggle${open ? ' open' : ''}`} onClick={handleToggle} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
        <span className="menu-toggle-icon" aria-hidden="true"><span className="menu-toggle-line" /><span className="menu-toggle-line" /><span className="menu-toggle-line" /></span>
      </button>
    </nav>
    <div id="mobile-menu" className={`mobile-menu${open ? ' open' : ''}`} style={{ '--menu-height': `${panelHeight}px` } as CSSProperties}>
      <div className="mobile-menu-inner" ref={panelRef}>
        <p className="mobile-menu-label">Explore</p>
        <nav className="mobile-menu-list" aria-label="Mobile menu">
          {menuItems.map(({ number, label, href, external }) => <a className="mobile-menu-item" key={label} href={href} onClick={() => setOpen(false)} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}><span className="mobile-menu-num">{number}</span><span className="mobile-menu-text">{label}</span><ArrowUpRight size={16} className="mobile-menu-arrow" /></a>)}
        </nav>
      </div>
    </div>
  </header>;
}


function SectionTitle({ eyebrow, title, dark = false }: { eyebrow: string; title: ReactNode; dark?: boolean }) {
  return <div className={`section-title ${dark ? 'on-dark' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>;
}

function Footer() {
  return <footer className="footer"><div className="shell footer-top"><div className="footer-note">Good coffee.<br />Good mood.</div><div className="footer-nav"><a href="/menu">Menu</a><a href="/about">About</a><a href="/location">Find us</a><a href="https://www.instagram.com/pablo.cafe2020/" target="_blank" rel="noreferrer">Instagram</a></div><div className="footer-contact"><span>Say hello</span><a href="tel:01142966997">011 429 66997</a><a href="https://www.instagram.com/pablo.cafe2020/" target="_blank" rel="noreferrer">@pablo.cafe2020</a></div></div><div className="shell footer-bottom"><span>© 2026 Pablo Cafe</span><span>آخر كورنيش النيل · Egypt</span></div></footer>;
}

function LocationBlock() {
  return <section className="location-section"><div className="location-image" style={{ backgroundImage: `url(${photos.river})` }}><span className="map-pin"><MapPin size={18} /></span><span className="map-label">PABLO CAFE</span></div><div className="location-copy"><p className="eyebrow">Come find us</p><h2>By the Nile,<br /><em>in your element.</em></h2><p>آخر كورنيش النيل بجوار كافيه طرح البحر</p><div className="location-actions"><Button href="https://www.google.com/maps/search/?api=1&query=آخر+كورنيش+النيل+بجوار+كافيه+طرح+البحر">Get directions</Button><a className="phone-link" href="tel:01142966997"><Phone size={17} /> 011 429 66997</a></div></div></section>;
}

function Home() {
  return <><Nav currentPath="/" /><main>
    <section className="hero"><div className="hero-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(36,8,10,.78), rgba(36,8,10,.08)), url(${photos.hero})` }} />
    <div className="hero-content shell">
      <div className="hero-kicker"><span>Nile side / Pablo Cafe</span><span>01 / 04</span></div>
      <h1 className="reveal reveal-delay-2">A good cup<br /><em>finds you.</em></h1>
      <p className="reveal reveal-delay-3">A place to pause, sip, and stay a little longer.<br />Welcome to Pablo Cafe.</p>
      <div className="hero-actions reveal reveal-delay-3"><Button href="/menu" variant="light">Explore menu</Button><a className="scroll-link" href="#story">Scroll to discover <ChevronRight size={15} /></a></div>
    </div></section>
    <section className="story shell" id="story"><div className="story-image image-frame"><img src={photos.interior} alt="Warm, inviting cafe interior" loading="lazy" /></div>
    <div className="story-copy"><SectionTitle eyebrow="The Pablo feeling" title={<>Not just a cafe.<br /><em>A state of mind.</em></>} /><p>Some places are made for a quick coffee. Pablo is made for the in-between moments — the ones that deserve more time, better company, and something lovely to drink.</p><a className="text-link" href="/about">Discover Pablo <ArrowUpRight size={16} /></a></div></section>
    <section className="featured"><div className="shell"><SectionTitle eyebrow="From the counter" title={<>Sip the vibrant<br /><em>colours of Pablo.</em></>} />
    <div className="featured-grid">
      <div className="featured-main"><img src={photos.matcha} alt="Colourful iced drink at Pablo Cafe" loading="lazy" /><span className="image-caption">01 — daily drink</span></div>
      <div className="featured-side"><div><img src={photos.dessert} alt="Dessert and iced matcha" loading="lazy" /><span className="image-caption">02 — good dessert</span></div>
      <div className="featured-side-copy"><p>Our menu is a little bit of everything you came for.</p><Button href="/menu" variant="line">See the menu</Button></div></div>
    </div></div></section>
    <section className="marquee"><div>GOOD DESSERT <span>✦</span> GOOD MOOD <span>✦</span> PABLO CAFE <span>✦</span> </div></section>
    <section className="gallery shell"><SectionTitle eyebrow="The Pablo frame" title={<>Moments worth<br /><em>lingering over.</em></>} />
    <div className="gallery-grid">
      <img className="gallery-tall scroll-reveal" src={photos.coffee} alt="Coffee held in a cozy cafe" loading="lazy" />
      <img className="reveal reveal-delay-1" src={photos.pastry} alt="Coffee and pastry on a cafe table" loading="lazy" />
      <img className="gallery-wide scroll-reveal-delay-2" src={photos.river} alt="Nile at sunset" loading="lazy" />
      <img className="reveal reveal-delay-1" src={photos.interior} alt="Pablo cafe atmosphere" loading="lazy" />
    </div></section>
    <section className="instagram-band"><div className="shell instagram-inner"><div><Instagram size={28} strokeWidth={1.5} /><p className="eyebrow">Follow along</p><h2>@pablo.<em>cafe2020</em></h2></div><Button href="https://www.instagram.com/pablo.cafe2020/" variant="light">Follow on Instagram</Button></div></section>
    <div className="shell"><LocationBlock /></div>
    <section className="contact-cta"><div className="shell"><p className="eyebrow">Your table is waiting</p><h2>See you at<br /><em>Pablo.</em></h2><Button href="tel:01142966997" variant="light">Call Pablo</Button></div></section>
  </main><Footer /></>;
}

function MenuPage() {
  const [active, setActive] = useState('coffee');
  const category = menuCategories.find((item) => item.id === active) ?? menuCategories[0];
  return <><Nav currentPath="/menu" /><main className="menu-page"><section className="page-hero shell"><p className="eyebrow">The Pablo menu</p><h1>Good things<br /><em>to come back to.</em></h1><p className="page-intro">A menu made for everyday rituals, shared plates, and the occasional sweet escape.</p></section>
    <div className="menu-shell shell">
      <div className="category-nav" role="tablist">{menuCategories.map((item) => <button className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)} role="tab" aria-selected={active === item.id} key={item.id}>{item.label}</button>)}</div>
      <div className="menu-heading"><div><p className="eyebrow">01 / 04</p><h2>{category.label}</h2></div><p>{category.note}</p></div>
      <div className="menu-grid">{category.items.map((item, index) => <article className="menu-card" key={item.name}><div className="menu-card-image"><img src={item.image} alt={item.name} loading="lazy" /><span>+ view</span></div><div className="menu-card-copy"><h3>{item.name}</h3><p>{item.description}</p>{item.price && <strong>{item.price}</strong>}</div></article>)}</div>
      <div className="menu-note"><span>Menu items and prices are updated in cafe.</span><span>Ask our team about today's specials.</span></div>
    </div></main><Footer /></>;
}

function AboutPage() { return <><Nav currentPath="/about" /><main className="about-page">
    <section className="about-hero shell"><div><p className="eyebrow">A little about Pablo</p><h1>Made for the<br /><em>good moments.</em></h1></div><img src={photos.interior} alt="Pablo Cafe interior" /></section>
    <section className="about-statement shell"><p className="eyebrow">Our space</p><h2>A little pause from the rush.<br /><em>A lot of room for living.</em></h2><p>Set beside the Nile, Pablo Cafe brings together the things that make an ordinary day feel better: a familiar table, a drink made with care, and the kind of atmosphere that lets the conversation run long.</p></section>
    <section className="about-split shell"><img src={photos.coffee} alt="Coffee at Pablo Cafe" loading="lazy" /><div><p className="eyebrow">Come as you are</p><h2>Your everyday<br /><em>favourite place.</em></h2><p>From the first coffee of the morning to a colourful afternoon pick-me-up, Pablo is here for the full rhythm of your day.</p><a className="text-link" href="/location">Find your way here <ArrowUpRight size={16} /></a></div></section>
    <div className="about-river" style={{ backgroundImage: `url(${photos.river})` }}><div><p>Take your time.</p><strong>Stay for the view.</strong></div></div>
  </main><Footer /></>; }

function LocationPage() { return <><Nav currentPath="/location" /><main className="location-page">
    <section className="page-hero shell"><p className="eyebrow">Find Pablo</p><h1>Meet us<br /><em>by the Nile.</em></h1><p className="page-intro">The perfect place to start, end, or pause your day.</p></section>
    <div className="shell location-page-grid">
      <div className="location-map" style={{ backgroundImage: `url(${photos.river})` }}><span className="map-pin"><MapPin size={18} /></span><span className="map-label">PABLO CAFE</span></div>
      <div className="location-details"><div><p className="eyebrow">Address</p><h2>آخر كورنيش النيل<br />بجوار كافيه طرح البحر</h2></div><div><p className="eyebrow">Call us</p><a className="big-phone" href="tel:01142966997">011 429 66997</a></div>
      <div className="location-actions"><Button href="https://www.google.com/maps/search/?api=1&query=آخر+كورنيش+النيل+بجوار+كافيه+طرح+البحر">Get directions</Button><Button href="tel:01142966997" variant="line">Call Pablo</Button></div></div>
    </div></main><Footer /></>; }

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [pageKey, setPageKey] = useState(0);
  useEffect(() => { const onPop = () => { setPath(window.location.pathname); setPageKey(k => k + 1); }; window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { document.title = path === '/menu' ? 'Menu — Pablo Cafe' : path === '/about' ? 'About — Pablo Cafe' : path === '/location' ? 'Location — Pablo Cafe' : 'Pablo Cafe — A good cup finds you'; window.scrollTo(0, 0); }, [path]);
  useEffect(() => { const handler = (event: MouseEvent) => { const target = (event.target as HTMLElement).closest('a'); if (target?.origin === window.location.origin && target.pathname !== window.location.pathname && !target.hash) { event.preventDefault(); window.history.pushState({}, '', target.pathname); setPath(target.pathname); setPageKey(k => k + 1); } }; document.addEventListener('click', handler); return () => document.removeEventListener('click', handler); }, []);
useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal, .scroll-reveal, .scroll-reveal-delay-1, .scroll-reveal-delay-2");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.remove("reveal-animate");
          void el.offsetWidth;
          el.classList.add("reveal-animate");
          if (el.classList.contains("scroll-reveal")) { el.classList.add("scroll-reveal-animate"); }
          if (el.classList.contains("scroll-reveal-delay-1")) { el.classList.add("delay-1"); }
          if (el.classList.contains("scroll-reveal-delay-2")) { el.classList.add("delay-2"); }
          if (el.classList.contains("reveal-delay-1")) { el.classList.add("delay-1"); }
          if (el.classList.contains("reveal-delay-2")) { el.classList.add("delay-2"); }
          if (el.classList.contains("reveal-delay-3")) { el.classList.add("delay-3"); }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);

  // Fallback: ensure elements animate even if observer does not fire
  useEffect(() => { const timeout = setTimeout(() => { document.querySelectorAll(".reveal, .scroll-reveal, .scroll-reveal-delay-1, .scroll-reveal-delay-2").forEach((el) => { if (!el.classList.contains("reveal-animate")) { const e = el as HTMLElement; e.classList.add("reveal-animate"); if (e.classList.contains("scroll-reveal")) { e.classList.add("scroll-reveal-animate"); } if (e.classList.contains("scroll-reveal-delay-1") || e.classList.contains("reveal-delay-1")) { e.classList.add("delay-1"); } if (e.classList.contains("scroll-reveal-delay-2") || e.classList.contains("reveal-delay-2")) { e.classList.add("delay-2"); } if (e.classList.contains("reveal-delay-3")) { e.classList.add("delay-3"); } } }); }, 500); return () => clearTimeout(timeout); }, []);

  const currentPage = path === '/menu' ? <MenuPage /> : path === '/about' ? <AboutPage /> : path === '/location' ? <LocationPage /> : <Home />;
  return <div className="page-wrapper"><div className="page" key={pageKey}>{currentPage}</div><MobileBottomNav currentPath={path} /></div>;
}

export default App;



