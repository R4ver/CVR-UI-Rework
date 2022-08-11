const tailwindcss = require( "tailwindcss" );
const colorToRGBA = require( "./build-scripts/colorsToRGBA" );

module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    plugins: [
        tailwindcss( {} ),
        colorToRGBA( {} )
    ]
};
