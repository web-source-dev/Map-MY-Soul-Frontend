import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
				'serif': ['var(--font-forum)', 'Georgia', 'serif'],
				'display': ['var(--font-forum)', 'Georgia', 'serif'],
				'forum': ['var(--font-forum)', 'Georgia', 'serif'],
				'dm-sans': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Base colors
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: 'hsl(var(--card))',
				'card-foreground': 'hsl(var(--card-foreground))',
				
				// Primary Colors - Exact hex values from image
				'primary-indigo': '#4B2ECC',    // Indigo Grape
				'primary-lavender': '#9C4EC4',  // Lavender Grape  
				'primary-pastel': '#D88CFF',    // Pastel Lavender
				
				// Secondary Colors - Exact hex values from image
				'secondary-vivid': '#8000FF',   // Vivid Purple
				'secondary-pop': '#A20067',     // Pop Magenta
				
				// Support Colors - Exact hex values from image  
				'support-dark': '#0A2464',      // Dark Blue
				'support-pastel': '#C1A086',    // Pastel Gray
				'support-light': '#D88CFF',     // Light Yellow (using pastel lavender)
				
				// Common aliases for easy usage
				primary: {
					DEFAULT: '#4B2ECC',         // Maps to primary-indigo
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: '#8000FF',         // Maps to secondary-vivid
					foreground: 'hsl(var(--secondary-foreground))'
				},
				
				// Additional semantic colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				'mystic-purple': {
					DEFAULT: 'hsl(var(--mystic-purple))',
					light: 'hsl(var(--mystic-purple-light))',
					dark: 'hsl(var(--mystic-purple-dark))'
				},
				'golden-warm': 'hsl(var(--golden-warm))',
				'golden-light': 'hsl(var(--golden-light))',
				'cream-soft': 'hsl(var(--cream-soft))',
				'earth-brown': 'hsl(var(--earth-brown))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(50px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary-glow) / 0.4)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
