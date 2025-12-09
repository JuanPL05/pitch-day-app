import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#1e293b',
        card: '#ffffff',
        'card-foreground': '#1e293b',
        popover: '#ffffff',
        'popover-foreground': '#1e293b',
        primary: '#0ea5e9',
        'primary-foreground': '#ffffff',
        secondary: '#f1f5f9',
        'secondary-foreground': '#475569',
        muted: '#f8fafc',
        'muted-foreground': '#64748b',
        accent: '#10b981',
        'accent-foreground': '#ffffff',
        destructive: '#ef4444',
        'destructive-foreground': '#ffffff',
        border: '#e2e8f0',
        input: '#ffffff',
        ring: '#0ea5e9',
      },
      borderRadius: {
        lg: '0.75rem',
        md: 'calc(0.75rem - 2px)',
        sm: 'calc(0.75rem - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
