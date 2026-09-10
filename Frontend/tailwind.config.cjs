// Tailwind CSS configuration – custom color mappings to CSS variables
module.exports = {
  darkMode: "class",
  // Paths to all of your template files
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        "glow-purple": "var(--shadow-glow-purple)",
        "glow-pink": "var(--shadow-glow-pink)",
        "glow-cyan": "var(--shadow-glow-cyan)",
      },
      colors: {
        // Background colors
        "bg-primary": "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        "bg-tertiary": "var(--color-bg-tertiary)",
        "bg-card": "var(--color-bg-card)",
        "bg-hover": "var(--color-bg-hover)",
        // Text colors
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        // Border colors
        "border-subtle": "var(--color-border-subtle)",
        "border-accent": "var(--color-border-accent)",
        // Accent palette
        "accent-neutral": "#555555",
        "accent-light": "#E5E5E5",
        "accent-dark": "#0A0A0A",
        "accent-blue": "#2563EB",
        "accent-coral": "#F97316",
        "accent-mint": "#0F9F8C",
        "accent-green": "#22C55E",
      },
    },
  },
  plugins: [],
};
