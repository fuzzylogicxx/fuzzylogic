---
title: My VS Code Cheatsheet
description: Useful VS Code tips and tricks for my reference and yours
date: "2020-02-24T09:58:08.051Z"
tags: [development, editor, cheatsheet, vscode, tool, emmet, autocomplete]
---
Here’s a list of useful (Mac-based) VS Code tips for my reference and yours.
---

## Use the Command Palette

<kbd>Command-Shift-P</kbd>

Then type your search term, for example “settings”.

## Settings

My preferences (in `settings.json` or via Preferences→Settings):

<figure>
  
``` json
{
    "workbench.editor.showTabs": true,
    "editor.formatOnSave": true,
    "explorer.confirmDragAndDrop": false,
    "editor.minimap.enabled": false,
    "extensions.ignoreRecommendations": false,
    "explorer.compactFolders": false,
    "explorer.autoReveal": false,
    "editor.accessibilitySupport": "off",
    "ruby.codeCompletion": "rcodetools",
    "emmet.includeLanguages": {
        "nunjucks": "html",
        "erb": "html"
    },
    "emmet.triggerExpansionOnTab": true
}
```
  
Note: the Emmet ones are _really_ useful for code autocompletion.
  
</figure>

## Open current terminal directory in VS Code

<figure>
  
```bash
code .
```

</figure>

## Toggle Terminal

<kbd>Ctrl-`</kbd>

## Toggle sidebar visibility

<kbd>Command-B</kbd>

## Edit multiple rows simultaneously

Select one instance of the text that appears in multiple locations. Use <kbd>Command-D</kbd> to select all, then edit.

## Open file to side (for side-by-side editing)

<kbd>Option–click</kbd> on a file in the Explorer.
