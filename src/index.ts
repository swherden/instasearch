/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Thu May 19 2022
 *  File : index.ts
 *******************************************/

import dotenv from "dotenv";
import express from "express";
import { IgApiClient } from "instagram-private-api";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;

const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url
// ig.state.proxyUrl = process.env.IG_PROXY;
(async () => {
  // Execute all requests prior to authorization in the real Android application
  // Not required but recommended
  await ig.simulate.preLoginFlow();
  const loggedInUser = await ig.account.login(
    process.env.IG_USERNAME,
    process.env.IG_PASSWORD
  );
  // The same as preLoginFlow()
  // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  const tagFeed = ig.feed.tags("#horse", "recent");
  const tagFeedItems = await tagFeed.items();
  // tslint:disable-next-line:no-console
  console.log(tagFeedItems);
})();
