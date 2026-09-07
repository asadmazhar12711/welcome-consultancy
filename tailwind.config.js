/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        surface: "hsl(var(--surface))",
        elevated: "hsl(var(--elevated))",
        page: "var(--bg-page)",
        fill: {
          DEFAULT: "var(--bg-fill)",
          hover: "var(--bg-fill-hover)",
        },
        gold: {
          400: "var(--gold-soft)",
          500: "var(--gold)",
          600: "var(--gold-deep)",
          fill: "var(--gold-fill)",
          muted: "var(--gold-muted)",
        },
        crimson: {
          400: "var(--gold-soft)",
          500: "var(--gold)",
          600: "var(--gold-deep)",
          fill: "var(--gold-fill)",
          muted: "var(--gold-muted)",
        },
        theme: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          faint: "var(--text-faint)",
          "on-gold": "var(--text-on-gold)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
        metric: "var(--metric)",
      },
      borderColor: {
        subtle: "var(--border-subtle)",
        elevated: "var(--border-elevated)",
        strong: "var(--border-strong)",
        gold: "var(--gold-border)",
      },
      boxShadow: {
        "theme-sm": "var(--shadow-sm)",
        "theme-md": "var(--shadow-md)",
        "theme-lg": "var(--shadow-lg)",
        "theme-xl": "var(--shadow-xl)",
        gold: "var(--shadow-gold)",
        "gold-lg": "var(--shadow-gold-lg)",
      },
      ringOffsetColor: {
        background: "hsl(var(--background))",
        page: "var(--bg-page)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Manrope", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Newsreader", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
