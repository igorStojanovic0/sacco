import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./providers/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      t: "0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      orange: "0px 20px 20px -15px rgba(245,56,56,0.81) ",
      "orange-md": "0px 20px 40px -15px rgba(245,56,56,0.81) ",
      none: "none",
    },
    // colors: {
    //   blue: {
    //     200: 'rgb(240,243,251)',
    //     300: "rgb(44,107,175)",
    //     400: 'rgb(23,54,89)',
    //     500: 'rgb(17,22,42)'
    //   },
    //   black: {
    //     500: "#4F5665",
    //     600: "#0B132A",
    //   },
    //   orange: {
    //     100: "#FFECEC",
    //     500: "#F53855",
    //   },
    //   green: {
    //     500: "#2FAB73",
    //   },
    //   white: {
    //     300: "#F8F8F8",
    //     500: "#fff",
    //   },
    //   gray: {
    //     100: "#EEEFF2",
    //     400: "#AFB5C0",
    //     500: "#DDDDDD",
    //   },
    // },
    extend: {
      colors: {
        // border: "hsl(var(--border))",
        // input: "hsl(var(--input))",
        scrollbarTrack: '#e1e342',
        scrollbarThumb: '#00a234',
        custom: '#1e2738',
        ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
      backgroundColor: {
        "container": "hsl(var(--container))",
        "gray-primary": "hsl(var(--gray-primary))",
        "gray-secondary": "hsl(var(--gray-secondary))",
        "gray-tertiary": "hsl(var(--gray-tertiary))",
        "left-panel": "hsl(var(--left-panel))",
        "chat-hover": "hsl(var(--chat-hover))",
        "green-primary": "hsl(var(--green-primary))",
        "green-secondary": "hsl(var(--green-secondary))",
        "green-chat": "hsl(var(--green-chat))",
      },
      backgroundImage: {
        "chat-tile-light": "url('/bg-light.png')",
        "chat-tile-dark": "url('/assets/bg-dark.png')",
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
  variants: {
    extend: {
      boxShadow: ["active", "hover"],
      scrollbar: ['rounded'],
    },
  },
  plugins: [require("tailwindcss-animate"),
    function ({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#d5d9fa',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#d5d911',
            borderRadius: '10px',
            border: '2px solid #d5d9fa',
          },
        },
        '.scrollbar-thumb-rounded': {
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
          },
        },
      });
    },
  ],
} satisfies Config;

export default config;
