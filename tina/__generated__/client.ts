import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: '/Users/cozuna/Documents/WebSites/ozuna.ca/tina/__generated__/.cache/1787521068821', url: 'http://localhost:4001/graphql', token: 'dummy-token', queries,  });
export default client;
  