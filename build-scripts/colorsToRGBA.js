const valueParser = require( "postcss-value-parser" );

const hexRegExp = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
const rgbRegExp = /rgb\((\d{1,3}),?\s?(\d{1,3}),?\s?(\d{1,3}),?\s?\/?\s?(.+)\)/;

const hasHex = ( e ) => hexRegExp.test( e );
const hasRGB = ( e ) => rgbRegExp.test( e );

const isHex = ( node ) =>
    node.type === "word" && hexRegExp.test( node.value );

const alphaDecimalPrecision = 100000;
const hexa2rgba = ( node ) => {
    // hex is the node value
    let hex = node.value;

    hex = hex.slice( 1 );

    if ( hex.length === 3 ) {
        hex = hex.split( "" ).map( function ( hex ) {
            return hex + hex;
        } ).join( "" );
    }

    // conditionally expand a hex
    const hex8 = `0x${hex.length === 5 ? hex.replace( /[0-9A-f]/g, "$&$&" ) : hex}`;

    // extract the red, blue, green, and alpha values from the hex
    let [r, g, b, a] = [
        parseInt( hex8.slice( 2, 4 ), 16 ),
        parseInt( hex8.slice( 4, 6 ), 16 ),
        parseInt( hex8.slice( 6, 8 ), 16 ),
        Math.round(
            ( parseInt( hex8.slice( 8, 10 ), 16 ) / 255 ) * alphaDecimalPrecision
        ) / alphaDecimalPrecision,
    ];

    node.value = `rgba(${r},${g},${b},${!a ? 1 : a})`;
};
module.exports = function() {

    return {
        postcssPlugin: "PLUGIN NAME",
        Declaration: ( e ) => {
            // const match = e.value.match( /var\(.+\)/ );
            // if ( match ) console.log( match[0] );
            const { value: originalValue } = e;
            
            const parser = valueParser( originalValue );
            let modifiedValue = e.value;

            if ( hasHex( e.value ) ) {
                parser.walk( node => {
                    if ( isHex( node ) ) {
                        hexa2rgba( node );
                    }
                } );

                modifiedValue = parser.toString();
            }

            if ( hasRGB( e.value ) ) {
                let match = e.value.match( rgbRegExp );
                if ( match ) {
                    let [, r, g, b, a] = match;

                    modifiedValue = `rgba(${r},${g},${b},${!a ? 1 : a})`;
                }
            }

            if ( modifiedValue !== originalValue ) {
                e.value = modifiedValue;
            }
        }
    };
};