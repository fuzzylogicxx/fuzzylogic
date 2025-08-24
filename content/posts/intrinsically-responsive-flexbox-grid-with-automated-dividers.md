---
title: Intrinsically responsive flexbox grid with automated dividers
description: "Adding auomated dividing lines between items in "
noteWithTitle: false
date:
  ? "{ now }"
---
Our Design System at work includes intrinsically responsive layout components. I was heavily involved in creating these alongside other smart colleagues. We were all inspired by the amazing EveryLayout. We took its ideas and customised them for our company tech stack and culture.

One thing designers look for every so often is dividing lines.

I started with Ahmad’s idea. 

I also remembered that Heydon had done something clever on his website. I wasn’t quite sure how this worked so decided to dig into it.


## Reviewing the outline-based approach

Pros:
- lets you keep your layouts intrinsic
- unlike Ahmad’s technique it’s automated

Cons:

- maintainability: it’s clever, so potentially confusing
- ghost outlines. Maybe only appear when you resize screen so maybe not a real problem, but it doesn’t feel super-resilient. A bit hacky?





<https://codepen.io/fuzzylogicx/pen/GgpMVYd?editors=1100> 
Message 2 to JP
I was reading something earlier and just wanted to make an important amend (in the name of science) to something objectively wrong I said the other day. I had said:
outline, unlike border, is on the inside of the box, like you said earlier.
Actually, per MDN’s outline docs:
Outline is a line outside of the element's border.
And of course we already knew that “outlines don't take up space”.
So therefore you have this cool quantum situation where an outline exists outside of the box of the element to which it is applied, and therefore likely inside the box of that element’s immediate parent, but not taking up space or affecting either element’s dimensions.
And I now of course realise that this is why when you give a parent element overflow: hidden and set its children to have an outline , then any of those outlined edges of the children which spill over the edges of the parent will now be hidden by the parent’s overflow setting. Which gives us the magic of Heydon Pickering’s approach. The child element outlines on the inside (i.e. between child elements) are visible; but the child outlines on the outer edges are hidden. :magic:
----
Message 1 to JP
Although the theory of every part of it hasn’t completely sunk in, it’s something like:
- outline, unlike border, is on the inside of the box, like you said earlier.
the outline would normally show on all sides of the box, but…
a cunning combination of overflow plus outline plus white background will cause the white background to overflow the outline (thus visually painting over it) on the edges where we don’t want to see it, and retain it on the single edge where we do
