import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, ChevronRight, Instagram, MapPin, Menu as MenuIcon, Phone, X } from 'lucide-react';
import { menuCategories } from '@/data/menuData';

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

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [['Home', '/'], ['Menu', '/menu'], ['About', '/about'], ['Location', '/location']];
  return <header className="nav-wrap"><nav className="nav shell"><Logo /><div className="desktop-links">{links.map(([label, href]) => <a className="nav-link" href={href} key={label}>{label}</a>)}</div><div className="nav-actions"><a className="nav-instagram" href="https://www.instagram.com/pablo.cafe2020/" target="_blank" rel="noreferrer"><Instagram size={15} /> <span>@pablo.cafe2020</span></a><a className="nav-cta" href="/location">Visit us <ArrowUpRight size={14} /></a></div><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <MenuIcon />}</button></nav>{open && <div className="mobile-menu"><div className="mobile-menu-inner">{links.map(([label, href], index) => <a href={href} onClick={() => setOpen(false)} key={label}><span>0{index + 1}</span>{label}<ArrowUpRight size={18} /></a>)}<a href="https://www.instagram.com/pablo.cafe2020/" target="_blank" rel="noreferrer"><span>05</span>Instagram<ArrowUpRight size={18} /></a></div></div>}</header>;
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
  return <><Nav /><main><section className="hero"><div className="hero-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(36,8,10,.78), rgba(36,8,10,.08)), url(${photos.hero})` }} /><div className="hero-content shell"><div className="hero-kicker"><span>Nile side / Pablo Cafe</span><span>01 / 04</span></div><h1>A good cup<br /><em>finds you.</em></h1><p>A place to pause, sip, and stay a little longer.<br />Welcome to Pablo Cafe.</p><div className="hero-actions"><Button href="/menu" variant="light">Explore menu</Button><a className="scroll-link" href="#story">Scroll to discover <ChevronRight size={15} /></a></div></div></section><section className="story shell" id="story"><div className="story-image image-frame"><img src={photos.interior} alt="Warm, inviting cafe interior" loading="lazy" /></div><div className="story-copy"><SectionTitle eyebrow="The Pablo feeling" title={<>Not just a cafe.<br /><em>A state of mind.</em></>} /><p>Some places are made for a quick coffee. Pablo is made for the in-between moments — the ones that deserve more time, better company, and something lovely to drink.</p><a className="text-link" href="/about">Discover Pablo <ArrowUpRight size={16} /></a></div></section><section className="featured"><div className="shell"><SectionTitle eyebrow="From the counter" title={<>Sip the vibrant<br /><em>colours of Pablo.</em></>} /><div className="featured-grid"><div className="featured-main"><img src={photos.matcha} alt="Colourful iced drink at Pablo Cafe" loading="lazy" /><span className="image-caption">01 — daily drink</span></div><div className="featured-side"><div><img src={photos.dessert} alt="Dessert and iced matcha" loading="lazy" /><span className="image-caption">02 — good dessert</span></div><div className="featured-side-copy"><p>Our menu is a little bit of everything you came for.</p><Button href="/menu" variant="line">See the menu</Button></div></div></div></div></section><section className="marquee"><div>GOOD DESSERT <span>✦</span> GOOD MOOD <span>✦</span> PABLO CAFE <span>✦</span> </div></section><section className="gallery shell"><SectionTitle eyebrow="The Pablo frame" title={<>Moments worth<br /><em>lingering over.</em></>} /><div className="gallery-grid"><img className="gallery-tall" src={photos.coffee} alt="Coffee held in a cozy cafe" loading="lazy" /><img src={photos.pastry} alt="Coffee and pastry on a cafe table" loading="lazy" /><img className="gallery-wide" src={photos.river} alt="Nile at sunset" loading="lazy" /><img src={photos.interior} alt="Pablo cafe atmosphere" loading="lazy" /></div></section><section className="instagram-band"><div className="shell instagram-inner"><div><Instagram size={28} strokeWidth={1.5} /><p className="eyebrow">Follow along</p><h2>@pablo.<em>cafe2020</em></h2></div><Button href="https://www.instagram.com/pablo.cafe2020/" variant="light">Follow on Instagram</Button></div></section><div className="shell"><LocationBlock /></div><section className="contact-cta"><div className="shell"><p className="eyebrow">Your table is waiting</p><h2>See you at<br /><em>Pablo.</em></h2><Button href="tel:01142966997" variant="light">Call Pablo</Button></div></section></main><Footer /></>;
}

