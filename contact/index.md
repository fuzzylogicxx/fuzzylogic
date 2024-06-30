---
layout: layouts/page.njk
title: Contact
eleventyNavigation:
  key: Contact
  order: 4
---

Want to get in touch? Please do, I’d love to hear from you! (Especially if you’re friendly and not trying to sell me something).

I’m not on social media these days so this is a good way to start the conversation.

<form name="contact" method="POST" data-netlify="true">

  <div class="form__fields">
    <div class="form__field">
      <label>Your name</label>
      <input type="text" name="name" />
    </div>
    <div class="form__field">
      <label>Your email address</label>
      <input type="email" name="email" />
    </div>
    <div class="form__field">
      <label>Message</label>
      <textarea name="message" row="10" cols="20"></textarea>
    </div>
    <div>
      <button type="submit">Send message</button>
    </div>
  </div>
</form>
