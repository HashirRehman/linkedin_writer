/** @type {import('tailwindcss').Config} */
export default {
  content: ["assets/**", "entrypoints/**", "components/**"],
  theme: {
    extend: {
      colors: {
        "gray-custom": "rgba(102, 109, 128, 1)"
      },
    },
  },
  plugins: [],
};
