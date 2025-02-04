/** @type {import('tailwindcss').Config} */

// const config: Config = {
//   content: [
//     "./pages/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./app/**/*.{ts,tsx}",
//     "./src/**/*.{ts,tsx}",
//   ],
//   // @ts-expect-error safe command removed
//   safelist: ["ProseMirror"],
// };

// export default config;

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  safelist: ["ProseMirror"],
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
