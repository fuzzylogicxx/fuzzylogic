---
title: JavaScript organisation with ES6 modules
description: JavaScript organisation with ES6 modules
date: 2019-12-05T21:45:00.000Z
mainImage.isAnchor: false
draft: true
---
ES6 Modules work in all modern browsers (but not IE) and let us _split up_ our client-side JavaScript code into separate files making it, well, _modular_. This helps us make large or complex applications more maintainable, robust and scalable. We can include a script which imports modules in our HTML by using `<script type="module">`. This, however, is where things get complicated, with many factors to consider and competing suggestions for best practice.

## Competing philosophies/options

- Use ES6 modules and stop using module bundlers like Webpack (https://formidable.com/blog/2019/no-build-step/)
- Use ES6 modules in combination with a bundler because of the benefits bundlers bring vis-a-vis performance and outputting code for old browsers. Include your built output using a standard `<script>` rather than `<script type="module">`.
- Use `<script type="module">` and `<script nomodule="true"> in combination. Take advantage of the fact that `type="module"` support also means modern JS support to safely include only modern code for modern browsers (`async/await` etc), and avoid shipping the weight of workarounds and polyfills to browsers that don’t need it. Use `<script nomodule="true">` for fallback code. One or other script will be used but not both.
- Set up a bundler to output both sets of code in the above.

- If you’re Heydon Pickering, list 
Put polyfills and fallback code if necessary 
don’t ship `<script type="module">` to production due to issues of performance and 

- Develop with ES6 modules. Maybe even _develop_ with `<script type="module">`. But 
don’t ship `<script type="module">` to production due to issues of performance and 



It’s fairly straightforward to use the `export` and `import` syntax however 
presents some practical considerations and leads to some interesting thoughts.

## Performance

Every `include` has an impact of performance – not just the 




## Background

When working on small websites you may have minimal client-side JavaScript and organising it might not feel too important. Your JS might be limited to a single script, free from third-party dependencies, unburdened by issues of scope and you might be the sole developer so not thinking too hard about working to scale.

Another reason why you might not , in the past we didn’t have any well-defined methods of working with client-side JavaScript in a modular fashion. We included small libraries (for example jQuery) by adding a `script` element pointing to the remote library or even by downloading it into our application. We didn’t have a means of including one file within another or defining a dependency so had to rely on i) including dependencies in our HTML; and ii) the _order_ of scripts being correct.

With larger applications you’ll likely have more pages, more components and more JavaScript. You’ll likely be using some libraries (perhaps DayJS for dates, or even a framework such as Stimulus or Vue). You’ll be keen to ensure good performance by combining and minifying your JavaScript, making it cacheable and also having a method of cache busting (for example using hashes appended to filenames).

There’ll likely be more people on your team, and so it’ll be more important to keep your JavaScript files concise, readable, maintainable, cohesive and testable.

In years gone by there weren’t any defined ways for working with JavaScript in a modular fashion. We included small libraries by adding a `script` element pointing to the remote library or by downloading it into our application. We didn’t have a means of including one file within another so had to rely on the order of inclusion in our HTML. 

Problems with my Gulp set-up:

- We don’t want one big source file. 
- We don’t want to only split up JS as files in a folder that get bundled in an arbitrary order (or by crude filename alphabetical order) like my Gulp script did. Dependencies should be explicit.
- When adding third party scripts we don’t want to have to do it awkwardly like make a separate http request for a remote script, or cut and paste the code into our own local file etc, and we need it to be sure it’s included before where it needs used 
- while also making our intentions with regard to dependencies more explicit and less brittle
- We need to avoid scope issues
- We don’t want to include a full third party library if we only need a couple of functions

ES6 modules let us split up code appropriately, allowing files to make certain key functions (etc) exportable, so they can be imported elsewhere. 
So a.js can import functions from b.js. 

They use the import and export syntax. 

(Aside: node support:
Note that import and export are not supported in node.js which is why we use require (not an ecmascript thing) instead)

Browser support for Include and export:
- Good but no IE11

Although the syntax is widely supported,  that doesn’t mean the effect will just work without the browser being told what to expect. if you want to use a script which uses  'include' you can either:
- Place a <script type=module> in your HTML
- Or avoid that by bundling (combine the including file and the stuff it includes) everything into a single file so there’s no longer any include statements therefore it no longer needs to be type=module. Then include that as a normal script on your HTML page. 

Benefits of bundlers
- Remove need for <script type=module> by putting everything into one file
- Output as commonJS to work in old browsers
- Make it aware of node_modules as a context
- Bundlers do dead-code elimination. (You can remove the need for that by keeping your modules fine-grained rather than having multiple exports per module)


What about writing JavaScript across multiple files and shipping it to production without any build step?
- Heydon suggestion: … 



.mjs vs .js extension
- discussed on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

https://medium.com/@david.gilbertson/es6-modules-in-the-browser-are-they-ready-yet-715ca2c94d09
“here’s the things that you’ll give up:
* Minified output
* Super-modern JavaScript
* Non-JavaScript syntax (React, TypeScript, etc.)
* npm modules
* Caching


