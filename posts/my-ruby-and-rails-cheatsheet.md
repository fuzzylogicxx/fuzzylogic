---
title: My Ruby and Rails Cheatsheet
description: My Ruby and Rails Cheatsheet
date: 2019-12-13T15:07:34.165Z
mainImage.isAnchor: false
tags:
  - ruby
  - rails
  - web
  - development
  - cheatsheet
draft: false
---
I’m no Ruby engineer however even as a front-end developer I’m sometimes called to work on [Rails](https://rubyonrails.org/) applications that require me to know my way around. Here are my notes and reminders. 
---

This is not intended to be an authoritative guide but merely my notes from various lessons. It’s also a work-in-progress and a living, changing document.

## frozen_string_literal: true

I’ll often see this at the top of files, for example Ruby classes. This is just a good practice. It makes things more efficient and thereby improves performance.

<figure>
  
``` ruby
frozen_string_literal: true
```

</figure>

## Class-level methods

They’re called class-level methods because they are methods which are never called by the instance, i.e. never called outside of the class. They are also known as _macros_.

Examples include `attr_reader` and ViewComponent’s `renders_one`.

## Constants

Here’s an example where we define a new constant and assign an array to it.

<figure>
  
``` ruby
ALLOWED_SIZES = [nil, :medium, :large]
```

</figure>

Interestingly it’s only the array itself that’s constant, not the elements. My understanding is that while the array itself is constant, the elements can still be added to or removed which we don’t want. The following would be better because it locks things down which is likely what we want.

<figure>
  
``` ruby
ALLOWED_SIZES = [nil, :medium, :large].freeze
```

</figure>

## ViewComponents

[ViewComponents](https://viewcomponent.org/) (specifically the `my_component.rb` file) are just controllers which do not access the database.

They use _constructors_ like the following:

<figure>
  
``` ruby
def initialize(size: nil, full_height: false, data: nil)
  super
  @size = allowed_value?(ALLOWED_CARD_SIZES, size)
  @full_height = full_height
  @data = data
end
```

</figure>

(Note that you would never include a constructor in a _Rails_ controller or model.)

## Instance variables

In the previous example `@size` is an `instance variable`. 

These are available to an instance of the controller (i.e. the ViewComponent) and private to the component.

### Making instance variables publicly available

The following code makes some instance variables of a ViewComponent publicly available.

<figure>
  
``` ruby
attr_reader :size, :full_height, :data
```

</figure>

However although that’s the pattern employed by the [ViewComponent website](https://viewcomponent.org/) you could argue it’d be better not to do this because it makes more stuff public than needs to be. Instead you could simply access the instance variables directly (including in the view). I’d like to dig into this one a bit more and just check I’m clear on the syntax (perhaps `card.size`).

## Methods

Every method returns a value. You don’t need to explicitly use `return`, because without it it will be assumed that you’re returning the last thing in the method.

<figure>
  
``` ruby
def hello
  "hello world” 
end
```

</figure>

### Naming conventions

The convention I have worked with is that any method that returns a `boolean` should end with a question mark. This saves having to add prefixes like “is-” to method names. If a method does not return a boolean, its name should not end with a question mark.

### Named Parameters

Here’s an example of using _named parameters_. When this method is called (or in this case when the ViewComponent is instantiated), none of the parameters are mandatory.

<figure>
  
``` ruby
def initialize(size: nil, full_height: false, data: nil)
```

</figure>

## The shovel operator

The shovel operator (`<<`) lets you add elements to an array. Here’s an example where we build up an HTML `class` attribute for a BEM-like structure:

<figure>
  
``` ruby
def classes
  classes = []
  classes << "card--#{size}" if size
  classes << "card--tall" if full_height
  classes.join(" ")
end
```

</figure>

## require

`require` allows you to bring other resources into your current context.

## Blocks

The `do…end` structure in Ruby is called a “block”, and more specifically a multi-line block.

<figure>
  
``` ruby
<%= render CardComponent.new do |c| %>
  Card stuff in here.
<% end %>
```

</figure>

Blocks are essentially methods (functions).

We can specify that a block must be present. For example:

<figure>
  
``` ruby
def has_block(param, &block)
```

</figure>

Here, the ampersand (`&`) means that the block is required.

### Single-line block

Sometimes we don’t need to use a multiline block. We can instead employ a single-line block. This uses curly braces rather than `do…end`. 

For example in a spec we might use:

<figure>
  
``` ruby
render_inline(CardComponent.new) { "Content" }
expect(rendered_component).to have_css(".fe-CardV2", text: "Content")
```

</figure>

The above two lines really just construct a “string” of the component and let you test for the presence of things in it.

## rendering HTML

We have the `content_tag` helper method for rendering HTML elements. However you are arguably just as well coding the actual HTML rather than bothering with it, especially for the likes of `div` and `span` elements.

`link_to` is a little more useful and makes more sense to use. 

## Views

If you have logic you need to use in a view, this would tend to live in a _helper_ method rather than in the controller.

## Policies

You might create a method such as `allowed_to?` for purposes of authorisation.

## References

- [ViewComponent by GitHub](https://viewcomponent.org/)
