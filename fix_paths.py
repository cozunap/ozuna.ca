import os

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace relative assets paths
    new_content = content.replace('href="./assets/', 'href="/assets/')
    new_content = new_content.replace('src="./assets/', 'src="/assets/')
    new_content = new_content.replace('href="../assets/', 'href="/assets/')
    new_content = new_content.replace('src="../assets/', 'src="/assets/')

    # Replace inter-page navigation
    # from root
    new_content = new_content.replace('href="./about-me/index.html"', 'href="/about-me/"')
    new_content = new_content.replace('href="./work/index.html"', 'href="/work/"')
    new_content = new_content.replace('href="./index.html"', 'href="/"')

    # from subfolders
    new_content = new_content.replace('href="../about-me/index.html"', 'href="/about-me/"')
    new_content = new_content.replace('href="../work/index.html"', 'href="/work/"')
    new_content = new_content.replace('href="../index.html"', 'href="/"')

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

