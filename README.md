# ![vizflow](thumbnail.png) vizflow

[vizflow.js](https://github.com/gameprez/vizflow.js) - an application-agnostic interactive visualization engine written using EcmaScript.6 (ES6) with no other external dependencies. The compiled/minified size is under 8 kilobytes, providing a lighter-weight library for adding transition effects to HTML5 documents compared to [D3js](http://d3js.org). 

Instead of focusing on specific applications such as data visualization, it only provides an engine for running animations, transition effects, simulations, games, etc., depending on the application. 

Vizflow uses the symbol `$Z` (read as "bling Z" or "dollar Z") for defining its namespace.

This is a work in progress. Keeping the library simple-to-use, small, and efficient in terms of performance are the main goals of this project. Feedback wanted.

<!---
For example, when using `d3` we might want to visualize one dataset representing intervals  as lines and another representing points as circles, and then have them both fade-in. 

Using `d3`, this would normally lead to code snippets like:

```javascript
d3.selectAll('.blue_circle')
  .data(myData1)
  .enter()
  .append('circle')
  .attr('class', 'blue_circle')
  .style('opacity', 0)
  .attr('cx', function (d) { d.x })
  .attr('cy', function (d) { d.y })
  .attr('r', function (d) { d.r })
  .transition()
  .duration(1000)
  .ease('linear')
  .style('opacity', 1);

d3.selectAll('.red_circle')
  .data(myData2)
  .enter()
  .append('class', 'red_circle')
  .append('path')
  .style('opacity', 0)
  .attr('d', function (d) { d3.svg.line(d) })
  .transition()
  .duration(1000)
  .ease('linear')
  .style('opacity', 1);
```

which works, but has some repeated code arising from both the chaining syntax for defining transitions and also the presence of slight variations in the processing (e.g. lines vs. circles).

$Z uses higher-order functions to define the transitions instead of chaining for cleaner and more reusable code. The same example as above could be implemented as:

```javascript
$Z.fadeIn = $Z.transition({duration: 1000, ease: 'linear'}) ;
$Z.hide   = $Z.style({opacity: 0}) ;
$Z.circIn = $Z.chain($Z.hide, $Z.attr({cx: 'x', cy: 'y', r: 'r', class: 'blue_circle'})) ;
$Z.lineIn = $Z.chain($Z.hide, $Z.attr({d: $Z.svg.line, class: 'blue_circle'})) ;

$Z.addItem(myData1, 'circle', $Z.circIn)
  .addItem(myData2, 'path', $Z.lineIn) ;
```

which removes some of the repetitive boilerplate present in `d3`.
--> 

# Example

The file `index.html` included in this repository contains a demo showing an interactive stochastic dynamics simulation with three particles in a rectangular domain rendered as colored circles using either Canvas or SVG.

Clicking on a circle will randomly change its 2D `(x, y)` position and radius by sampling from am appropriate uniform distributions for each of these variables.

Modify the `index.html` file to create your own interactive visualizations, simulations, and games with maximal flexibility and minimal overhead.

Load the index.html file locally to test the code in a development environment (requires a local web server such as [live-server](https://github.com/tapio/live-server) to be running).

Compile build.js using `jspm bundle-sfx --minify src/vizflow` for running in a production environment.
For a demo showing the compiled version, see this [gist](https://gist.github.com/dannyko/ca8cc0fc1df5d7282cb5).

# References

* [ES6](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts)
* [Promise](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise)
* [Babel](http://babeljs.io/)
* [JSPM](https://github.com/jspm/jspm-cli)
* [ES6+jspm template](https://github.com/geelen/loopgifs)
* [2D Picking in Canvas](https://bocoup.com/weblog/2d-picking-in-canvas/)