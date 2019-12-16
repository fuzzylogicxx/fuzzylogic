---
title: My Git Cheatsheet
description: Useful Git commands for my reference and yours
date: "2018-12-01T16:58:08.051Z"
tags: [development, git, cheatsheet]
---
I’ve used Git for many years but it still trips me up. At times I’ve worked primarily in a GUI (like Sourcetree or Fork), and other times directly on the command line. I’ve worked on projects where I’ve been the sole developer and others where I’m part of a large team. Regardless of the tools or context, I’ve learned there are certain _need-to-knows_. Here’s a list of useful Git commands for my reference and yours.
---

Note: the following is not an exhaustive list but rather the Git commands I keep coming back to and/or regularly forget. For deeper explanations, see the list of resources at the foot of the article.

## Configuration

Configure your favourite editor to be used for commit messages:

``` bash
git config --global core.editor "nano"
```

Configure any setting:

``` bash
git config [--global] <key> <value>
```

## Start work on a repo

In Github, find an existing repo (or create a new repo) and grab its URL. Next, `clone` it from the command line:

``` bash
cd mycodedir
git clone https://github.com/fuzzylogicxx/dummy.git optionaldirname
```

Alternatively, you might have begun by working locally before creating the repo in Github:

``` bash
mkdir dummy && cd dummy
echo "# Welcome to DummyRepo" >> README.md
git init
git add README.md
git commit -m "first commit"

# when ready, go to Github and create empty repo.
# then add as a remote
git remote add origin https://github.com/fuzzylogicxx/dummy.git

# push up, passing -u to set the remote branch as the default upstream branch our local branch will track
# this saves typing out ‘origin master’ repeatedly in future.
git push -u origin master
```

## Remotes

Remove a remote from your local settings:

``` bash
git remote rm <name>
```

Rename a remote:

``` bash
git remote rename oldname newname
```

## Staging, unstaging and deleting files

Unstage with `reset` (the opposite of `git add`):

``` bash
# unstage all staged files
git reset .

# unstage individual file/s
git reset filename.txt
```

Delete a physical file and stage the deletion for the next commit:

``` bash
git rm folder/filename.txt
```

## Committing updates

Commit with [a multi-line message](https://thoughtbot.com/blog/5-useful-tips-for-a-better-commit-message):

``` bash
git commit
```

Commit with short message:

``` bash
git commit -m "fix: typo in heading"
```

Stage and commit all changes in a single command (note: doesn’t work with new, untracked files):

``` bash
git commit -am "fix: typo in heading"
```

## Branches

Show all local branches:

``` bash
git branch
```

Show all local _and remote_ branches:

``` bash
git branch -a
```

Save current state to new branch but don’t yet switch to it (useful after committing to wrong branch):

``` bash
git branch newbranchname
```

Create and switch to new branch:

``` bash
git checkout -b mynewbranch
```

Switch to an existing branch:

``` bash
git checkout branchname
```

Save typing by setting the upstream remote branch for your local branch:

``` bash
# git branch -u remotename/branchname
git branch -u fuzzylogic/v3

#  now there’s no need to type origin master
git pull
```

## Staying current and compatible

`fetch` remote branch and `merge` simultaneously:

``` bash
git pull remotename branchname

# common use case is to update our local copy of master
git pull origin master

# shorthand when a default upstream branch has been set
git pull

# an alternative is to update (fetch) which does not auto-merge, then 'reset' to the latest commit on the remote
# https://stackoverflow.com/questions/55731891/effects-of-git-remote-update-origin-prune-on-local-changes
git checkout master
git remote update --prune
git reset --hard origin/master
```

Merge another branch (e.g. master) into current branch:

``` bash
git merge otherbranch

# a common requirement is to merge in master
git merge master
```

### Rebasing

`git rebase` can be used as:
1. an alternative to merge; and
2. a means of tidying up our recent commits.

As an alternative to merge its main pro is that it leads to a more linear therefore easier-to-read history. Note however that it is potentially more disruptive therefore not right for every situation.

Say I’ve been working on a feature branch and I think it’s ready.

I might want to just tidy up my feature branch’s commits and can do this with an “interactive rebase”. This technique allows me to tidy my feature branch work to remove trivial, exploratory and generally less relevant commits so as to keep the commit history clean.

I might also want to bring in `master` to ensure synchronicity and compatibility. `rebase` sets the head of my feature branch to the head of `master` then adds my feature branch’s commits on top.

While it’s a good idea to `rebase` _before_ making a <abbr title="Pull Request">PR</abbr>, <strong>don’t use it after making a PR</strong> because from that point on the branch is _public_ and rebasing a public branch can cause problems for collaborators on the branch.

Rebuild your feature branch’s changes on top of master:

``` bash
git checkout master
git pull origin master
git checkout myfeaturebranch
git rebase master
```

Tidy a feature branch before making a PR:

``` bash
git checkout myfeaturebranch
git rebase -i master

# just tidy the last few (e.g. 3) commits
git rebase -i HEAD~3

# this opens a text editor listing all commits due to be moved, e.g.:
pick 33d5b7a Message for commit #1
pick 9480b3d Message for commit #2
pick 5c67e61 Message for commit #3

# change 'pick' to ‘fixup’ to condense commits, say if #2 was just a small fix to #1
pick 33d5b7a Message for commit #1
fixup 9480b3d Message for commit #2
pick 5c67e61 Message for commit #3
```

For more detail, read [Atlassian’s guide to rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing).

## Reviewing

Show commit history (most recent first; `q` to quit):

``` bash
git log

# compact version
git log --oneline

# limit scope to commits on a branch
git log branchname
```

Check if your feature branch is trailing behind:

``` bash
# show commits in master that are not yet in my feature branch
git log --oneline my-feature..master

# show commits on remote branch that are not yet in my local branch
git log --pretty='format:%h - %an: %s' new-homepage..origin/new-homepage

# show commits by me that included “heroku” and that changed file Gemfile
git log --author=Demaree --grep=heroku --oneline Gemfile
```

Review differences between staged changes and last commit:

``` bash
git diff --cached
```

Review changes between a given version/commit and the latest:

``` bash
git diff 591672e..master
```


## Fixing Things

Undo all the changes in a given commit:

``` bash
git revert 591672e
```

Alter the previous commit (change the message and and/or include further updates):

``` bash
# assuming there are no staged files, this amends the commit message only.
# if files are staged, it combines the staged changes with the previous commit.
git commit --amend
```

Move current branch tip backward to a given commit, reset the staging area to match, but leave the working directory alone

``` bash
git reset 591672e

# additionally reset the working directory to match the given commit
git reset --hard 591672e
```

See what the app/site was like (e.g. whether things worked or were broken) at a given previous commit, noting the following:
- You’re now “detatched”, in that your computer’s HEAD is pointing at a commit rather than a branch.
- You’re expected to merely review, not to make commits. Any commits you make would be “homeless”, since commits are supposed to go in branches. (However you could then branch off.)

``` bash
git checkout 591672e
```

Grab one or more commits from elsewhere and drop into your current branch
``` bash
git cherry-pick 591672e

# grab the last commit from a branch e.g. master
git cherry-pick master
```

## Useful external resources

- [Tips, tutorials and Cheat Sheets from Atlassian](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)
- Need to undo an old commit? Committed to master by mistake? Get out of trouble with [_Oh Shit, Git!_](https://ohshitgit.com/)
- [The original Pro Git reference](https://git-scm.com/book/en/v2)
- [_Git for Humans_](https://abookapart.com/products/git-for-humans) by David Demaree from _A List Apart_ is a great intro to the concepts and basic commands.
