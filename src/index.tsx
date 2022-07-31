/* @refresh reload */
import "./index.css";

import { render } from "solid-js/web";

import App from "./App";

/**
 * Patch the render template function.
 * the game UI engine doesn't support the creation of templates
 * example: document.createElement("template");
 * Rewrite to "div"
 */


render( () => <App />, document.getElementById( "root" ) as HTMLElement );
