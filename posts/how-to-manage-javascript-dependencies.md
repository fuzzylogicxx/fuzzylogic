---
title: How to manage JavaScript Dependencies
description: How to manage JavaScript Dependencies
date: "2020-10-23T16:58:08.051Z"
tags: [development, javascript, yarn]
draft: true
---

It can pay to add tried-and-tested existing functionality to your application via NPM packages; that way, you can concentrate on your application’s unique features rather than reinventing the wheel for other stuff.

- https://classic.yarnpkg.com/en/docs/yarn-workflow/
- And here’s a good explanation of the purpose of lock files (it’s to lock down the exact version to be used (rather than a range like package.json) https://www.robertcooper.me/how-yarn-lock-files-work-and-upgrading-dependencies)
- Getting started
    - If blank slate, yarn (or npm) init
    - If established project, “yarn” (or “npm i”)
- Adding
    - yarn add <package…> (or …)
    - can add specific version or [semver range](https://devhints.io/semver), and it can be a good idea to do so, e.g. yarn add <package…>@^1.3.1
- Removing
    - yarn remove <package…>
    - use this rather than manually deleting because this way it will update `yarn.lock`, too.
- Updating
    - npm i (same command as to add/install)
    - yarn upgrade, or “yarn upgrade-interactive”
- Maintaining
    - Security vulnerabilities
        - Note that this might be in:
            - a sub-dependency i.e. not one you explicitly installed.
            - a package which appears several times in your lock file / dependency tree
        - Often you need to upgrade to a patch version. (To minimise risk you usually want to update to update to the closest non-vulnerable version)
        - This may not require a change to package.json 
        - Automated
            - Dependabot https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/ 
            - You can configure Github Dependabot to send automated security updates (NB this is not just for JS, i.e. in a Rails project it might suggest a bump to your Gemfile)
            - dependabot will often automatically open a PR in your repo, updating the relevant dependency (thus addressing the vulnerability) with PR title e.g. “Bump lodash from 4.17.11 to 4.17.19”
            - (note however that if you work on a (corporate) repo that is not set up to automatically open PRs, you can still often take advantage of this on each individual dependabot security alert, at the push of a button.
                - Hopefully you also get a round-up email for all affected repos “A new security advisory on lodash affects 8 of your repositories” with links to the alert for each repo
            - You generally just need to follow the link in the email then merge the PR and delete the branch from the PR page 
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
