/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xs: { max: "670px" },
        },
    },
    plugins: [require("daisyui")],
};
