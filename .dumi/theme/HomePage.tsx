import React, { useCallback, useRef } from 'react';
import { useLocation } from 'dumi';

const HeroWebGL = React.lazy(() => import('../../src/hero/HeroWebGL'));

const i18n = {
  'zh-CN': {
    tagline: '为 AI 协作而设计，轻松构建精美界面。',
    getStarted: '开始使用',
    github: 'GitHub',
    getStartedLink: '/cn/components/button',
    features: [
      { title: 'Pencil 支持', desc: '内置 .pen 设计文件，AI 可直接读取组件设计稿并生成代码。' },
      { title: '主题定制', desc: 'CSS Variables + ConfigProvider 运行时主题切换，暗色模式开箱即用。' },
      { title: 'AI 友好', desc: '简洁一致的 API 设计，专为 AI 辅助开发工作流打造。' },
      { title: '60+ 组件', desc: '从 Form 到 Table，Modal 到 Masonry——构建生产级界面的完整工具集。' },
      { title: '国际化', desc: '内置中英文语言包，可轻松扩展至任意语言。' },
      { title: '轻量高效', desc: '支持 Tree-shaking，零运行时 CSS-in-JS，Less + CSS Variables 保持包体精简。' },
    ],
    footer: 'Aeroly — 用心构建。',
  },
  'en-US': {
    tagline: 'Designed for AI collaboration and effortless interface building.',
    getStarted: 'Get Started',
    github: 'GitHub',
    getStartedLink: '/components/button',
    features: [
      { title: 'Pencil Support', desc: 'Built-in .pen design file lets AI read component designs and generate code directly.' },
      { title: 'Themeable', desc: 'CSS Variables + ConfigProvider for runtime theme switching. Dark mode built-in from day one.' },
      { title: 'AI-Friendly', desc: 'Clean API surface and consistent patterns designed for seamless AI-assisted development workflows.' },
      { title: '60+ Components', desc: 'From Form to Table, Modal to Masonry — a comprehensive toolkit for building production interfaces.' },
      { title: 'i18n Ready', desc: 'Built-in locale system with Chinese and English support. Easily extensible to any language.' },
      { title: 'Lightweight', desc: 'Tree-shakeable exports, zero runtime CSS-in-JS. Less + CSS Variables keep the bundle lean.' },
    ],
    footer: 'Aeroly — Built with care.',
  },
};

const HomePage: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isCN = location.pathname.startsWith('/cn');
  const t = isCN ? i18n['zh-CN'] : i18n['en-US'];

  const handleBgProgress = useCallback((progress: number) => {
    if (heroRef.current) {
      const fadeOut = Math.max(0, 1 - progress * 3);
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
          <p className="aero-home-hero-tagline">{t.tagline}</p>
          <div className="aero-home-hero-actions">
            <a className="aero-home-btn aero-home-btn--primary" href={t.getStartedLink}>
              {t.getStarted}
            </a>
            <a
              className="aero-home-btn aero-home-btn--ghost"
              href="https://github.com/name-q/aeroly"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.github}
            </a>
          </div>
        </div>
      </section>

      <section className="aero-home-features">
        <div className="aero-home-features-grid">
          {t.features.map((f) => (
            <div className="aero-home-feature-card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="aero-home-footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};

export default HomePage;
