---
title: How to manage JavaScript dependencies
description: How to manage JavaScript Dependencies
date: "2019-10-23T16:58:08.051Z"
tags: [entry, development, javascript, yarn, npm, nodejs, tooling, howto]
draft: true
---
Managing JavaScript dependencies is about as much fun as a poke in the eye. However even if—like me—you prefer to keep things [lean](https://leanweb.dev/) where possible, it’s something you’re going to need to do either in large work projects or as your personal side-project grows. In this post I tackle it head-on to reduce the problem to some simple concepts and practical techniques.
---
In modern JavaScript applications, we can add tried-and-tested open source libraries and utilities by installing [packages](https://docs.npmjs.com/about-packages-and-modules) from the [NPM registry](https://www.npmjs.com/). This can aid development by letting you concentrate on your application’s _unique features_ rather than reinventing the wheel for already-solved common tasks.

A common example might be to add [axios](https://www.npmjs.com/package/axios) or [node-fetch](https://www.npmjs.com/package/node-fetch) to your project to provide a means of making API calls when working in a [Node.js](https://nodejs.org/en/) context.

We can use a _package manager_ such as yarn or npm to install packages. When our package manager installs a package it lists it as a project _dependency_ which is to say that the project depends upon its presence to function properly. It then follows that we advise anyone who wants to run the application to first install its dependencies. And the project owner (you and your team) is responsible for _managing_ its dependencies over time by:

- updating packages when they release security patches; 
- maintaining compatibility by staying on package upgrade paths; and
- removing installed packages when they are no longer necessary for your project.

While it’s important to keep your dependencies updated, in a recent survey by Sonatype [52% of developers said they find dependency management painful](https://www.sonatype.com/resources/white-paper-state-of-the-software-supply-chain-2019). And I have to agree that it’s not something I generally relish. However over the years I’ve gotten used to the process and found some things that work for me, which I’ll note here.

## Simplified process

The whole process might go something like this (using [Yarn](https://yarnpkg.com/)).

<figure>
  
``` js
// Start installing and managing 3rd-party packages.
// (only required if your project doesn’t already have a package.json)
yarn # or npm init

// Install dependencies (in a project which already has a package.json)
// yes, it’s the same yarn command as above.
yarn # or npm i

// Add a 3rd-party library to your project
yarn add <package…> # or npm i <package…>

// Add package but specify a particular version or [semver range](https://devhints.io/semver).
// It’s often wise to do this to ensure predictable results.
yarn add <package…>@^1.3.1

// Remove a package
// use this rather than manually deleting from package.json because this method updates `yarn.lock` too.
yarn remove <package…>

// Update one package (optionally to a specific version/range)
yarn upgrade <package…>
yarn upgrade <package…>@^1.3.2

// Update all packages with pending updates
yarn upgrade-interactive
```

</figure>

## Responding to a security vulnerability in a dependency

If you host your source code on GitHub it’s a great idea to enable [Dependabot](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/). Essentially Dependabot has your back with regard to any dependencies that need updated. You set it to send you automated security updates by email so that you know straight away if a vulnerability has been detected in one of your project dependencies and requires action. 

Helpfully, if you have multiple Github repos and more than one of those include the vulnerable package you also get a round-up email with a message something like “A new security advisory on lodash affects 8 of your repositories” with links to the alert for each repo, letting you manage them all at once.

It’s also worth noting that Dependabot works for a variety of languages and techologies—not just JavaScript—so for example in a Rails project it might email you to suggest bumping a package in your `Gemfile`.

### Automated upgrades

Sometimes the task is straightforward. The vulnerability is in a package you explicitly installed and the owner has already issued a patch release.

A simple `yarn upgrade` to install the patch version would do the job, however [Dependabot can even take care of that for you](https://docs.github.com/en/github/managing-security-vulnerabilities/configuring-dependabot-security-updates)! Dependabot can automatically open a new Pull Request containing an update to the relevant dependency (thus addressing the vulnerability) with a PR title like “Bump `lodash` from `4.17.11` to `4.17.19`”. You just need to approve and merge that PR. This is great, really simple and takes care of lots of cases.

Note 1: if you work on a corporate repo that is not set up to “automatically open PRs”, often you can still take advantage of Github’s intelligence with just one or two extra manual steps. Just follow the links in your Github security alert email.

Note 2: Dependabot can also be set to do automatic version updates even when the versions do not have known vulnerabilities. You can do this by [adding a `dependabot.yml` to your repo](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/#keep-all-your-dependencies-updated). But so far I’ve tended to avoid unpredictability and excess noise by having it manage security updates only.

### Manual upgrades

Sometimes Dependabot can only alert you to an issue but is unable recommend a fix. 
 
This might be because the package owner has not yet addressed the security issue. If you have time to wait, you could raise an issue on the package repo on Github asking the maintainer (nicely) if they’d be willing to address it… or submit a PR applying the fix for them. If you don’t have the luxury of time, you’ll want to quickly find another package which can do the same job. Having identified a replacement you’d then `remove` package A, `add` package B and make any required code updates (hopefully minimal).

Alternatively the package may have a newer version or versions available but Depandabot can’t suggest a fix because:
1. the closest new version number is beyond the allowed range for the package you specified in package.json; or 
2. Dependabot can’t be sure that it wouldn’t break your application.

If the package maintainer has released newer versions then you need to decide which to upgrade to. Your first priority is to address the vulnerability, so often you’ll want to minimise upgrade risk by identifying the closest non-vulnerable version. You might then run `yarn upgrade <package…>@1.3.2`. Note also that you may not need to specify a specific version because your `package.json` might already specify a semver range which includes your target version, and all that’s required is for you to run `yarn upgrade` or `yarn upgrade  <package>` so that the specific “locked” version (as specified in `yarn.lock`) gets updated. (Note: I need to double-check I’m right with that last bit.)

On other occasions you’ll read your security advisory email and the affected package will sound completely unfamiliar… likely because it’s not one you explicitly installed but rather a _sub-dependency_. Y’see, your dependencies have their own `package.json` and dependencies, too. It seems almost unfair to have to worry about these too, however sometimes you do. The vulnerability might even appear several times as a sub-dependency in your lock file’s dependency tree. You need to check that lock file (it contains much more detail than `package.json`), work out which of your top-level dependencies are dependent on the sub-dependency, then go check your options.

#### Case Study

Let’s put this into context. A while ago I received the following security notification about a vulnerability affecting a number of my personal repos.

> dot-prop < 4.2.1 “Prototype pollution vulnerability in dot-prop npm package before versions 4.2.1 and 5.1.1 allows an attacker to add arbitrary properties to JavaScript language constructs such as objects.

I wasn’t familar with `dot-prop` but saw that it’s a library that lets you “Get, set, or delete a property from a nested object using a dot path”. This is not something I explicitly installed but rather a sub-dependency—a lower-level library that my top-level packages (or their dependencies) use.

Github was telling me that it couldn’t automatically raise a fix PR, so I had to fix it manually. Here’s what I did.

- looked in `package.json` and found no sign of `dot-prop`;
- started thinking that it must be a sub-dependency of the packages I had installed, namely `express`, `hbs`, `request` or `nodemon`. 
- looked in `package-lock.json` and via a <kbd>Cmd-F</kbd> search for `dot-prop` I found that it appeared twice;
- the first occurrence was as a top-level element of `package-lock.json`s top-level `dependencies` object. This object lists _all_ of the project’s dependencies and sub-dependencies in alphabetical order, providing for each the details of the _specific version_ that is actually installed and “locked”; 
- I noted that the installed version of `dot-prop` was `4.2.0`, which made sense in the context of the Github security message;
- the other occurrence of `dot-prop` was buried deeper within the dependency tree as a dependency of `configstore`;
- I was able to work backwards and see that `dot-prop` is required by `configstore` then <kbd>Cmd-F</kbd> search for `configstore` to find that it was required by `update-notifier`, which is turn is required by `nodemon`.
- I had worked my way up to a top-level dependency and worked out that `nodemon` (installed version `1.19.2`) would need updated to a version that had resolved this vulnerability  (if such a version existed); 
- I then googled “nodemon dot-prop” and found some fairly animated Github issue threads between [Remy](https://twitter.com/remysharp) the maintainer and some users of the package, culminating in [a fix]((https://github.com/remy/nodemon/issues/1682));
- I checked [nodemon’s releases](https://github.com/remy/nodemon/releases) and ascertained that my only option if sticking with nodemon was to install `v2.0.3`—a new major version. I wouldn’t ideally install a version which might include breaking changes but in this case `nodemon` was just a `devDependency`, not something which should affect other parts of the application, and a developer convenience at that so I went for it safe in the knowledge that I could happily remove this package if necessary. If this was a more important repo and package, I’d have to do plenty of testing;
- I opened `package.json` and within `devDependencies` updated `"nodemon": "^1.19.4"` to `"nodemon": "^2.0.4"` then ran `npm i nodemon` to apply that update. I was prompted to then run `npm audit fix`, but otherwise, I was done.
- I pushed then change, checked my Github repo’s security section and noted that the alert (and a few others besides) had disappeared! Job’s a goodun!

## A note on lock files

As well as `package.json`, you’re likely to also have `yarn.lock` (or `package.lock` or `package-lock.json`). As described above, while `package.json` can suggest a semver range for a package, the lock file will lock down the currently installed version.

You shouldn’t manually change a lock file.

## References
- https://classic.yarnpkg.com/en/docs/yarn-workflow/
- A [good explanation of the purpose of a lock file](https://www.robertcooper.me/how-yarn-lock-files-work-and-upgrading-dependencies)) (it’s to lock down the exact version to be used (rather than a range like package.json)
