import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import eslint from "vite-plugin-eslint";
import fs from "fs";
import path from "path";

let cvrPath = process.env.npm_package_cvrPath;
let cvrUIPath = "";

if ( cvrPath ) {
    cvrUIPath = path.resolve( cvrPath, "./ChilloutVR_Data/StreamingAssets/Cohtml/UIResources/GameUI" );
    let cvrUIOldPath = path.resolve( cvrPath, "./ChilloutVR_Data/StreamingAssets/Cohtml/UIResources/GameUI_old" );
    
    // Need to check if we can even find the default folder.
    if ( !fs.existsSync( cvrUIPath ) ) throw Error( "Cannot find game UI folder!" );
    // If we already have a backup folder we don't need to rename the current GameUI folder
    // @ts-ignore
    if ( !fs.existsSync( cvrUIOldPath ) ) {
        // Backup the old GameUI folder
        fs.renameSync( cvrUIPath, `${cvrUIPath}_old` );
    }
}
    

const htmlPlugin = ( dev: boolean ) => {
    if ( dev ) {
        return {
            name: "html-transform",
            transformIndexHtml( html: string ) {
                html = html.replace(
                    /\{\{root\}\}/g,
                    ""
                );
            

                return html; 
            }
        };
    }

    return {
        name: "html-transform",
        transformIndexHtml( html: string, ctx: any ) {

            var fileName = ctx.path.replace( /\/(.+).html$/, "$1" );

            html = html.replace(
                /(href|src)=".\/(.+)"/g,
                function( a, b, c ){
                    return `${b}="${c}"`;
                }
            );

            html = html.replace(
                /(crossorigin|type="module")/g,
                ""
            );

            const regexString = `.+(${fileName}).+`;
            const regex = new RegExp( regexString, "g" );
            let match = html.match( regex );

            if ( match ) {
                html = html.replace( match[0], "" );

                html = html.replace(
                    /\{\{root\}\}/g,
                    match[0]
                );
            }            

            return html; 
        }
    };
};

function getExtension( filename: string ) {
    const index = filename.lastIndexOf( "." );
    return index < 0 ? "" : filename.substring( index );
}

const solidFix = () => {
    return {
        name: "solid-fix",
        writeBundle( opt: any, bundle: any ) {
            for ( const [fileName] of Object.entries( bundle ) ) {
                const currentFileExtension = getExtension( fileName );
                const extensionsToWatch = [".js"];
                const allExtensions = extensionsToWatch.map( extension => // An extension can be a string or a tuple [extension, options]
                    typeof extension === "string" ? extension : extension[0] );

                if ( !allExtensions.includes( currentFileExtension ) ) {
                    return;
                }

                const filePath = path.resolve( opt.dir, fileName );

                let data = fs.readFileSync( filePath, { encoding:"utf8" } );
                const templateTagRegExp = /([a-zA-Z])=document.createElement\("template"\)/m;
        
                let match = data.match( templateTagRegExp );
                if ( match ) {
                    data = data.replace( match[0], `${match[1]}=document.createElement("div")` );
                    data = data.replace( `${match[1]}.content.firstChild`, `${match[1]}.firstChild` );
                }

                fs.writeFileSync( filePath, data  );
                
            }
        }
    };
};

export default defineConfig( ( { command } ) => {
    if ( command === "build" ) {
        return {
            plugins: [eslint(), solidPlugin(), solidFix(), htmlPlugin( false )],
            base: "",
            build: {
                target: "es2015",
                polyfillModulePreload: false,
                rollupOptions: {
                    input: {
                        quickmenu: "./quickmenu.html"
                    }
                },
                outDir: cvrUIPath,
                emptyOutDir: true
            },
        };
    } else {
        return {
            plugins: [eslint(), solidPlugin()],
            base: "",
            server: {
                port: 3000
            },
        };
    }
} );