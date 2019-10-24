---
title: Certbot Troubleshooting
description: When taking the DIY approach to building a new server, Certbot is a great option for installing secure certificates. However, sometimes you can run into problems. Here, I review the main recurring issues I’ve encountered and how I fixed them.
date: 2019-02-13
tags: [web, development, ssl, secure, sslcert, certbot, vhosts, letsencrypt]
---
When taking the DIY approach to building a new server, Certbot is a great option for installing secure certificates. However, sometimes you can run into problems. Here, I review the main recurring issues I’ve encountered and how I fixed them.
---

When creating new servers for my projects I use [Certbot](https://certbot.eff.org/) as a means of installing free Let’s Encrypt secure certificates.

It’s great to be able to get these certificates for free and the whole process is generally very straightforward. However, since working with Let’s Encrypt certificates over the last few years I’ve found that the same recurring questions tend to plague me.

This is a note to “future me” (and anyone else it might help) with answers to the questions I’ve pondered in the past.

## How do I safely upgrade from the old LE system to Certbot?

For servers where you previously used the 2015/2016, pre-Certbot Let’s Encrypt system for installing SSL certs, you can just [install Certbot](https://certbot.eff.org/) on top and it will _just work_. It will supersede the old certificates without conflict.

## How do I upgrade Certbot now that Let’s Encrypt have removed support for domain validation with TLS-SNI-01?

Essentially the server needs Certbot v0.28 or above. See [Let’s Encrypt’s post](https://community.letsencrypt.org/t/how-to-stop-using-tls-sni-01-with-certbot/83210) on how to check your Certbot version and steps to take after upgrading to check everything is OK. To apply the upgrade I performed `apt-get update && apt-get upgrade -y` as root although depending on when you last did it this might be a bit risky as it could update a lot of packages rather than just the Certbot ones. It might be better to just try `sudo apt-get install certbot python-certbot-apache`.

## To what extent should I configure my 443 VirtualHost block myself or is it done for me?

When creating a new vhost on your Linode, DigitalOcean (or other cloud hosting platform) server, you need only add the `<VirtualHost *:80>` directive. No need to add a `<VirtualHost *:443>` section, nor worry about pointing to LE certificate files, nor bother writing rules to redirect http to https like I used to. When you install your secure certificate, certbot will automatically add the redirect into your original file and create an additional vhost file (with extension `-le.ssl.conf`) based on the contents of your existing file but handling `<VirtualHost *:443>` and referencing all the LE SSL certificate files it installed elsewhere on the system.

## How should I manage automated renewals?

There’s no longer any need to manually add a cron job for certiticate renewal. Auto-renewal of certificates is now handled by a cron job which comes bundled with the certbot package you initially install – in my case usually a certbot ppa package for Ubuntu 16.04 or 18.04. However you won’t find that cron job in the crontab for either your limited user, nor the root user. Instead, it is [installed at a lower level](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-18-04) (`/etc/cron.d`) and should _just work_ unless you’ve done something fancy with `systemd` in your system which in my case is unlikely.

## How can I tell if renewals are working and what should I do if they’re not?

If you notice that the SSL certificate for your domain is within 30 days of expiry and hasn’t yet auto-renewed, then you know that something has gone wrong with the auto-renewal process. You can test for problems by running `sudo certbot renew --dry-run`. You may find that there is, for example, a syntax error in your `apache2.conf` or nginx config file which needs corrected – not that I’ve ever been guilty of this, you understand…
