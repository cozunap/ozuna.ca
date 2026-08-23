import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '30d193184bef95f1ef83c4922bba00618b1a7afb', queries,  });
export default client;
  