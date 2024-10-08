/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'default-black': "#464646",
        'default-white': "#FBFBFB",
        'primary-red': "#DC0606",
        'secondary-red': "#A70024",
        'primary-blue': '#2674C3',
        'secondary-blue': '#0A58A3',
        'stepbar-blue': "#BBDEFF",
        'stepbar-blue-2': "#A3DDFA",
        'chat-blue': '#A2DBEC',
        'chat-purple': '#94A9F3',
        'primary-gray': '#9B9B9B',
        'secondary-gray': '#C1C1C1',
        'select-gray': '#F4F4F4',
        // 'label-gray': "#EBEBEB",
        'stepbar-gray': "#A7A7A7",
        'button-gray': "#D9D9D9",
        'price-gray': '#EDEEF1',
        'search-history-gray': '#D7E0E3',
        'dark-gray': '#666666',
        'chat-gray': '#F1F1F1',
        'sale': '#DEF9FF',
        'in-trade': '#FFF0DE',
        'sold-out': '#FFDEDE',
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      width: {
        "button": "18rem"
      },
      borderWidth: {
        "0.25": '0.25px',
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        "xxs": "0.625rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/line-clamp'),
  ],
}