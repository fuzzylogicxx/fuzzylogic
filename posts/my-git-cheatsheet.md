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

<figure>
  
``` bash
git config --global core.editor "nano"
```

</figure>

Use `git st` as a shortcut for `git status` (to stop me mistyping as “statsu”):

<figure>
  
``` bash
git config --global alias.st status
```

Configure any setting:

<figure>
  
``` bash
git config [--global] <key> <value>
```

</figure>
  
## Start work on a repo

In Github, create a new repo or find an existing repo and grab its URL. Next, `clone` it from the command line:

<figure>
  
``` bash
cd projects
git clone https://github.com/fuzzylogicxx/myproject.git optionaldirname
```

</figure>
  
This will set up that Github repo as your default `remote`. By default your changes would be contributed/pushed to that repo. However if you’re just looking to use it as a starting point for your own, separate project, then you should remove its git history and tracking and start your own.

<figure>
  
``` bash
rm -rf .git
git init
```

</figure>
  
Alternatively, you might have begun by working locally before creating the repo in Github:

<figure>  

``` bash
mkdir myproject && cd myproject
echo "# Welcome to My Project Repo" >> README.md
git init
git add README.md
git commit -m "first commit"

# when ready, go to Github and create empty repo.
# then add as a remote
git remote add origin https://github.com/fuzzylogicxx/myproject.git

# push up, passing -u to set the remote branch as the default upstream branch our local branch will track
# this saves typing out ‘origin master’ repeatedly in future.
git push -u origin master
```

</figure>
  
## Remotes

Remove a remote from your local settings:

<figure>
  
``` bash
git remote rm <name>
```

</figure>
  
Rename a remote:

<figure>
  
``` bash
git remote rename oldname newname
```

</figure>
  
## Staging, unstaging and deleting files

<figure>
  
``` bash
# stage all unstaged files
git add .

# stage individual file/s
git add filename.txt
```

</figure>
  
Unstage with `reset` (the opposite of `git add`):

<figure>
  
``` bash
# unstage all staged files
git reset .

# unstage individual file/s
git reset filename.txt
```

</figure>
  
Delete a physical file and stage the deletion for the next commit:

<figure>
  
``` bash
git rm folder/filename.txt
```

</figure>
  
## Committing updates

