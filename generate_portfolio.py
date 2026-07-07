import re
import os

html_path = 'work/index.html'
out_dir = 'src/content/work'

with open(html_path, 'r') as f:
    content = f.read()

# Pattern for portfolio items
pattern = r'<article class="portfolio-item" data-category="([^"]+)">\s*<a href="\.\./([^/]+)/index\.html" class="portfolio-link">\s*<div class="portfolio-image-wrapper">\s*<img src="\.\./([^"]+)" alt="([^"]+)" loading="lazy">\s*</div>\s*<div class="portfolio-overlay">\s*<div class="portfolio-text">\s*<h3>([^<]+)</h3>\s*<span class="portfolio-cat">([^<]+)</span>\s*</div>\s*</div>\s*</a>\s*</article>'

matches = re.findall(pattern, content)

for match in matches:
    category = match[0]
    slug = match[1]
    image_src = match[2]
    # Clean up image path (should start with /assets/)
    if not image_src.startswith('/'):
        image_src = '/' + image_src
    alt_text = match[3]
    title = match[4]
    cat_text = match[5]

    md_content = f"""---
title: "{title}"
category: "{category}"
image: "{image_src}"
---
"""
    file_path = os.path.join(out_dir, f'{slug}.md')
    with open(file_path, 'w') as f:
        f.write(md_content)

print(f"Generated {len(matches)} portfolio items.")
