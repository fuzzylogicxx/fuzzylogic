---
title: My Screen Reader Cheatsheet
description: Useful Screen Reader tips and tricks (VoiceOver and more) for my reference and yours
date: "2020-12-02T15:58:08.051Z"
tags: [entry, development, cheatsheet, a11y, tool, voiceover]
---
Here’s a list of useful Screen Reader commands and tips for my reference and yours. This is a work in progress and I’ll update it as I go.
---

## VoiceOver (Mac)

### Initial setup:

1. Open Safari > Preferences > Advanced; then 
1. check the checkbox “Press tab to highlight each item on a webpage”.

### Usage

- Open the page you want to test in your web browser (you might favour Safari for VoiceOver).
- <kbd>Cmd-F5</kbd> to turn VoiceOver on.
- <kbd>Cmd-F5</kbd> (again) to turn VoiceOver off.

Get <kbd>Cmd-F5</kbd> for “toggling on and off” into your muscle memory!

Then:

- <kbd>Ctrl-Option-A</kbd> to have VoiceOver read the entire page.
- <kbd>Ctrl</kbd> to pause VoiceOver, and <kbd>Ctrl</kbd> again to resume.
- Find any unexpected issues by
  - Tab through items on the page using the tab key. This will move to the next focusable item (button, link, input). You can verify all interactive elements have a focus style, all interactive elements are reachable by keyboard, all off-screen or hidden elements don’t get focused when they shouldn’t and that the spoken label for each interactive element has sufficient context to understand it (“click here” and “menu” isn’t sufficient). 
  - navigate through all the content using <kbd>Ctrl-Option-→</kbd>. While this is not how most screen reader users will read the page, it doesn’t take long and lets you confirm that everything VoiceOver announces makes sense.

#### Quickly jump to specific page elements

- <kbd>Ctrl-Option-U</kbd> to open Rotor
- Browse categories using left and right arrows. This includes the _Landmarks_ menu.
- Down arrow to browse within the categories
- press Return to select an item

### Tables
- Navigate to a table using <kbd>Ctrl-Option-Cmd-T<kbd>
- It should read a caption and give you info about the size of the table
- <kbd>Ctrl-Cmd-{arrowkey}</kbd> to navigate inside the table.

### References

- [Ethan Marcotte’s Introduction to Screen Readers Using VoiceOver](https://thegymnasium.com/take5/introduction-to-screen-readers-using-voiceover)
- [Mac VoiceOver testing the simple way](https://cloudfour.com/thinks/mac-voiceover-testing-the-simple-way/)(https://cloudfour.com/thinks/mac-voiceover-testing-the-simple-way/) on Cloud Four’s blog
- [Data Tables on Inclusive Components](https://inclusive-components.design/data-tables/)