Commit with [a multi-line message](https://thoughtbot.com/blog/5-useful-tips-for-a-better-commit-message):

<figure>
  
``` bash
git commit
```

</figure>
  
Commit with short message:

<figure>
  
``` bash
git commit -m "fix: typo in heading"
```

</figure>
  
Stage and commit all changes in a single command (note: doesn’t work with new, untracked files):

<figure>
  
``` bash
git commit -am "fix: typo in heading"
```

</figure>
  
## Branches

Show all local branches:

<figure>
  
``` bash
git branch
```

</figure>
  
Show all local _and remote_ branches:

<figure>
  
``` bash
git branch -a
```

</figure>
  
Save current state to new branch but don’t yet switch to it (useful after committing to wrong branch):

<figure>
  
``` bash
git branch newbranchname
```

</figure>
  
Create and switch to new branch:

<figure>
  
``` bash
git checkout -b mynewbranch
```

</figure>
  
Switch to an existing branch:

<figure>
  
``` bash
git checkout branchname
```

</figure>
  
Save typing by setting the upstream remote branch for your local branch:

<figure>
  
``` bash
# git branch -u remotename/branchname
git branch -u fuzzylogic/v3

#  now there’s no need to type origin master
git pull
```

</figure>
  
## Staying current and compatible


  
`fetch` remote branch and `merge` simultaneously:

<figure>
  
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

</figure>

Merge another branch (e.g. master) into current branch:

<figure>
  
``` bash
git merge otherbranch

# a common requirement is to merge in master
git merge master
```

</figure>
  
### Rebasing

`git rebase` can be used as:
1. an alternative to merge; and
2. a means of tidying up our recent commits.

As an alternative to merge its main pro is that it leads to a more linear therefore easier-to-read history. Note however that it is potentially more disruptive therefore not right for every situation.

Say I’ve been working on a feature branch and I think it’s ready.

I might want to just tidy up my feature branch’s commits and can do this with an “interactive rebase”. This technique allows me to tidy my feature branch work to remove trivial, exploratory and generally less relevant commits so as to keep the commit history clean.

I might also want to bring in `master` to ensure synchronicity and compatibility. `rebase` sets the head of my feature branch to the head of `master` then adds my feature branch’s commits on top.

While it’s a good idea to `rebase` _before_ making a <abbr title="Pull Request">PR</abbr>, <strong>don’t use it after making a PR</strong> because from that point on the branch is _public_ and rebasing a public branch can cause problems for collaborators on the branch. (The only exception to the previous rule is if you’re likely to be the only person working on the PR branch)

Rebuild your feature branch’s changes on top of master:

<figure>
  
``` bash
git checkout master
git pull origin master
git checkout myfeaturebranch
git rebase master
```

</figure>
  
Force push your rebased branch (again, only when you’re unlikely to have/require collaborators on the PR):

<figure>
  
``` bash
git push --force origin myfeaturebranch
```

</figure>
  
Tidy a feature branch before making a PR:

<figure>
  
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

</figure>
  
Undo a rebase:

<figure>
  
``` bash
git reset --hard ORIG_HEAD
```

</figure>
  
For more detail, read [Atlassian’s guide to rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing).

## Reviewing

Show commit history (most recent first; `q` to quit):

<figure>
  
``` bash
git log

# compact version
git log --oneline

# limit scope to commits on a branch
git log branchname
```

</figure>
  
Check if your feature branch is trailing behind:

<figure>
  
``` bash
# show commits in master that are not yet in my feature branch
git log --oneline my-feature..master

# show commits on remote branch that are not yet in my local branch
git log --pretty='format:%h - %an: %s' new-homepage..origin/new-homepage

# show commits by me that included “heroku” and that changed file Gemfile
git log --author=Demaree --grep=heroku --oneline Gemfile
```

</figure>
  
Review differences between staged changes and last commit:

<figure>
  
``` bash
git diff --cached
```

</figure>
  
Review changes between a given version/commit and the latest:

<figure>
  
``` bash
git diff 591672e..master
```

</figure>

## Fixing Things

Undo all the changes in a given commit:

<figure>
  
``` bash
git revert 591672e
```

</figure>
  
Alter the previous commit (change the message and/or include further updates):

<figure>
  
``` bash
# we are amending the previous commit rather than creating a new commit.
# if file changes are staged, it amends previous commit to include those.
# if there are no staged changes, it lets us amend the previous commit’s message only.
git commit --amend
```

</figure>
  
Move current branch tip backward to a given commit, reset the staging area to match, but leave the working directory alone:

<figure>
  
``` bash
git reset 591672e

# additionally reset the working directory to match the given commit
git reset --hard 591672e
```

</figure>
  
See what the app/site was like (e.g. whether things worked or were broken) at a given previous commit, noting the following:
- You’re now “detatched”, in that your computer’s HEAD is pointing at a commit rather than a branch.
- You’re expected to merely review, not to make commits. Any commits you make would be “homeless”, since commits are supposed to go in branches. (However you could then branch off.)

<figure>
  
``` bash
git checkout 591672e
```

</figure>
  
Grab one or more commits from elsewhere and drop into your current branch:

<figure>
  
``` bash
git cherry-pick 591672e

# grab the last commit from a branch e.g. master
git cherry-pick master
```

</figure>
  
Fix a pull that went wrong / shouldn’t have been done:

<figure>
  
``` bash
git pull origin branchname
# whoops!

git reflog
# shows a list of every thing you've
# done in git, across all branches!
# each one has an index HEAD@{index}
# find the one before you broke everything

git reset HEAD@{index}
# magic time machine
```

</figure>

## Useful external resources

- [Tips, tutorials and Cheat Sheets from Atlassian](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)
- Need to undo an old commit? Committed to master by mistake? Get out of trouble with [_Oh Shit, Git!_](https://ohshitgit.com/)
- More getting out of trouble: [Git Flight Rules](https://github.com/k88hudson/git-flight-rules)
- [The original Pro Git reference](https://git-scm.com/book/en/v2)
- [_Git for Humans_](https://abookapart.com/products/git-for-humans) by David Demaree from _A List Apart_ is a great intro to the concepts and basic commands.