function MenuPage() {
  const [active, setActive] = useState('coffee');
  const category = menuCategories.find((item) => item.id === active) ?? menuCategories[0];
  return <><Nav /><main className="menu-page"><section className="page-hero shell"><p className="eyebrow">The Pablo menu</p><h1>Good things<br /><em>to come back to.</em></h1><p className="page-intro">A menu made for everyday rituals, shared plates, and the occasional sweet escape.</p></section><div className="menu-shell shell"><div className="category-nav" role="tablist">{menuCategories.map((item) => <button className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)} role="tab" aria-selected={active === item.id} key={item.id}>{item.label}</button>)}</div><div className="menu-heading"><div><p className="eyebrow">01 / 04</p><h2>{category.label}</h2></div><p>{category.note}</p></div><div className="menu-grid">{category.items.map((item) => <article className="menu-card" key={item.name}><div className="menu-card-image"><img src={item.image} alt={item.name} loading="lazy" /><span>+ view</span></div><div className="menu-card-copy"><h3>{item.name}</h3><p>{item.description}</p>{item.price && <strong>{item.price}</strong>}</div></article>)}</div><div className="menu-note"><span>Menu items and prices are updated in cafe.</span><span>Ask our team about today's specials.</span></div></div></main><Footer /></>;
}

function AboutPage() { return <><Nav /><main className="about-page"><section className="about-hero shell"><div><p className="eyebrow">A little about Pablo</p><h1>Made for the<br /><em>good moments.</em></h1></div><img src={photos.interior} alt="Pablo Cafe interior" /></section><section className="about-statement shell"><p className="eyebrow">Our space</p><h2>A little pause from the rush.<br /><em>A lot of room for living.</em></h2><p>Set beside the Nile, Pablo Cafe brings together the things that make an ordinary day feel better: a familiar table, a drink made with care, and the kind of atmosphere that lets the conversation run long.</p></section><section className="about-split shell"><img src={photos.coffee} alt="Coffee at Pablo Cafe" loading="lazy" /><div><p className="eyebrow">Come as you are</p><h2>Your everyday<br /><em>favourite place.</em></h2><p>From the first coffee of the morning to a colourful afternoon pick-me-up, Pablo is here for the full rhythm of your day.</p><a className="text-link" href="/location">Find your way here <ArrowUpRight size={16} /></a></div></section><div className="about-river" style={{ backgroundImage: `url(${photos.river})` }}><div><p>Take your time.</p><strong>Stay for the view.</strong></div></div></main><Footer /></> }

function LocationPage() { return <><Nav /><main className="location-page"><section className="page-hero shell"><p className="eyebrow">Find Pablo</p><h1>Meet us<br /><em>by the Nile.</em></h1><p className="page-intro">The perfect place to start, end, or pause your day.</p></section><div className="shell location-page-grid"><div className="location-map" style={{ backgroundImage: `url(${photos.river})` }}><span className="map-pin"><MapPin size={18} /></span><span className="map-label">PABLO CAFE</span></div><div className="location-details"><div><p className="eyebrow">Address</p><h2>آخر كورنيش النيل<br />بجوار كافيه طرح البحر</h2></div><div><p className="eyebrow">Call us</p><a className="big-phone" href="tel:01142966997">011 429 66997</a></div><div className="location-actions"><Button href="https://www.google.com/maps/search/?api=1&query=آخر+كورنيش+النيل+بجوار+كافيه+طرح+البحر">Get directions</Button><Button href="tel:01142966997" variant="line">Call Pablo</Button></div></div></div></main><Footer /></> }

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { document.title = path === '/menu' ? 'Menu — Pablo Cafe' : path === '/about' ? 'About — Pablo Cafe' : path === '/location' ? 'Location — Pablo Cafe' : 'Pablo Cafe — A good cup finds you'; window.scrollTo(0, 0); }, [path]);
  useEffect(() => { const handler = (event: MouseEvent) => { const target = (event.target as HTMLElement).closest('a'); if (target?.origin === window.location.origin && target.pathname !== window.location.pathname && !target.hash) { event.preventDefault(); window.history.pushState({}, '', target.pathname); window.dispatchEvent(new PopStateEvent('popstate')); } }; document.addEventListener('click', handler); return () => document.removeEventListener('click', handler); }, []);
  return path === '/menu' ? <MenuPage /> : path === '/about' ? <AboutPage /> : path === '/location' ? <LocationPage /> : <Home />;
}

export default App;
