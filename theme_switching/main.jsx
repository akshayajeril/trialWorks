import { createRoot } from 'react-dom/client';
import { ThemeToggleWidget } from './ThemeToggleWidget.jsx';
import { useTheme } from './useTheme.js';
import './styles.css';

function App() {
  const { mode, effectiveTheme, setTheme } = useTheme();

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Little light home">
          <span className="wordmark__mark" aria-hidden="true">◐</span>
          little light<span className="wordmark__period">.</span>
        </a>
        <span className="topbar__label">A theme toggle demo</span>
      </header>

      <main className="intro" id="home">
        <section className="intro__copy" aria-labelledby="page-title">
          <p className="eyebrow">A small switch, a softer screen</p>
          <h1 id="page-title">Make yourself at home.</h1>
          <p className="intro__description">
            Choose the look that feels right. Switch between light and dark,
            or let your device decide—the preview updates as you go.
          </p>
        </section>

        <div className="settings-column">
          <ThemeToggleWidget
            mode={mode}
            effectiveTheme={effectiveTheme}
            onChange={setTheme}
          />

          <article className="preview" aria-label="Theme preview">
            <div className="preview__topline">
              <span className="preview__label">A note for today</span>
              <span className="preview__dots" aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className="preview__content">
              <span className="preview__icon" aria-hidden="true">✳</span>
              <div>
                <h3 className="preview__title">A little breathing room</h3>
                <p className="preview__text">Good design feels comfortable, day or night.</p>
              </div>
            </div>
            <div className="preview__footer">
              <span>YOUR SPACE, YOUR WAY</span>
              <span className="preview__arrow" aria-hidden="true">↗</span>
            </div>
          </article>

          <p className="settings-note">Your choice is saved on this device.</p>
        </div>
      </main>

      <footer className="page-footer">
        <span>Little light <span>·</span> Theme controls</span>
        <span>Light, dark, or just right.</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
