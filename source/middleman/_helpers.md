```ruby
module SiteHelpers
  def page_title
    [data.page.title, "Josh W Lewis"].compact.join(' | ')
  end

  def page_description
    data.page.description || "Slides by Josh W Lewis"
  end

  def step(id, opts={}, &block)
    content_tag :div, id: id, class: :step, data: opts do
      capture(&block) if block_given?
    end
  end
end
```