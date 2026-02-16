import React, { useCallback, useRef } from 'react';

const HeroWebGL = React.lazy(() => import('../../src/hero/HeroWebGL'));

const HomePage: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleBgProgress = useCallback((progress: number) => {
    // Fade hero text out as lines converge
    if (heroRef.current) {
      const fadeOut = Math.max(0, 1 - progress * 3); // fades in first 33% of scroll
      heroRef.current.style.opacity = String(fadeOut);
    }
  }, []);

  return (
    <div className="aero-home" ref={homeRef}>
      <React.Suspense fallback={null}>
        <HeroWebGL onBgProgress={handleBgProgress} />
      </React.Suspense>

      <section className="aero-home-hero">
        <div className="aero-home-hero-content" ref={heroRef}>
          <p className="aero-home-hero-tagline">
            Designed for AI collaboration and effortless interface building.
          </p>
          <div className="aero-home-hero-actions">
            <a className="aero-home-btn aero-home-btn--primary" href="/components/button">
              Get Started
            </a>
            <a
              className="aero-home-btn aero-home-btn--ghost"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="aero-home-features">
        <div className="aero-home-features-grid">
          <div className="aero-home-feature-card">
            <div className="aero-home-feature-icon">🧊</div>
            <h3>Glassmorphism</h3>
            <p>Frosted glass aesthetics with layered backdrop-filter blur, delivering a modern, airy visual language.</p>
          </div>
          <div className="aero-home-feature-card">
            <div className="aero-home-feature-icon">🎨</div>
            <h3>Themeable</h3>
            <p>CSS Variables + ConfigProvider for runtime theme switching. Dark mode built-in from day one.</p>
          </div>
          <div className="aero-home-feature-card">
            <div className="aero-home-feature-icon">🤖</div>
            <h3>AI-Friendly</h3>
            <p>Clean API surface and consistent patterns designed for seamless AI-assisted development workflows.</p>
          </div>
          <div className="aero-home-feature-card">
            <div className="aero-home-feature-icon">📦</div>
            <h3>60+ Components</h3>
            <p>From Form to Table, Modal to Masonry — a comprehensive toolkit for building production interfaces.</p>
          </div>
          <div className="aero-home-feature-card">
            <div className="aero-home-feature-icon">🌐</div>
            <h3>i18n Ready</h3>
            <p>Built-in locale system with Chinese and English support. Easily extensible to any language.</p>
          </div>
          <div className="aero-home-feature-card">
            <div className="aero-home-feature-icon">⚡</div>
            <h3>Lightweight</h3>
            <p>Tree-shakeable exports, zero runtime CSS-in-JS. Less + CSS Variables keep the bundle lean.</p>
          </div>
        </div>
      </section>

      <footer className="aero-home-footer">
        <p>AeroUI — Built with care.</p>
      </footer>
    </div>
  );
};

export default HomePage;
