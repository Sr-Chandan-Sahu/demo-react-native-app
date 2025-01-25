/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx, js, jsx}", './components/**/*.{ts,tsx}', './node_modules/@rnr/**/*.{ts,tsx, js,jsx}',],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}