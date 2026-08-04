// Runs before paint to apply any previously-chosen CRT theme, avoiding a
// flash of the default green theme. The script body is a fixed, static
// string we control (no user input is ever interpolated into it).
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var t = window.localStorage.getItem("terminal-theme");
    if (t === "amber" || t === "cyan" || t === "green") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
})();
`;

export default function ThemeInitScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
