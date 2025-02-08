---
layout: default
title: Blog Posts
---

# Recent Posts

Here's where I write about mathematics, computer graphics, and other technical topics that interest me.

{% for post in site.posts %}
  ## [{{ post.title }}]({{ post.url | relative_url }})
  *Posted on {{ post.date | date: "%B %d, %Y" }}*
  
  {{ post.excerpt }}
  
  [Read more...]({{ post.url | relative_url }})
  
  ---
{% endfor %}