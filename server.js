import express from "express";
import fs from "fs";
import path from "path";
import resolve from "enhanced-resolve";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

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
    // const src = path.join(__dirname, "./src");
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

    // let urlPath = resolve.sync(SRC_DIR, url);
  }
  // if (url.includes(".js") || !url.includes(".")) {
  //   if (!url.includes(".")) {
  //     // js 文件，假设没有后缀 / 后缀含 .js 的都是 JS 文件
  //     url += ".js";
  //   }
  // }
});

app.listen(5100);
