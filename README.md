# ChilloutVR UI Rework
This is a project to rewrite ChilloutVR's game UI using SolidJS and TailwindCSS

# Goal
Make development of the UI easy and of course make it beautiful.

# Setup Project
Clone the project and cd into it and run `yarn install`.
**Make sure** to set the `cvrPath` key in your `package.json` to your games default location eg. `C:/steam/steamapps/common/ChilloutVR`.

run `yarn dev` for developing in the browser and `yarn build` to build to the game folder.

if you wanna hot reload from within the game you can spin up a small web server with `yarn watch` and build the UI with `yarn build:dev`.
The UI will then send a request to the server every 2 seconds and check if the chunk hash changed for the files.
**NOTE**: Running `yarn build` while the dev build and web server is running the UI will refresh, but stop checking for changes since the dev flag gets turned off.

# Disclaimer
This UI modification is unofficial and not supported by Alpha Blend Interactive. 
Using this modification might cause issues with performance, security or stability of the game.

# License
Copyright 2022 R4ver (https://github.com/R4ver)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.