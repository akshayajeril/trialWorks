import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme-mode';
const MODES = new Set(['light', 'dark', 'system']);

function readStoredMode() {
  try {
    const storedMode = window.localStorage.getItem(STORAGE_KEY);
    return MODES.has(storedMode) ? storedMode : 'system';
  } catch {
    return 'system';
  }
}

function applyTheme(mode, systemPrefersDark = false) {
  const isDark = mode === 'dark' || (mode === 'system' && systemPrefersDark);
  const className = isDark ? 'dark' : 'light';

  [document.documentElement, document.body].forEach((element) => {
    if (!element) return;
    element.classList.toggle('dark', isDark);
    element.classList.toggle('light', !isDark);
  });

  return className;
}

export function useTheme() {
  const [mode, setMode] = useState(readStoredMode);
  const [effectiveTheme, setEffectiveTheme] = useState(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // The selected mode still works for this page when storage is unavailable.
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      const theme = applyTheme(mode, mediaQuery.matches);
      setEffectiveTheme(theme);
    };

    updateTheme();
    if (mode !== 'system') return undefined;

    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [mode]);

  const setTheme = useCallback((nextMode) => {
    if (!MODES.has(nextMode)) return;

    setMode(nextMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      // Ignore unavailable storage; the in-memory state remains authoritative.
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setEffectiveTheme(applyTheme(nextMode, prefersDark));
  }, []);

  return { mode, effectiveTheme, setTheme };
}