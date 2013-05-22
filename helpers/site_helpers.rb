module SiteHelpers
  def page_title
    [data.page.title, "Josh W Lewis"].compact.join(' | ')
  end

  def page_description
    data.page.description || "Presentation by Josh W Lewis"
  end

  def step(name, options={}, &block)
    content_tag(:div, id: name, class: :step, data: options ) do
      block_given? ? capture(&block) : nil
    end
  end
end