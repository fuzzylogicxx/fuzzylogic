---
layout: layouts/page.njk
title: Contact
eleventyNavigation:
  key: Contact
  order: 5
---

Want to get in touch? Please do, using the form below.

I’m not on social media much these days so this is a good way to start the conversation.

<form name="contact" method="POST" data-netlify="true">

  <div class="form__fields">
    <div class="form__field">
      <label for="name">Your name</label>
      <input id="name" type="text" name="name" />
    </div>
    <div class="form__field">
      <label for="email">Your email address</label>
      <input id="email" type="email" name="email" />
    </div>
    <div class="form__field">
      <label for="message">Message</label>
      <textarea id="message" name="message" row="5" cols="20"></textarea>
    </div>
    <div>
      <button type="submit">Send message</button>
    </div>
  </div>
</form>
