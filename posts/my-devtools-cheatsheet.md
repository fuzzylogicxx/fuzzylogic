---
title: My DevTools Cheatsheet
description: Useful Browser DevTools tips, tricks and keyboard shortcuts for my
  reference and yours
date: 2020-12-13T12:25:28.545Z
mainImage.isAnchor: false
tags:
  - browsers
  - devtools
  - inspector
  - shortcuts
  - development
  - tool
  - cheatsheet
---
Here’s a (work in progress) list of useful (Mac) Browser DevTools tips, tricks and keyboard shortcuts for my reference and yours. This is a work in progress and I’ll update it as I go.
---

## Console Panel

### Return currently selected element to work with

<kbd>$0</kbd>

Then you can execute its methods or inspect its attribute values, for example: 

<kbd>$0.offsetParent</kbd>

### Debug event-based behaviour

In Chrome, right-click on the relevant element (e.g. a button) and select “Inspect Element”. By default, the Styles panel is selected but instead select the _Event Listeners_ panel. In there you can see all events (e.g. _click_) currently being listened for on that element (and its parent elements so as to include instances of _event delegation_).

Each event can be expanded to show which element has the event listener attached – for example it might be the current element or might be `document`. From here you can get to the script containing the code. Click a line number within the code to add a breakpoint. This will pause code execution on that line until you click the play button to continue. You might also log the current value of a variable here.

## Pause JavaScript execution

<kbd>Cmd + backslash</kbd>

## Firefox

### Get responsive `img` element’s `currentSrc`

Inspect the element, right click and select Show DOM Properties from the context menu.

## Google Chrome

### Open the Command Menu

<kbd>Command+Shift+P</kbd>

### Disable JavaScript

Open the Command Menu then type “disable” and you’ll see the option.

### Get responsive `img` element’s `currentSrc`

Inspect the element, click the properties tab, toggle open the top item.

### Throttle network/bandwidth

Go to tab _Network_ then change _Throttling_ to your desired setting, for example “Slow 3G”, or “offline”.

## References

- [How to view and edit JavaScript in your browser's developer tools](https://gomakethings.com/how-to-view-and-edit-javascript-in-your-browsers-developer-tools/)
