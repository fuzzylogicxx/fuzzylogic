---
date: 2017-01-19
title: The best way to Install Node.js and NPM on a Mac
description: I’ve found that although the NodeJs website includes an installer, using Homebrew is a better way to install Node and NPM on a Mac.
tags: [web, development, node, nodejs, npm, homebrew, brew]
---
In modern front-end development, we tend to use a number of JavaScript-based build tools (such as task runners like Gulp) which have been created using Node.js and which we install using NPM. Here’s the best way I’ve found for installing and maintaining Node and NPM on a Mac.
---

To install and use NPM packages, we first need to install Node.js and NPM on our computer (in my case a Mac).

I’ve found that although the [Node.js website](https://nodejs.org/en/) includes an installer, using [Homebrew](https://brew.sh/) is a better way to install Node and NPM on a Mac. Choosing the Homebrew route means you don’t have to install using `sudo` (or non-sudo but with complicated workarounds) which is great because it presents less risk of things going wrong later down the line. It also means you don’t need to mess around with your system `$PATH`.

Most importantly, it makes removing or updating Node really easy.

## Installation

The whole process (after you have XCode and Homebrew installed) should only take you a few minutes.

Just open your Terminal app and type `brew install node`.

## Updating Node and NPM

First, check whether or not Homebrew has the latest version of the Node package. In your Terminal type `brew update`.

Then, to Upgrade Node type: `brew upgrade node`.

## Uninstalling Node and NPM

Uninstalling is as easy as running `brew uninstall node`.

## Credits

This post was based on information from an [excellent article on Treehouse](https://blog.teamtreehouse.com/install-node-js-npm-mac).
