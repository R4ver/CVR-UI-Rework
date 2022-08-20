module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "cvr-orange": "var(--cvr-orange)",
                "cvr-black": "var(--cvr-black)",
                "cvr-white": "var(--cvr-white)",
                "cvr-dark": "var(--cvr-dark)",
                "cvr-dark-light": "var(--cvr-dark-light)",
                "cvr-green": "var(--cvr-green)",
                "cvr-red": "var(--cvr-red)"
            },
            borderRadius: {
                "4xl": "40px",
                "5xl": "80px"
            },
            width: {
                "cvr-icon-big": "100px",
                "cvr-icon": "90px"
            },
            height: {
                "cvr-icon-big": "100px",
                "cvr-icon": "90px"
            },
            fontSize: {
                CVRNormal: "var(--font-size-nrm)",
                CVRBig: "var(--font-size-big)",
                CVRBigger: "var(--font-size-bigger)",
                CVRBiggest: "var(--font-size-biggest)",
                CVRUI: "var(--font-size-ui)",
                CVRClock: "120px"
            },
            lineHeight: {
                "CVRClock": "70px"
            },
            dropShadow: {
                "CVRClock": "0 0 10px #E43600"
            }
        },
    },
    separator: "__",
    plugins: [],
};
