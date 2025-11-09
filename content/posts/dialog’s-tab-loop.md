---
title: Dialog’s tab loop
description: Dialog’s tab loop
noteWithTitle: false
date:
  ? "{ now }"
---
Native dialog focus trap issue – a playlist:

https://ripple.watermarkinsights.com/blog/focus-trap/ (good one, except for the inaccuracy about Nolan being an expert)
https://www.scottohara.me/blog/2019/03/05/open-dialog.html 
https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html#comment-250985 (in 2023 Adrian thought it was buggy)
https://schalkneethling.com/posts/html-dialog-native-solution-for-accessible-modal-interactions/ 
https://codepen.io/schalkneethling/pen/ogvRmmM DIY solution for focus trap within native dialog.
https://github.com/whatwg/html/issues/8339  Kristjan, Scott, Léonie


---

And our team discussion

Hey @anda.popovici I have done a bit of testing the only issue I have found is with tabbing on the old Dialog the focus is trapped in the card. On chrome for me when I tab after the Yes, bla bla and Cancel buttons the tabbing takes me out of the window and into my browser tabs it doesn't take me to the Close button, I can only get to that by reverse tabbing and then it takes me out of the dialog again (edited)
Screen Recording 2025-10-30 at 12.14.50.mov
 

Generate transcript


Anda Popovici
  Thursday at 12:18
Thanks for checking, Sacha! That is something me and @laurence.hughes noticed as well (taking you out into the browser search bar) and we've decided it's OK to leave like that, as it's the default functionality when using dialog under the hood. (edited)
12:19
About the close button - it's first in the DOM and before the other buttons. Would you expect tabbing from Cancel to take you to the X button?


Sacha Harmsworth
  Thursday at 13:02
I think I would expect that after Cancel it would be Close. However, I think that is because I would expect the focus was trapped rather than the source order, esp. if I was a current keyboard user I would find this quite a strange change going from what we have currently. Also I suppose it depends how many browser tabs you have open if you are a user like me with quite a few (as after the search bar it takes you through all the tabs)  so it would take me forever to get to that Close button.
I know in the No focus trap WCAg in the examples its ok if focus does go to user agent controls, but it quite a change from our current "Modal" and to other accessible guidance (here and here) I am used to.
I guess Cancel does the same thing as close. So its probably not an issue. Plus I imagine you two have done the deepest of dives on the subject so happy to defer to your assessment of the issue (edited)


Anda Popovici
  Thursday at 14:23
I see your point about the functionality having changed slightly. According to WCAG no keyboard trap:
When the dialog has been opened, all web page content outside the dialog becomes inert and cannot receive focus (though, depending on implementation, the focus cycle might still include user agent controls)
Also found a Github issue for the HTML spec - dialog element should trap focus. Steve Faulkner seems to say that Chrome's implementation is that the focus cycle includes the browser controls, but I've tested in Firefox and it's the same situation as Chrome. I am not sure why the issue was closed.
I wonder if this will become a bigger issue once we switch more modals over.


Laurence Hughes
  Thursday at 14:43
Here’s a bit more context about a discussion we had during introduction of dialog. (Me, Anda, and Lea).
We noticed that dialog natively traps focus in the dialogue with respect to the page content, i.e. all other contents of the page are natively inert. But it allows the keyboard user to reach the address bar at the end of the tab loop.
Our immediate reaction was “that’s interesting, and probably intentional”, and decided to dig into what was happening and why without passing too much judgement.
That took us to to this whatwcg issue filed by Kristjan from Github, and the illuminating discussion on it.
Allow modal dialogs to trap focus, avoiding tabbing to the URL bar
That issue has more detail than you’re probably gonna have time for and takes a bit of digesting, so here’s a summary so you don’t have to!
Kristjan quoted an older bit of WCAG advice about focus trapping. He thought it was saying that in a modal dialogue, keyboard focus must be (completely) trapped inside.
Scott O’Hara, a bona fide expert on modal dialogues, replied to confirm that
the advice was not saying this must be the case. And really importantly…
the advice was written a while back, before the inert attribute or the <dialog> element were widely supported. So they were written at a time when people had to DIY their dialogues. And at that time, the easiest advice for the WCAG folks was to say “trap focus in the dialog” because if developers try to DIY something else it was too error-prone.
Now, people can create native dialogues via <dialog>. And dialog makes smart decisions and takes care of hard things for us!
the discussion continues, with more people like Léonie Watson lending some support for the idea that people should be able to tab to the browser controls.
“It seems logical (to me at least) for the same options to be available to people when in a dialog context instead of a page context.”
After all the chat, Kristjan happily closed his request and said he’d learned something.
(edited)


Laurence Hughes
  Thursday at 14:53
So what I would say is:
Yes, the keyboard tabbing behaviour is slightly different in dialog. That’s partly because it’s the modern approach and incorporates newer accessibility thinking, whereas we are currently using an older DIY approach.
I think there is pretty decent rationale to move to dialog’s sensible default. (If Léonie supports it, that’s a good sign)
And yes, it means that the confirmation prompt instances that get changed in Anda’s PR will be slightly different in keyboard behaviour than other existing Modal instances. (Albeit it’s just one aspect of keyboard behaviour – the tab loop – and people likely will generally stop on the button they’re interested in)
Because of that slight difference we could get cautious and try to modify dialog’s default behaviour etc. Personally, I’m probably a bit more inclined to go with it and modernise our application, rather than assume that the way we have always done things is best.
Introducing dialog brings a lot of benefits in other ways. The tab loop is just one aspect of dialog. (edited)


Sacha Harmsworth
  Thursday at 15:14
Thanks for the context, as I say I imagined you had both done a deep dive into it. For the record I think its great that we are moving to a more modern approach and as you say it has a host of other benefits. I am just very surprised at its default focus behaviour as its going to be quite a change for users as the industry moves to this from the thousands of Dialogs currently out there and so I can see why that issue was filed but also why it was closed from all the discussion.
Also I have just redone my test and now the focus only includes the search bar which is I think is fine, where as previously in my screen recording it was all the search bar, all the tabs and the bookmarks bar. I wonder if there is some inter mitten bug in Chrome? as it seems to swap between only including the search bar and including all the browser chrome (edited) 
