const express = require( "express" );
const path = require( "path" );
const cors = require( "cors" );
const fs = require( "fs" );

const { cvrPath } = require( "./package.json" );
const cvrUIPath = path.resolve( cvrPath, "./ChilloutVR_Data/StreamingAssets/Cohtml/UIResources/GameUI" );

const app = express();
const port = 3001;

app.use( cors() );
app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

app.post( "/ping", ( req, res ) => {
    let lastChunks = req.body;
    let hasChanged = false;

    fs.readdir( path.resolve( cvrUIPath, "../GameUI/assets" ), ( err, files ) => {
        hasChanged = lastChunks.chunks.filter( ( e, i ) => e !== files[i] ).length > 0;

        if ( hasChanged ) {
            return res.json( {
                type: "chunks",
                chunks: files,
                refresh: true
            } );
        }

        return res.json( {
            type: "chunks",
            chunks: files,
            refresh: false
        } );
    } );
} );

app.listen( port, () => {
    console.log( `Example app listening on port ${port}` );
} );