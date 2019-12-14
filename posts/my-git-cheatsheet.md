---
title: My Git Cheatsheet 
description: Useful Git commands for my reference and yours
date: "2018-12-01T16:58:08.051Z"
tags: [development, git, cheatsheet]
---
I’ve used Git for many years but it still trips me up. At times I’ve worked primarily in a GUI (like Sourcetree or Fork), and other times directly on the command line. I’ve worked on projects where I’ve been the sole developer and others where I’m part of a large team. Regardless of the context, I’ve found there are certain need-to-knows. Here’s a list of useful Git commands for my reference and yours.
---

The following is not an exhaustive list but rather the Git commands I keep coming back to and/or regularly forget. (However, a list of excellent, more comprehensive external resources follows at the foot of the article).

## The List

Configure your favourite editor to be used for commit messages:

``` bash
git config --global core.editor "nano"
```

And the pattern for general config setting:
``` shell
git config [--global] <key> <value>
```

## Useful external resources

- [Tips, tutorials and Cheat Sheets from Atlassian](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)
- [Need to undo an old commit? Committed to master by mistake? Get out of trouble with _Oh Shit, Git!_](https://ohshitgit.com/)
- [The original Pro Git reference](https://git-scm.com/book/en/v2)
- [_Git for Humans_ by David Demaree from _A List Apart_ is a great intro to the concepts and basic commands](https://abookapart.com/products/git-for-humans)
