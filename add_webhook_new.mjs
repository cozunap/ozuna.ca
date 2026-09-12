import fs from 'fs';

let content = fs.readFileSync('src/components/admin/NewProject.jsx', 'utf-8');

const webhookLogic = `
      // Trigger Cloudflare Pages Rebuild
      try {
        await fetch('https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/352756e4-f117-4ab1-9f96-9294f927e1d8', {
          method: 'POST',
        });
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
      }

      alert('¡Proyecto creado y archivos subidos con éxito!');`;

content = content.replace(/alert\('¡Proyecto creado y archivos subidos con éxito!'\);/, webhookLogic);

fs.writeFileSync('src/components/admin/NewProject.jsx', content);
console.log("Updated NewProject.jsx");
