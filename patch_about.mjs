import fs from 'fs';

let content = fs.readFileSync('src/pages/about-me.astro', 'utf8');

// Ensure we get html and css
content = content.replace(
  /const { title, displayTitle = 'about', contactTitle = 'Contact Carlos Ozuna', contactLinks = \[\], meta_description, blocks = \[\], body = '' } = pageData;/,
  `const { title, displayTitle = 'about', contactTitle = 'Contact Carlos Ozuna', contactLinks = [], meta_description, blocks = [], body = '', html = '', css = '' } = pageData;`
);

// We need to inject the CSS into the page and render HTML
// The old block mapping is:
const oldBlocksRendering = `{blocks && blocks.length > 0 ? \\([\s\S]*?\\) : \\(
        <div class="text-block" set:html={body} \/>
      \\)}`;

// If html is present, use it, otherwise fallback to old block mapping
const newRendering = `
      {css && <style set:html={css} />}
      {html ? (
        <div class="grapes-content" set:html={html} />
      ) : blocks && blocks.length > 0 ? (
        blocks.map((block) => (
          <>
            {block.type === 'hero' && (
              <div class="hero-block text-center" style="margin-bottom: 2rem;">
                <h2>{block.title}</h2>
                {block.subtitle && <p>{block.subtitle}</p>}
              </div>
            )}
            {block.type === 'text' && (
              <div class="text-block" set:html={block.content} />
            )}
          </>
        ))
      ) : (
        <div class="text-block" set:html={body} />
      )}
`;

// It's safer to just rewrite the whole file to ensure it's correct.
