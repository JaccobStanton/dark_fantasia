import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navBgAlpha, setNavBgAlpha] = useState(0);
  const navItems = ["MUSIC", "BAND", "EVENTS", "NEWS", "CONTACT", "STORE"];

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".hero");
      if (!hero) {
        setNavBgAlpha(window.scrollY > 8 ? 0.24 : 0);
        return;
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const progress = Math.min(Math.max(window.scrollY / heroBottom, 0), 1);
      setNavBgAlpha(progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`site-navbar ${menuOpen ? "menu-open" : ""} ${
        navBgAlpha >= 0.999 ? "is-fully-dark" : ""
      }`}
      style={{ "--nav-bg-alpha": navBgAlpha }}
    >
      <div className="site-navbar-inner">
        <a className="brand-logo" href="/" aria-label="Dark Fantasia home">
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img
              className="brand-logo-image"
              src="/logo.webp"
              alt="Dark Fantasia"
            />
          </picture>
        </a>

        <nav className="hero-nav nav-desktop" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <div className="site-actions">
          <button className="cart-button" type="button" aria-label="Open cart">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 6.2A4 4 0 0 1 12 2a4 4 0 0 1 4 4.2h2.1A2.9 2.9 0 0 1 21 9.1v9A2.9 2.9 0 0 1 18.1 21H5.9A2.9 2.9 0 0 1 3 18.1v-9a2.9 2.9 0 0 1 2.9-2.9H8Zm1.7 0h4.6A2.3 2.3 0 0 0 12 3.7 2.3 2.3 0 0 0 9.7 6.2ZM5.9 7.8c-.7 0-1.3.6-1.3 1.3v9c0 .7.6 1.3 1.3 1.3h12.2c.7 0 1.3-.6 1.3-1.3v-9c0-.7-.6-1.3-1.3-1.3h-1.9v2a.8.8 0 0 1-1.6 0v-2H9.4v2a.8.8 0 0 1-1.6 0v-2H5.9Z" />
            </svg>
            <span className="cart-count">0</span>
          </button>

          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        className={`nav-mobile-overlay ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="nav-mobile-links">
          {navItems.map((item, index) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              onClick={closeMenu}
              style={{ "--item-index": index }}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="nav-mobile-footer">
          <p>LISTEN &amp; CONNECT WITH US</p>
          <div className="nav-mobile-social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 3.8 7v10A3.2 3.2 0 0 0 7 20.2h10a3.2 3.2 0 0 0 3.2-3.2V7A3.2 3.2 0 0 0 17 3.8H7Zm11 1.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.7L6 22H2.9l7.3-8.4L1 2h6.3l4.4 6L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-1.6 19.9v-7h-2.3V12h2.3V9.8c0-2.3 1.3-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.5V12h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
