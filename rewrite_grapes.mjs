import fs from 'fs';

const fullCode = `
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';

const GrapesEditor = forwardRef(({ initialData }, ref) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const e = grapesjs.init({
      container: editorRef.current,
      fromElement: false,
      height: '100%',
      width: '100%',
      storageManager: false, 
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        [gjsPresetWebpage]: {}
      },
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'
        ]
      }
    });

    if (initialData?.gjsData) {
      e.loadProjectData(initialData.gjsData);
    } else if (initialData?.html) {
      e.setComponents(initialData.html);
      e.setStyle(initialData.css || '');
    } else if (initialData?.body) {
      e.setComponents(initialData.body);
    }

    setEditor(e);

    return () => {
      e.destroy();
    };
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (!editor) return null;
      return {
        gjsData: editor.getProjectData(),
        html: editor.getHtml(),
        css: editor.getCss()
      };
    }
  }));

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <style>{\`
        /* GrapesJS Premium Theme Overrides */
        .gjs-one-bg { background-color: #0d1f3c !important; }
        .gjs-two-color { color: #cbd5e1 !important; }
        .gjs-three-bg { background-color: #b89a5a !important; color: white !important; }
        .gjs-four-color, .gjs-four-color-h:hover { color: #b89a5a !important; }
        .gjs-pn-panel { border-bottom: 1px solid rgba(255,255,255,0.05) !important; box-shadow: none !important; }
        .gjs-pn-views-container { box-shadow: -1px 0 0 rgba(255,255,255,0.05) !important; }
        .gjs-cv-canvas { background-color: #f8fafc !important; }
        .gjs-block { border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 4px !important; }
        .gjs-block:hover { border-color: #b89a5a !important; color: #b89a5a !important; }
        .gjs-sm-sector .gjs-sm-title { background-color: #0a172d !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; }
        .gjs-sm-property { background-color: #0d1f3c !important; }
        .gjs-field { background-color: #0a172d !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 3px !important; }
        .gjs-frame-wrapper { box-shadow: 0 4px 20px rgba(0,0,0,0.05) !important; }
      \`}</style>
      <div ref={editorRef} style={{ flexGrow: 1, width: '100%' }}></div>
    </div>
  );
});

export default GrapesEditor;
`;

fs.writeFileSync('src/components/admin/GrapesEditor.jsx', fullCode);
