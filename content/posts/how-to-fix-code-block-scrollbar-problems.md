---
title: How to fix code block scrollbar problems
description: Foo
noteWithTitle: false
date:
  ? "{ now }"
---
## What

Fixes broken appearance and unconventional/brittle scroll behaviour of all variations of code snippets. 
Screenshot of main issue:

![]()

## How

Addresses CSS issues in:

* our code snippets (the code wrapper in demos, the common `pre` element, the common `code` element)
* the page columns which need to resiliently contain wide code snippets

## Why

Our code snippets currently have a few issues. 

1. Some readers (include me and Lea) see a broken looking white bar on top of a black code snippet background, even when no scrolling is required. 
2. They also show a small empty grey box under the snippet. 
3. When scrolling is required and the user has the ”Show scrollbars > Always“ system setting, the scrollbar is inside the scrolling content (which is unconventional for that setting and causes various complications) rather than just outside it which is conventional. 
   **Problem 1 – white bar even when no scrolling required, plus unexpected small grey box at bottom**
   ![image](https://github.com/user-attachments/assets/d8a60d7d-6529-436e-92bb-5c4ad1f3f9a3)
   **Problem 2 – when scrolling is required the bar is in an unconventional place which poses layout, colour (and more) issues**
   ![image](https://github.com/user-attachments/assets/c4245bc8-7314-44ff-8649-d705d20f01a2)
   This update fixes those issues. After the update:
   ![image](https://github.com/user-attachments/assets/eb07f0e8-8ed0-4f4b-8b4b-c53f04faaa51)

## Notes

After I rationalised and deduplicated the code snippet styles, it exposed a side effect. When we have a long/wide `pre` element (there a number of these on the Combobox docs for example) these would break out of the main column of the page layout. That’s because our new-ish `l-with-toc` layout uses `1fr` as its width dimension. The use of `1fr` here makes sense because the column is intended to take up all of the available horizontal space. However the [known issue](https://css-tricks.com/preventing-a-grid-blowout/) here is that you can have a grid blowout because a grid column with a width of `1fr` has no constraints on min-width meaning it will stretch to accommodate a long `pre` which is undesirable. I applied a tweak to that, making the layout more resilient. Here’s a before and after:

**Before**

![image](https://github.com/user-attachments/assets/d19979a4-07a2-4deb-8d81-399fd5927507)

**After**

![image](https://github.com/user-attachments/assets/36e46764-abd2-4c55-88d2-5674766cf8e6)

## PPT

* In Mac settings, set Appearance > Show scroll bars to *Always*
* On the deploy preview server, open tabs to both the [Ask users for addresses patterns](https://freestyle.freeagent.com/patterns/ask-users-for-addresses/) and the [Combobox](https://freestyle.freeagent.com/patterns/ask-users-for-addresses/) docs.
* Have a look at all the code snippets on each, including the very wide one at the bottom of the Combobox docs
* Also squeeze your viewport in and try that
* They all look good and scrolling feels conventional and solid
* In Mac settings, set Appearance > Show scroll bars to *Automatically based on mouse or trackpad*
* Do the same things on the two pages as above
* The scrolling experience will be slightly different now, i.e. bars don’t show til you start scrolling, but that’s expected for that Mac setting.
* All still feels conventional and solid
