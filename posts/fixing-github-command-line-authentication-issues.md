---
date: "2020-03-02T09:04:56.471Z"
title: Fixing Github Command Line Authentication Issues
description: If your push to Github is failing, it’s probably because you have 2FA turned on in your Github account and should be using a personal access token in place of your password.
tags: [development, git, github, commandline, fix]
---
On at least two ocassions I’ve found myself scratching my head when an attempted push to a newly-created Github repo is met with authentication failures, despite me being sure I’m using the correct credentials.

Here’s the lowdown on the issue and how to resolve it.
---

Essentially the problem relates to Github expecting a _personal access token_ rather than a password (although it provides no helpful hints that this is the case).

This might be because your Github account has <abbr title="Two-Factor Authentication">2FA</abbr> enabled, and/or for security purposes because your account is part of an organisation that uses SAML single sign-on (SSO). 

In my case, I had previously created a personal access token with the requisite privileges (in my Github account’s [Developer Settings > Tokens](https://github.com/settings/tokens) section) for the purposes of API access, so I was able to just reuse that. However, if need be I could have created a new one.

Thanks to Ginny Fahs who had the same problem and [documented her solution](https://medium.com/@ginnyfahs/github-error-authentication-failed-from-command-line-3a545bfd0ca8).

Github’s Help page [Creating a personal access token for the command line](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) is also useful.
