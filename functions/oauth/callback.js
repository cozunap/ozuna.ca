export async function onRequest(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get("code");
  
  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const client_id = context.env.GITHUB_CLIENT_ID;
  const client_secret = context.env.GITHUB_CLIENT_SECRET;

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(tokenData.error_description || tokenData.error, { status: 400 });
  }

  const token = tokenData.access_token;
  const provider = "github";

  const message = token 
    ? `authorization:${provider}:success:{"token":"${token}","provider":"${provider}"}`
    : `authorization:${provider}:error:{"message":"No token"}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head><title>Authorizing</title></head>
      <body>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("receiveMessage %o", e);
              window.opener.postMessage(
                '${message}',
                e.origin
              );
            }
            if (window.opener) {
              window.addEventListener("message", receiveMessage, false);
              window.opener.postMessage("authorizing:${provider}", "*");
            }
          })();
        </script>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8"
    }
  });
}
