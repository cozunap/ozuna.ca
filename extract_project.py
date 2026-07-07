import os
import re

content_dir = 'src/content/work'
base_dir = '.'

for md_file in os.listdir(content_dir):
    if not md_file.endswith('.md'): continue
    
    slug = md_file.replace('.md', '')
    html_file = os.path.join(base_dir, slug, 'index.html')
    md_path = os.path.join(content_dir, md_file)
    
    if not os.path.exists(html_file):
        print(f"Skipping {slug} (HTML not found)")
        continue
        
    with open(html_file, 'r') as f:
        html = f.read()
    
    with open(md_path, 'r') as f:
        md_content = f.read()
    
    extra_yaml = []
    
    # Extract description
    desc_match = re.search(r'<p class="portfolio-description">\s*(.*?)\s*</p>', html, re.DOTALL)
    if not desc_match:
        desc_match = re.search(r'<div class="portfolio-description">\s*(.*?)\s*</div>', html, re.DOTALL)
        
    if desc_match:
        desc = desc_match.group(1).strip()
        # Escape quotes
        desc = desc.replace('"', '\\"')
        if desc: extra_yaml.append(f'description: "{desc}"')
        
    # Extract link
    link_match = re.search(r'<a href="([^"]+)"[^>]*class="portfolio-link">', html)
    if link_match:
        link = link_match.group(1)
        if link.startswith('http'):
            extra_yaml.append(f'link: "{link}"')
            
    # Extract gallery
    gallery_match = re.search(r'<div class="portfolio-gallery">\s*(.*?)\s*</div>', html, re.DOTALL)
    if gallery_match:
        gallery_html = gallery_match.group(1)
        images = re.findall(r'<img src="\.\.([^"]+)"', gallery_html)
        if images:
            extra_yaml.append("gallery:")
            for img in images:
                extra_yaml.append(f"  - \"{img}\"")
                
    if extra_yaml:
        # Insert before the last ---
        parts = md_content.split('---')
        # parts is ['', ' yaml ', '\n']
        new_yaml = parts[1] + '\n'.join(extra_yaml) + '\n'
        new_md = f"---{new_yaml}---"
        with open(md_path, 'w') as f:
            f.write(new_md)
        
    print(f"Updated {slug}")
