/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#4ca99d",
                "primary-dark": "#3d8a80",
                "accent-pink": "#fce7e9",
                "accent-sage": "#8da399",
                "background-cream": "#F4E2BB",
                "background-light": "#fdfbf7",
                "background-dark": "#151d1c",
                "dark-green": "#1e3932",
                "soft-pink": "#FADADD",
                "bordeaux": "#A54F5E",
            },
            fontFamily: {
                display: ["Plus Jakarta Sans", "sans-serif"],
                sans: ["Plus Jakarta Sans", "sans-serif"],
            },
            animation: {
                "slide-up": "slideUp 0.3s ease-out forwards",
                "fade-in": "fadeIn 0.3s ease-out forwards",
                "scale-up": "scaleUp 0.3s ease-out forwards",
            },
            keyframes: {
                slideUp: {
                    "0%": { transform: "translateY(100%)" },
                    "100%": { transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                scaleUp: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
}
