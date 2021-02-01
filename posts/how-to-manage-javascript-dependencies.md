---
title: How to manage JavaScript dependencies
description: How to manage JavaScript Dependencies
date: "2019-10-23T16:58:08.051Z"
tags: [entry, development, javascript, yarn, npm, nodejs, tooling, howto]
---
Managing JavaScript dependencies is about as much fun as a poke in the eye. However even if—like me—you prefer to keep things [lean](https://leanweb.dev/) and dependency-free as far as possible, it’s something you’re going to need to do either in large work projects or as your personal side-project grows. In this post I tackle it head-on to reduce the problem to some simple concepts and practical techniques.
---

In modern JavaScript applications, we can add tried-and-tested open source libraries and utilities by installing [packages](https://docs.npmjs.com/about-packages-and-modules) from the [NPM registry](https://www.npmjs.com/). This can aid development by letting you concentrate on your application’s _unique features_ rather than reinventing the wheel for already-solved common tasks.

A typical example might be to add [axios](https://www.npmjs.com/package/axios) or [node-fetch](https://www.npmjs.com/package/node-fetch) to a Node.js project to provide a means of making API calls.

We can use a _package manager_ such as [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm) to install packages. When our package manager installs a package it logs it as a project _dependency_ which is to say that the project depends upon its presence to function properly. 

It then follows that anyone who wants to run the application should first install its dependencies. 

And it’s the responsibility of the project owner (you and your team) to manage the project’s dependencies over time. This involves:

- updating packages when they release security patches; 
- maintaining compatibility by staying on package upgrade paths; and
- removing installed packages when they are no longer necessary for your project.

While it’s important to keep your dependencies updated, in a recent survey by Sonatype [52% of developers said they find dependency management painful](https://www.sonatype.com/resources/white-paper-state-of-the-software-supply-chain-2019). And I have to agree that it’s not something I generally relish. However over the years I’ve gotten used to the process and found some things that work for me.

## A simplified process

The whole process might go something like this (using [yarn](https://yarnpkg.com/)).

<figure>
  
``` js
// Start installing and managing 3rd-party packages.
// (only required if your project doesn’t already have a package.json)
yarn  // or npm init

// Install dependencies (in a project which already has a package.json)
// yes, it’s the same yarn command as above.
yarn  // or npm i

// Add a 3rd-party library to your project
yarn add <package…>   // or npm i <package…>

// Add package but specify a particular version or semver range
// https://devhints.io/semver
// It’s often wise to do this to ensure predictable results.
yarn add <package…>@^1.3.1

// Remove a package
// use this rather than manually deleting from package.json 
// because this method updates `yarn.lock` too.
yarn remove <package…>

// Update one package (optionally to a specific version/range)
yarn upgrade <package…>
yarn upgrade <package…>@^1.3.2

// Review (in a nice UI) all packages with pending updates, 
// with the option to upgrade whichever you choose
yarn upgrade-interactive
```

</figure>

## Responding to a security vulnerability in a dependency

If you host your source code on GitHub it’s a great idea to enable [Dependabot](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/). Essentially Dependabot has your back with regard to any dependencies that need updated. You set it to send you automated security updates by email so that you know straight away if a vulnerability has been detected in one of your project dependencies and requires action. 

Helpfully, if you have multiple Github repos and more than one of those include the vulnerable package you also get a round-up email with a message something like “A new security advisory on lodash affects 8 of your repositories” with links to the alert for each repo, letting you manage them all at once.

Dependabot also works for a variety of languages and techologies—not just JavaScript—so for example in a Rails project it might email you to suggest bumping a package in your `Gemfile`.

### Automated upgrades

Sometimes the task is straightforward. The Dependabot alert email tells you about a vulnerability in a package you explicitly installed and the diligent maintainer has already made a patch release available.

A simple `upgrade` to the relevant patch version would do the job, however [Dependabot can even take care of that for you!](https://docs.github.com/en/github/managing-security-vulnerabilities/configuring-dependabot-security-updates) Dependabot can automatically open a new Pull Request which addresses the vulnerability by updating the relevant dependency. It’ll give the PR a title like

> Bump `lodash` from `4.17.11` to `4.17.19`”

You just need to approve and merge that PR. This is great; it’s really simple and takes care of lots of cases.

Note 1: if you work on a corporate repo that is not set up to “automatically open PRs”, often you can still take advantage of Github’s intelligence with just one or two extra manual steps. Just follow the links in your Github security alert email.

Note 2: Dependabot can also be set to do automatic version updates even when your installed version does not have a vulnerability. You can enable this by [adding a `dependabot.yml` to your repo](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/#keep-all-your-dependencies-updated). But so far I’ve tended to avoid unpredictability and excess noise by having it manage security updates only.

### Manual upgrades

Sometimes Dependabot will alert you to an issue but is unable to fix it for you. Bummer.
 
This might be because the package owner has not yet addressed the security issue. If your need to fix the situtation is not super-urgent, you could raise an issue on the package’s Github repo asking the maintainer (nicely) if they’d be willing to address it… or even submit a PR applying the fix for them. If you don’t have the luxury of time, you’ll want to quickly find another package which can do the same job. An example here might be that you look for a new CSS minifier package because your current one has a longstanding security issue. Having identified a replacement you’d then `remove` package A, `add` package B, then update your code which previously used package A to make it work with package B. Hopefully only minimal changes will be required.

Alternatively the package may have a newer version or versions available but Depandabot can’t suggest a fix because:
1. the closest new version’s version number is beyond the allowed range you specified in `package.json` for the package; or 
2. Dependabot can’t be sure that upgrading wouldn’t break your application.

If the package maintainer has released newer versions then you need to decide which to upgrade to. Your first priority is to address the vulnerability, so often you’ll want to minimise upgrade risk by identifying the closest non-vulnerable version. You might then run `yarn upgrade <package…>@1.3.2`. Note also that you may not need to specify a specific version because your `package.json` might already specify a semver range which includes your target version, and all that’s required is for you to run `yarn upgrade` or `yarn upgrade  <package>` so that the specific “locked” version (as specified in `yarn.lock`) gets updated.

On other occasions you’ll read your security advisory email and the affected package will sound completely unfamiliar… likely because it’s not one you explicitly installed but rather a _sub-dependency_. Y’see, your dependencies have their own `package.json` and dependencies, too. It seems almost unfair to have to worry about these too, however sometimes you do. The vulnerability might even appear several times as a sub-dependency in your lock file’s dependency tree. You need to check that lock file (it contains much more detail than `package.json`), work out which of your top-level dependencies are dependent on the sub-dependency, then go check your options.

#### Case Study

Let’s put this into context. A while ago I received the following security notification about a vulnerability affecting a side-project repo.

> dot-prop < 4.2.1 “Prototype pollution vulnerability in dot-prop npm package before versions 4.2.1 and 5.1.1 allows an attacker to add arbitrary properties to JavaScript language constructs such as objects.

I wasn’t familar with `dot-prop` but saw that it’s a library that lets you “Get, set, or delete a property from a nested object using a dot path”. This is not something I explicitly installed but rather a sub-dependency—a lower-level library that my top-level packages (or their dependencies) use.

Github was telling me that it couldn’t automatically raise a fix PR, so I had to fix it manually. Here’s what I did.

1. looked in `package.json` and found no sign of `dot-prop`;
1. started thinking that it must be a sub-dependency of one or more of the packages I had installed, namely `express`, `hbs`, `request` or `nodemon`;
1. looked in `package-lock.json` and via a <kbd>Cmd-F</kbd> search for `dot-prop` I found that it appeared twice;
1. the first occurrence was as a top-level element of `package-lock.json`s top-level `dependencies` object. This object lists _all_ of the project’s dependencies and sub-dependencies in alphabetical order, providing for each the details of the _specific version_ that is actually installed and “locked”; 
1. I noted that the installed version of `dot-prop` was `4.2.0`, which made sense in the context of the Github security message;
1. the other occurrence of `dot-prop` was buried deeper within the dependency tree as a dependency of `configstore`;
1. I was able to work backwards and see that `dot-prop` is required by `configstore` then <kbd>Cmd-F</kbd> search for `configstore` to find that it was required by `update-notifier`, which is turn is required by `nodemon`;
1. I had worked my way up to a top-level dependency `nodemon` (installed version `1.19.2`) and worked out that I would need to update `nodemon` to a version that had resolved the `dot-prop` vulnerability  (if such a version existed); 
1. I then googled “nodemon dot-prop” and found some fairly animated Github issue threads between [Remy](https://twitter.com/remysharp) the maintainer of `nodemon` and some users of the package, culminating in [a fix]((https://github.com/remy/nodemon/issues/1682));
1. I checked [nodemon’s releases](https://github.com/remy/nodemon/releases) and ascertained that my only option if sticking with `nodemon` was to install `v2.0.3`—a new major version. I wouldn’t ideally install a version which might include breaking changes but in this case `nodemon` was just a `devDependency`, not something which should affect other parts of the application, and a developer convenience at that so I went for it safe in the knowledge that I could happily remove this package if necessary;
1. I opened `package.json` and within `devDependencies` manually updated `nodemon` from `^1.19.4` to `^2.0.4`. (If I was in a `yarn` context I’d probably have done this at the command line). I then ran `npm i nodemon` to reinstall the package based on its new version range which would also update the lock file. I was then prompted to run `npm audit fix` which I did, and then I was done;
1. I pushed the change, checked my Github repo’s security section and noted that the alert (and a few others besides) had disappeared. Job’s a goodun!

## A note on lock files

As well as `package.json`, you’re likely to also have `yarn.lock` (or `package.lock` or `package-lock.json`). As described above, while `package.json` can suggest a semver range for a package, the lock file will lock down the specific version to be installed.

You shouldn’t manually change a lock file.

## References
- [Yarn workflow](https://classic.yarnpkg.com/en/docs/yarn-workflow/)
- [Semver cheatsheet](https://devhints.io/semver)
- [Good explanation of the purpose of a lock file](https://www.robertcooper.me/how-yarn-lock-files-work-and-upgrading-dependencies)
