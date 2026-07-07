import os
import re

base_dir = '/Users/cozuna/Documents/WebSites/ozuna.ca'

correct_header = """  <!-- Header -->
  <header class="site-header solid-bg">
    <a href="../index.html" class="site-logo">
      <img src="../assets/images/logo.svg" alt="Carlos Ozuna Logo">
    </a>
    
    <div class="header-actions">
      <nav class="site-nav">
        <ul class="nav-menu">
          <li><a href="../about-me/index.html">About</a></li>
          <li><a href="../work/index.html">Work</a></li>
        </ul>
      </nav>
      
      <a href="#contact" class="btn btn-outline">Contact Me</a>
      
      <button class="menu-toggle" aria-label="Toggle Menu">
        <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
      </button>
    </div>
  </header>

  <!-- Mobile Menu -->
  <div class="mobile-menu-overlay">
    <ul class="mobile-nav-menu">
      <li><a href="../about-me/index.html">About</a></li>
      <li><a href="../work/index.html">Work</a></li>
      <li><a href="#contact">Contact Me</a></li>
    </ul>
  </div>

  <main """

# Regex pattern to match everything from <!-- Header --> to <main
pattern = re.compile(r'<!-- Header -->.*?<main ', re.DOTALL)

count = 0
for root, dirs, files in os.walk(base_dir):
    if root == base_dir:
        continue # Skip root index.html
    
    if '.git' in root or '.cloudflare' in root:
        continue

    for file in files:
        if file == 'index.html':
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Replace
            new_content = pattern.sub(correct_header, content)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                count += 1
                print(f"Updated {filepath}")

print(f"Total updated: {count}")
