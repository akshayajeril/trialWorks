const OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export function ThemeToggleWidget({ mode, effectiveTheme, onChange }) {
  return (
    <section className="theme-control" aria-labelledby="theme-control-title">
      <div className="theme-control__heading">
        <div>
          <p className="eyebrow">Display</p>
          <h2 id="theme-control-title">Appearance</h2>
        </div>
        <span className="theme-control__status" aria-live="polite">
          <span className="status-dot" aria-hidden="true" />
          {effectiveTheme === 'dark' ? 'Dark' : 'Light'}
        </span>
      </div>

      <div className="mode-switch" role="group" aria-label="Choose color theme">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className="mode-switch__option"
            aria-pressed={mode === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="theme-control__hint">
        {mode === 'system' ? 'Following your device settings' : `${mode[0].toUpperCase()}${mode.slice(1)} appearance`}
      </p>
    </section>
  );
}
