---
pageSpecificRobotsDirective: "noindex, nofollow"
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
---
I’m no Ruby engineer however even as a front-end developer I’m sometimes called upon to work on [Rails](https://rubyonrails.org/) applications that require me to know my way around. Here are my notes and reminders.
---

This is not intended to be an authoritative guide but merely my notes from various lessons. It’s also a work-in-progress and a living, changing document.

## Table of contents

- [The Rails Console](#the-rails-console)
- [Rspec](#rspec)
- [Helpers](#helpers)
- [blank? vs empty?](#blank%3F-versus-empty%3F)
- [frozen_string_literal](#frozen_string_literal%3A-true)
- [Class-level methods](#class-level-methods)
- [Constants](#constants)
- [Symbols](#symbols)
- [ViewComponent](#viewcomponents)
- [Instance Variables](#instance-variables)
- [Methods](#methods)
- [Empty-checking arrays](#check-if-thing-is-an-array-and-is-non-empty)
- [The Shovel Operator](#the-shovel-operator)
- [Require](#require)
- [Blocks](#blocks)
- [Rendering HTML](#rendering-html)
- [Generating random IDs or strings](#random-ids-or-strings)
- [Views](#views)
- [Policies](#policies)
- [Start local Rails server](#start-(local)-rails-server)
- [Miscellaneous](#miscellaneous)
- [Web fonts location](#web-fonts%3A-where-to-put-them-in-the-rails-file-structure)
- [Working with the Database](#the-database)
- [Routing](#routing)
- [References](#references)

## The Rails Console

The `console` command lets you interact with your Rails application from the command line.

<figure>

``` bash
# launch a console (short version)
rails c

# long version
bundle exec rails console
```

</figure>

Quickly find where a method is located:

<figure>

``` bash
Myobj.method(:methodname).source_location

# Returns a file and line which you can command-click
=> ["/local/path/to/mymodelname/model.rb", 99]
```

</figure>

See an object’s methods:

<figure>

``` bash
Myobj.methods

# Search for a method using a search string
# this returns all of the object methods containing string “/pay/“
Myobj.methods.grep(/pay/)
```

</figure>

## Rspec

Run it like so:

<figure>

``` bash
bin/rspec spec/path/to/foo_spec.rb

# Run a particular line/method
bin/rspec spec/path/to/foo_spec.rb:195
```

</figure>

If adding data variables to use in tests, declare them in a let block so as to keep them isolated and avoid them leaking elsewhere.

<figure>

``` ruby
let(:example_data_obj) {
  {
    foo: "bar",
    baz: "bat",
    …
  }
}
```

</figure>

Note: if you need multiple data variables so as to handle different scenarios, it’s generally more readable to define the data being tested right next to the test.

## Helpers

Helper methods are to there to support your views. They’re for extracting into methods little code routines or logic that don’t belong in a controller and are too complex or reusable to be coded literally into your view. They’re reusable across views because they become available to all your views automatically.

Don’t copy and reuse method names from other helpers. You’ll get conflicts because Helpers are leaky. Instead, start your helper methods with an appropriate namespace.

Unlike object methods (e.g. `myobj.do_something`) helper methods (e.g. `render_something`) are not available for us to use in the Rails console.

## Helper specs

Basic format:

<figure>

``` ruby
# frozen_string_literal: true
require "rails_helper"

RSpec.describe Foos::BarHelper do
  let(:foo) { FactoryBot.create(:foo) }

  describe "#foo_bars_sortable_link" do

    context "when bat is not true" do
      it "does a particular thing" do
        expect(helper.foo_bars_sortable_link(foo, bat: "false")).to have_link(
          # …
        )
      end
    end

    context "when bat is true" do
      it "does something else" do
        expect(helper.foo_bars_sortable_link(foo, bat: "true")).to have_link(
          # …a different link from previous test
        )
      end
    end
  end
end
```

</figure>

Notes:
- start with `describe`: it’s a good top-level.
- describe a helper method using hash (`describe "#project_link" do`)
- Helper methods should not directly access controller instance variables because it makes them brittle, less reusable and less maintainable. If you find you’re doing that you might see it as an opportunity to refactor your helper method.

### Debugging Helper methods

If you want to debug a helper method by running it and stepping through it at the command line you should lean on a test to get into the method’s context.

<figure>

``` bash
# in foo_helper.rb, insert above line of interest
binding.pry # or byebug

# at command line, run helper’s spec (at relevant line/assertion)
bin/rspec spec/path/to/foo_helper_spec.rb:195

# the “debugger” drops you in at the line where you added your breakpoint
# and shows the body of the function being run by the line of the spec we requested.
From: /path/to/app/helpers/foo_helper.rb:26 FooHelper#render_foo:

# you’re now debugging in the context of the running helper method…
# with the arguments passed in by the test available to manipulate.
# this means you can run constituent parts of the method at the debugger prompt…
# for example…
# run this to get back the HTML being rendered.
render_user_profile(user)
```

</figure>

## blank? versus empty?

If you want to test whether something is “empty” you might use `empty?` if you’re testing a string, however it’s not appropriate for testing object properties (such as `person.nickname`) because objects can be `nil` and the `nil` object has no `empty?` method. (Run `nil.empty?` at the console for proof.) Instead use `blank?` e.g. `person.nickname.blank?`.

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

Interestingly while the constant cannot be redefined later—i.e. it could not later be set to something other than an array—elements can still be added or removed. We don’t want that here. The following would be better because it locks things down which is likely what we want.

<figure>

``` ruby
ALLOWED_SIZES = [nil, :medium, :large].freeze
```

</figure>

## Symbols

They’re not variables. They’re more like strings than variables however Strings are used to work with data whereas Symbols are identifiers.

You should use symbols as names or labels for things (for example methods). They are often used to represent method & instance variable names:

<figure>

``` ruby
# here, :title is a symbol representing the @title instance variable
attr_reader :title

# refer to the render_foo method using a symbol
Myobj.method(:render_foo).source_location

# you can also use symbols as hash keys
hash = {a: 1, b: 2, c: 3}
```

</figure>

From what I can gather, colons identify something as a Symbol and the colon is at the beginning when its a method name or instance variable but at the end when its a hash key.

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

### ViewComponents in the Rails console

<figure>

``` bash
view = ActionView::Base.new
view.render(CardComponent.new)
```

</figure>

## Instance variables

``` ruby
def initialize(foo: nil)
  super
  @foo = foo
end
```

In the above example `@foo` is an `instance variable`. These are available to an instance of the controller and private to the component. (This includes ViewComponents, which are also controllers.)

In a view, you can refer to it using `@foo`.

In a subsequent method within the controller, refer to it simply as `foo`. There’s no preceding colon (it’s not a symbol; in a conditional a symbol would always evaluate to `true`) and no preceding `@`.

``` ruby
def classes
  classes = ["myThing"]
  classes << "myThing-foo" if foo
  classes
end
```

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

### Define private methods

Add `private` above the instance methods which are only called from within the class in which they are defined and not from outside. This makes it clear for other developers that they are internal and don’t affect the external interface. This lets them know, for example, that these method names could be changed without breaking things elsewhere.

Also: keep your public interface small.

### Naming conventions

The convention I have worked with is that any method that returns a `boolean` should end with a question mark. This saves having to add prefixes like “is-” to method names. If a method does not return a boolean, its name should not end with a question mark.

### Named Parameters

When this method is called (in this case “when the ViewComponent is instantiated”)
- none of the parameters are mandatory.
- you need to add the parameter name before the value you’re passing e.g. `<%= render(CardComponent.new(size: :small, full_height: true)) do %>`

<figure>

``` ruby
def initialize(size: nil, full_height: false, data: nil)
```

</figure>

## Check if thing is an array and is non-empty

You can streamline this to:

<figure>

``` ruby
thing.is_a?(Array) && thing.present?
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

## Rendering HTML

We have the `content_tag` helper method for rendering HTML elements. However you are arguably just as well coding the actual HTML rather than bothering with it, especially for the likes of `div` and `span` elements.

`link_to` is a little more useful and makes more sense to use.

### tag.send()

`send()` is not just for use on `tag`. It’s a means of calling a method dynamically i.e. using a variable. I’ve used it so as to have a single line create either a `th` or a `td` dymamically dependent on context.

Only use it when you are in control of the arguments. Never use it with user input or something coming from a database.

## Random IDs or strings

`object_id` gives you the internal ruby object id for what you’re working on. I used this in the past to append a unique id to an HTML `id` attribute value so as to automate an accessibility feature. However don’t use it unintentionally like I did there.

It’s better to use something like `rand`, or `SecureRandom` or `SecureRandom.hex`.

## Views

If you have logic you need to use in a view, this would tend to live in a _helper_ method rather than in the controller.

## Policies

You might create a method such as `allowed_to?` for purposes of authorisation.

## Start (local) Rails server

Note: the following is shorthand for `bin/rails server -b 0.0.0.0`.

<figure>

``` bash
rails s
```

</figure>

## Miscellaneous

Use Ruby to create a local web server.

<figure>

``` bash
# to serve your site at localhost:5000 run this in the project’s document root
ruby -run -e httpd . -p 5000
```

</figure>

## Web fonts: where to put them in the Rails file structure

See https://gist.github.com/anotheruiguy/7379570.

## The Database

Reset/wipe the database.

<figure>

``` bash
bundle exec rake db:reset
```

</figure>

## Routing

## Get routes for model from terminal

Let’s say you’re working on the index page for `pet_foods` and want to create a sort-by-column anchors where each link’s `src` points to the current page with some querystring parameters added. You’re first going to need the route for the current page and in the correct format.

To find the existing routes for `pet_foods` you can run:

<figure>

``` bash
rails routes | grep pet_foods
```

</figure>

## References

- [Symbols](https://www.rubyguides.com/2018/02/ruby-symbols/)
- [ViewComponent by GitHub](https://viewcomponent.org/)
- [Debugging with Pry](https://learn.co/lessons/debugging-with-pry)
- [Why Byebug will be your best friend](https://blog.usejournal.com/why-byebug-will-be-your-best-friend-when-programming-in-rails-98e06f46bdb6)
- [Capybara cheatsheet](https://devhints.io/capybara)
