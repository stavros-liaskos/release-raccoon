// Insert this script in your index.html right after the <body> tag.
// This will help to prevent a flash if dark mode is the default.

(function() {
  // Change these if you use something different in your hook.
  const storageKey = 'theme';
  const classNameDark = 'dark';
  const root = window.document.documentElement;

  function setClassOnDocumentBody(darkMode) {
    root.classList.add('dark');
    darkMode && document?.classList?.add(classNameDark);
    !darkMode && document.classList.remove(classNameDark);
  }

  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;

  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
     mql.matches && localStorage.setItem(storageKey, classNameDark);
  } else {
    // source of truth from document.body
    var isDarkMode = document.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();