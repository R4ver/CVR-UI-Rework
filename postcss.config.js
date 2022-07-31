const tailwindcss = require( "tailwindcss" );
const autoprefixer = require( "autoprefixer" );
const colorToRGBA = require( "./build-scripts/colorsToRGBA" );

module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    plugins: [
        tailwindcss( {} ),
        autoprefixer( {} ),
        colorToRGBA( {} )
    ]
};
