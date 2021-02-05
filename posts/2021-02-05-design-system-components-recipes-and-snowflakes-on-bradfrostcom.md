---
date: "2021-02-05T11:18:03.152Z"
title: "Design system components, recipes, and snowflakes (on bradfrost.com)"
description: "Brad Frost gives us some vocabulary for separating components which are content and context agnostic and intended for maximal use from more specific variants and one-offs."
tags: [link, web, development, components, designsystems, composition]
linkTarget: "https://bradfrost.com/blog/post/design-system-components-recipes-and-snowflakes/"
---
An excellent article from Brad Frost in which he gives us some vocabulary for separating context-agnostic components intended for maximal use from specific variants and one-offs.

> This structure embraces the notion of composition (React talks about this a lot). In our design systems, our Card components are incredibly basic. They are basically boxes that have slots for a CardHeader, CardBody, and CardFooter. 
---

In light of some recent conversations at work, this was in equal measure interesting, reassuring, and thought-provoking.

On the surface, a design system and process can seem generally intuitive but in reality every couple of weeks might throw up practical dilemmas for engineers. For example:

- this new thing should be a component in programming terms but is it a Design System component?
- is everyone aware that _component_ has a different meaning in programming terms (think WebComponent, ViewComponent, React.Component) than in design system terms? Or do we need to talk about that?
- With this difference in meaning, do we maybe need to all be more careful with that word _component_ and perhaps define its meaning in Design Systems terms a bit better, including its boundaries?
- should we enshrine a rule that even though something might be appropriate to be built as a component in programming terms under-the-hood, if it’s not a reusable thing then it doesn’t also need to be a Design System component?
- isn’t it better for components to be really _simple_ because the less opinionated one is, the more reusable it is, therefore the more we can build things by composition?

Brad’s article last night kind of felt like it was speaking to me!

Some key points he makes:

- If in doubt: everything should be a component (in design system terms)
- The key thing is that the only ones you should designate as “Design System Components” are the ones for maximal reuse which are content and context-agnostic.
- After that you have 1) Recipes—specific variants which are composed of existing stuff for a specific purpose rather than being context-agnostic; and 2) Snowflakes (the one-offs).

Then there was this part that actually felt like it could be talking directly to my team given the work we have been doing on the technical implementation details of  our `Card` recently:

> This structure embraces the notion of composition. In our design systems, our Card components are incredibly basic. They are basically boxes that have slots for a CardHeader, CardBody, and CardFooter.

We’ve been paring things back in exactly the same way and it was nice to get this reassurance we are on the right track. 

(via [@jamesmockett](https://twitter.com/jamesmockett))
