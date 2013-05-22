```haml
!!!5
%html
  %head
    %meta{charset: "utf-8"}
    %title= page_title
    %meta{name: "description", content: page_description}
    ...
    = stylesheet_link_tag "application"
  %body
    .fallback-message= partial 'fallback'
    = yield
    ...
    = javascript_include_tag "application"
```