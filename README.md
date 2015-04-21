blingZ
======

blingZ.js ($Z) is a render-agnostic interactive simulation or game engine written using EcmaScript.6 (ES6) with no other external dependencies.

At under 7 Kb (minified version), it provides a lightweight interactive visualization engine with smaller footprints than other visualization libraries like [D3js](http://d3js.org).

The demo contained in `index.html` shows an interactive stochastic dynamics simulation with 3 frictionless, non-interacting particles in a rectangular domain with inelastic boundaries.
The particles are rendered as colored circles.

Clicking on any of the circles will randomly change their 2D velocity vectors by sampling from a uniform distribution on `[-1, 1] x [-1, 1]`.

Modify the `index.html` file to create your own interactive visualizations, simulations, and games with maximal flexibility and minimal overhead.

Load the index.html file locally to test the code in a development environment (requires a local web server such as [live-server](https://github.com/tapio/live-server) to be running).

Compile build.js using `jspm bundle-sfx --minify src/blingz` for running in a production environment.

# References

* [ES6](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)
* [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise)
* [Babel](http://babeljs.io/)
* [JSPM](https://github.com/jspm/jspm-cli)
* [ES6+jspm template](https://github.com/geelen/loopgifs)