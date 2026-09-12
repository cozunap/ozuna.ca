import fs from 'fs';

let content = fs.readFileSync('src/components/admin/ProjectsList.jsx', 'utf-8');

const webhookLogic = `      if (error) {
        alert('Error eliminando: ' + error.message);
      } else {
        // Trigger Cloudflare Pages Rebuild
        try {
          await fetch('https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/352756e4-f117-4ab1-9f96-9294f927e1d8', {
            method: 'POST',
          });
        } catch (webhookError) {
          console.error('Webhook error:', webhookError);
        }
        setProjects(projects.filter(p => p.id !== id));
      }`;

content = content.replace(/      if \(error\) \{\n        alert\('Error eliminando: ' \+ error\.message\);\n      \} else \{\n        setProjects\(projects\.filter\(p => p\.id !== id\)\);\n      \}/, webhookLogic);

fs.writeFileSync('src/components/admin/ProjectsList.jsx', content);
console.log("Updated ProjectsList.jsx");
