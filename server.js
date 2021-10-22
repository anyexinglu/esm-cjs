import express from "express";
import fs from "fs";
import resolve from "enhanced-resolve";

import { SRC_DIR, removeFirstSlash } from "./helper.js";

const app = express();

const myResolve = resolve.create({
  // or resolve.create.sync
  extensions: [".ts", ".js"],
  modules: [SRC_DIR],
  // see more options below
});

app.get("*", (req, res) => {
  let { url } = req;
  if (url === "/") {
    const content = fs.readFileSync("./src/index.html"); // 返回 index.html 文件
    res.status(200).type("html").send(content);
  } else {
    myResolve(SRC_DIR, removeFirstSlash(url), (err, urlPath) => {
      if (err) {
        console.log("..err", err);
      }
      const content = fs.readFileSync(urlPath);
      res
        .status(200)
        .set({ "Content-Type": "application/javascript" })
        .send(content);
    });
  }
});

app.listen(5100);
