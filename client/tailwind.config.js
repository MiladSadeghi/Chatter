/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        DMSans: ["DM Sans", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        SFPro: ["SF Pro", "sans-serif"],
        Mulish: ["Mulish", "sans-serif"]
      },
      backgroundImage: {
        "header": "url('./assets/home-background.png')"
      },
      colors: {
        "my-blue": "#296EFF",
        "my-gray": "#C0C0C0",
        "my-blue-gray": "#5F6388",
        "my-light-gray": "#E1E1E1",
        "my-light-white": "#f8fafc",
        "my-turquoise": "#5bf7db",
        "my-dark-gray": "#757575",
        "my-light-purple": "#625BF7",
      },
      boxShadow: {
        "to-r": "0px 0px 24px rgba(0, 0, 0, 0.08)"
      }
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
