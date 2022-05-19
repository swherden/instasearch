/******************************************
 *  Author : Dr. Sebastian Herden
 *  Created On : Thu May 19 2022
 *  File : index.ts
 *******************************************/

import express from "express";

const app = express();
const port = 8080 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
