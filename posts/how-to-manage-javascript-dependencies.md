---
title: How to manage JavaScript dependencies
description: How to manage JavaScript Dependencies
date: "2019-10-23T16:58:08.051Z"
tags: [entry. development, javascript, yarn]
draft: true
---
In modern JavaScript applications, we can add tried-and-tested open source libraries and utilities by installing [packages](https://docs.npmjs.com/about-packages-and-modules) from the [NPM registry](https://www.npmjs.com/). This can be helpful by letting you concentrate on your application’s _unique features_ rather than reinventing the wheel for already-solved common tasks.

We can use a _package manager_ such as yarn or npm to install packages. When our package manager installs a package it lists it as a project _dependency_ which is to say that the project depends upon its presence to function properly. Anyone attempting to run the project should first install its dependencies. And the project owner is responsible for _managing_ its dependencies over time by updating packages to get security updates and stay on the upgrade path, and removing installed packages when they are no longer necessary.

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

## Common maintenance scenarios

### Responding to a security vulnerability in a dependency

If you host your source code on GitHub it’s a good idea to enable [Dependabot](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/). Essentially Dependabot has your back with regard to any dependencies that need updated. You set it to send you automated security updates by email so that you know straight away if a vulnerability has been detected in one of your project dependencies and requires action. 

Helpfully, if you have multiple Github repos and more than one of those include the vulnerable package you also get a round-up email with a message something like “A new security advisory on lodash affects 8 of your repositories” with links to the alert for each repo, letting you manage them all at once.

It’s also worth noting that Dependabot works for a variety of languages and techologies—not just JavaScript—so for example in a Rails project it might email you to suggest bumping a package in your `Gemfile`.

#### Automated upgrades

Sometimes the task is straightforward. The vulnerability is in a package you explicitly installed and the owner has already issued a patch release.

A simple `yarn upgrade` to install the patch version would do the job, however Dependabot can even take care of that for you! Dependabot can automatically open a new Pull Request containing an update to the relevant dependency (thus addressing the vulnerability) with a PR title like “Bump `lodash` from `4.17.11` to `4.17.19`”. You just need to approve and merge that PR. This is great, really simple and takes care of lots of cases.

Note: even if you work on a corporate repo that is not set up to “automatically open PRs” you can still often take advantage of Github’s intelligence with just one or two extra manual steps by following links included in your Github security alert email.

#### Manual upgrades

Other times Dependabot can’t suggest an automated upgrade. 
 
This might be because the package owner has not addressed the security issue. In this case you might feel you need to take matters into your own hands and find another package which can do the same job. Having identified a replacement you’d then `remove` package A, `add` package B and make any required code updates (hopefully minimal).

Alternatively this might be because there’s a newer version (or versions) available but:
1. its number is beyond the allowed range for it specified in your package.json settings; or 
2. for some reason Dependabot can’t be sure that it wouldn’t break your application.

If the package maintainer has released newer versions then you need to decide which to upgrade to. Your first priority is to address the vulnerability, so often you’ll want to minimise upgrade risk by just going for the closest non-vulnerable version. So you might run `yarn upgrade <package…>@1.3.2`. Note also that you may not require specifying a specific version because `package.json` might already specify a semver range which includes your target version, and all that’s required is for you to run `yarn upgrade` or `yarn upgrade  <package>` so that the specific “locked” version (as specified in `yarn.lock`) gets updated. (Note: I need to double-check I’m right with that last bit.)

On other occasions you’ll read your security advisory email and the affected package will sound unfamiliar… and that’s because it’s not one you explicitly installed but rather a _sub-dependency_. Y’see, your dependencies have their own `package.json` (that’s what defines something as a package) and own dependencies, too. 

- your package A which depends on vulnerable package B hasn’t yet released an update which bumps its package B dependency to package’s B patch update


Even more confusingly, it might be in a package which appears several times in your lock file’s dependency tree.

It can also be set to do automatic version updates even when the versions do not have known vulnerabilities, but I’ve tended to just stick with security updates.
If you have multiple Github repos and multiple use the vulnerable dependency you also get a round-up email for all affected repos “A new security advisory on lodash affects 8 of your repositories” with links to the alert for each repo.


- Maintaining
    - Security vulnerabilities
        - Manual
            - Sometimes dependabot cannot automatically suggest a fix for you
                - Not sure why, but perhaps because:
                    - your package A which depends on vulnerable package B hasn’t yet released an update which bumps its package B dependency to package’s B patch update
                    - the required update requires moving to a version that is beyond that specified in your dependency settings
        - Case Study
            - dot-prop < 4.2.1 “Prototype pollution vulnerability in dot-prop npm package before versions 4.2.1 and 5.1.1 allows an attacker to add arbitrary properties to JavaScript language constructs such as objects.“
                - Affected repos including node-weather-app
                    - dot-prop only appears in the package-lock.json; nowhere else.
                    - It’s not a dependency that I explicitly installed so I’m guessing it’s a sub dependency of express, hbs, request or nodemon. 
                        - But checking in package-lock.json:
                            - it‘s not under dependencies for any of those I listed above; it’s within the top level “dependencies” object.
                            - interestingly it has “dev: true”
                            - I think I’ve sussed it. The actual locked-down/installed version of each subdependency (no matter how deep) is listed in the top level “dependencies” section. It can also be found specified as a semver range by the higher-level dependency (say, nodemon) that requires it. But the top-level “dependencies” lists the actual installed version.
                                - So I was able to work backwards and find that dot-prop is required by configstore which is required by update-notifier which is required by nodemon.
                                - So nodemon would need updated. I then googled “nodemon dot-prop” and found https://github.com/remy/nodemon/issues/1682 and various argumentative PR threads!
                                - I looked at https://github.com/remy/nodemon/releases and ascertained that I need v2.0.3 (a new major version) but since the latest is just a patch version away (2.0.4) I’ll go for that.
                                - This is a major version update but it’s just a devDependency so I don’t really care.
                                - I checked package.json and changed  devDependencies {  "nodemon": "^1.19.4" } to "nodemon": "^2.0.4" then ran npm i nodemon to update. (Followed by npm audit fix)
                                - Then pushed, checked my Github repo security section and that alert (and a few others) disappeared! Job’s a goodun.
                                - PS in the real world I should have tested that nodemon and everything else still works.
                        - So its difficult to know which of my top-level dependencies it is a sub-dependency of and therefore what to update.
                        - I guess I could manually update the entry 

    - Version updates (not just security vulnerabilities)
        - You can automate this with dependabot by adding a dependabot.yml to your repo https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/#keep-all-your-dependencies-updated
- semver
- Files
    - package.json; and yarn.lock or (package.lock or package-lock.json)
    - You don’t really want to be manually maintaining the lock files. And you don’t necessarily need to manually update package.json either, since you can use “yarn upgrade-interactive”




## References
- https://classic.yarnpkg.com/en/docs/yarn-workflow/
- A [good explanation of the purpose of a lock file](https://www.robertcooper.me/how-yarn-lock-files-work-and-upgrading-dependencies)) (it’s to lock down the exact version to be used (rather than a range like package.json)
