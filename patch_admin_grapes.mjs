import fs from 'fs';

let content = fs.readFileSync('src/components/admin/AdminApp.jsx', 'utf8');

// Add GrapesEditor import
if (!content.includes('import GrapesEditor')) {
  content = content.replace(
    /import React, { useState, useEffect } from 'react';/,
    `import React, { useState, useEffect } from 'react';\nimport GrapesEditor from './GrapesEditor.jsx';`
  );
}

// Replace the Content Blocks section with GrapesEditor
const oldBlocksRegex = /<h3 style={{ \.\.\.styles\.header, fontSize: "1\.8rem"[\s\S]*?<div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>[\s\S]*?<\/div>/;

const newGrapesJSX = `
            <h3 style={{ ...styles.header, fontSize: "1.8rem", borderTop: "1px solid #e2e8f0", paddingTop: "2rem", marginTop: "2rem", marginBottom: "2rem" }}>Visual Builder</h3>
            
            <GrapesEditor 
              initialData={editingDoc} 
              onCancel={() => setEditingDoc(null)}
              onSave={({ gjsData, html, css }) => {
                setEditingDoc({
                  ...editingDoc,
                  gjsData,
                  html,
                  css,
                  // Remove old blocks to clean up DB
                  blocks: []
                });
                // Note: User still needs to click Save Changes at the bottom
                // but we can auto-save here if we want.
              }}
            />
`;

content = content.replace(oldBlocksRegex, newGrapesJSX);

fs.writeFileSync('src/components/admin/AdminApp.jsx', content);
