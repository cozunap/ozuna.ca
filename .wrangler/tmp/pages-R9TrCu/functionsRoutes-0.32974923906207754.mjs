import { onRequest as __oauth_callback_js_onRequest } from "/Users/cozuna/Documents/WebSites/ozuna.ca/functions/oauth/callback.js"
import { onRequest as __auth_js_onRequest } from "/Users/cozuna/Documents/WebSites/ozuna.ca/functions/auth.js"

export const routes = [
    {
      routePath: "/oauth/callback",
      mountPath: "/oauth",
      method: "",
      middlewares: [],
      modules: [__oauth_callback_js_onRequest],
    },
  {
      routePath: "/auth",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__auth_js_onRequest],
    },
  ]