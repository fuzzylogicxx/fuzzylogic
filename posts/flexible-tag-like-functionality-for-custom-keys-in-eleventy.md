---
title: Flexible tag-like functionality for custom keys in Eleventy
description: Achieving tag-like functionality without using tags in Eleventy
date: 2019-08-26 13:49:00
tags:
  - entry
  - web
  - 11ty
  - solution
---
I have an open-source, Eleventy-based project where the posts are restaurants, each of which is located in a particular city, and contributors to the repo can add a new restaurant as a simple markdown file.
---

I just had to solve a conundrum wherein I wanted a custom front matter key, _city_, to have similar features as _tags_, namely:

1. it takes arbitrary values (e.g. _Glasgow_, or _London_, or _Cañon City_, or anything a contributor might choose);
2. there is a corresponding _cityList_ [collection](https://www.11ty.io/docs/collections/);
3. there is a page which lists all cities in the _cityList_ collection as links; and
4. there’s a page for each city which lists all restaurants in that city (much like a “Tagged _Glasgow_” page).

You could be forgiven for asking: why didn’t I just implement the cities as tags? I could have tagged posts with "glasgow", or "edinburgh" for example. Well, here was my rationale:
- for cities, I need the proper, correctly spelled, spaced and punctuated name so I can display it as a page title. A lowercased, squashed together “tag” version wouldn’t cut it;
- I list “all tags” elsewhere and wouldn’t want the cities amongst them. Although Eleventy allows you to filter given tag values out, in this case that would be a pain to achieve because the city values are not known up front;
- Lastly it just _felt right_ for ease of future data manipulation that city should be a separate entity.

This task was a bit of a head-scratcher and sent me down a few blind alleys at first. Rightly or wrongly, it took me a while to realise that only all posts for _tag values_ are automatically available as collections in Eleventy. So any other collections you need, you have to DIY. Once I worked that out, I arrived at a strategy of:

> implement all the requisite functionalty on **tags** first, then emulate that functionality for my custom key.

First port of call was [the Eleventy _Tag Pages_ tutorial](https://www.11ty.io/docs/quicktips/tag-pages/). That showed me how to use the existing “collection for each tag value” to create a _page_ for each tag value – the “All posts tagged with X” convention. (Here’s [an example on this site](/tagged/music/).)

I then referenced the [_eleventy-base-blog_ repo](https://github.com/11ty/eleventy-base-blog) which takes things further by creating a page which lists “all tags”. To achieve this you first need to create a custom _tagList_ collection, then you create a page which accesses that new collection using `collections.tagList`, iterates it and displays each tag as a link. Each tag link points to its corresponding “All posts tagged with X” page we created in the step above.

So now I had everything working for tags. Next step: emulate that for _cities_.

Here’s what I ended up doing:

Create new file `_11ty/getCityList.js`

``` js
module.exports = function(collection) {
  let citySet = new Set();
  collection.getAll().forEach(function(item) {
    if( "city" in item.data ) {
      let city = item.data.city;
      citySet.add(city);
    }
  });

  return [...citySet];
};
```

Then add the following to `.eleventy.js`

``` js
// Create a collection of cities
eleventyConfig.addCollection("cityList", require("./_11ty/getCityList"));

// Create "restaurants in city" collections keyed by city name
eleventyConfig.addCollection("cityCollections", function(collection) {
  let resultArrays = {};
  collection.getAll().forEach(function(item) {
    if(item.data["title"] && item.data["city"]) {
      if( !resultArrays[item.data["city"]] ) {
        resultArrays[item.data["city"]] = [];
      }
      resultArrays[item.data["city"]].push(item);
    }
  });
  return resultArrays;
});
```

Next, create new file `cities-list.njk`:

``` liquid
---
permalink: /cities/
layout: layouts/home.njk
---
<h1>All Cities</h1>

<ul>
{{ "{%- for city in collections.cityList " }}-%}
  {{ "{% set cityUrl " }}-%}/cities/{{ "{{ city " }}}}/{{ "{% endset " }}%}
  <li><a href="{{ "{{ cityUrl | url " }}}}">{{ "{{ city " }}}}</a></li>
{{ "{%- endfor " }}-%}
</ul>
```

Finally, create new file `posts-in-city.njk`:

``` liquid
---
renderData:
  title: Restaurants in “{{ "{{ city " }}}}”
pagination:
  data: collections.cityList
  size: 1
  alias: city
permalink: /cities/{{ "{{ city | slug " }}}}/
---
<h1>Restaurants in {{ "{{ city " }}}}</h1>

{{ "{% set postslist = collections.cityCollections[ city ] " }}%}
{{ "{% include 'postslist.njk' " }}%}
```

And that’s a wrap! Eleventy will do the rest when it next runs, creating for each city a page which lists all restaurants in that city.

Footnote: I should acknowledge [this 11ty Github issue](https://github.com/11ty/eleventy/issues/259) in which [Ed Horsford](https://twitter.com/edwardhorsford) was trying to do something similar (create a _separate_ tags network) leading to [Zach Leatherman](https://twitter.com/zachleat) pitching in with how he created _noteTags_ for his website’s Notes section. That led me to Zach’s website’s repo on Github, specifically [.eleventy.js](tag-pages.njk) and [tag-pages.njk](https://github.com/zachleat/zachleat.com/blob/master/web/notes/tag-pages.njk), without which I wouldn’t have found my way.

