---
title: Website Delivery Principles
description: A few website creation and delivery principles I’ve learned over the years.
date: 2019-03-16T10:00:00
tags:
  - entry
  - webdev
  - principles
---
Here are a few website creation and delivery principles I’ve learned over the years. I’ll update this post as more come to mind.

### Use the right tool for the job

When choosing software and development approach we should focus on:

1. benefit to the website’s users; and
2. ability to deliver the required functional requirements.

The decisions shouldn’t be led by preferences for a particular proprietary software, especially when that software is not the right tool for the job.

In addition, as developers who get excited about shiny new things, we need to be watchful about picking some new or unnecessarily complex approach just to make ourselves feel clever or to make development (allegedly) more convenient. Really good work usually results from finding the simplest, most elegant solution, which often comes from clever use of existing knowledge and standards rather than breaking those then having to rebuild them with custom solutions.

### Start with solid foundations or pay for it later

Ask the client questions to ensure you are clear about the requirements. Choose the right system for the job. Take time to plan classes and database schema well. Write well structured HTML. By putting a bit of love into these initial steps, you will provide long-term stability. Conversely, rushing into development is a false economy and likely to have you chasing your tail for the rest of the project.

### If re-launching, keep a reference to the previous version

When launching a new version of a website, first archive the existing site and make it available/viewable for reference at a new domain e.g. archive.nameofsite.com. This is always useful so that when someone inevitably asks “why doesn’t it do XYZ like the old site?” then you have a reference rather than just anecdotal evidence.

### Aim for an early MVP then release often

Avoid shooting for a dream, all-powerful solution at first. Focus on releasing an initial solution that hits the main requirements and is “good enough” as soon as possible. Then iterate.

### Friday releases are bad, m’kay

Avoid releases on a Friday, where possible, unless you’re all OK with i) working over the weekend to resolve any issues that might arise; and ii) the website losing money as a result of issues that weren’t detected until Monday.

### Make it easy for you and clients to part company

Don’t use your own money to pay for third party services (hosting, web font services, etc) on the client’s behalf. That way, you avoid having to do awkward transfers of ownership (and generally making life difficult for your client) when you stop working together. Instead, you can still handle initial technical set-up and configuration for them, but _use their credit card_ when initially setting up subscription payments.

### Design with real content

First, start from a foundation of great content: well-written, engaging copy; brief and helpful microcopy; and high quality photography. If you don’t have that, you need to get it. Then, create a design based around the _real content_. When you commence design of any non-trivial project using dummy content you end up with something that might look OK on the surface with its idealised lorem ipsum line-lengths, idealised page lengths and grid patterns, and fake photos. But it may bear little relation to the real content the developer needs to fit in later and will unravel under pressure. This is not good design; it’s just pretty pictures. Good websites start from good content, with design that serves and showcases that content.

### When designing responsive websites, flat design files aren’t enough

Designers and developers need to consider what happens at super-wide viewports, for example to full-width images. They need to discuss the implication of widescreen assets on performance. They need to consider how the design flexes _between_ breakpoints – not just how it looks on three arbitrary 2019 device widths.
