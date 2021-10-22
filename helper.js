import fs from "fs";
import path from "path";

const APP_DIR = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(APP_DIR, relativePath);
}
const SRC_DIR = resolveApp("src");
function removeFirstSlash(str) {
  if (str.charAt(0) === "/") {
    return str.slice(1);
  }
  return str;
}

export { resolveApp, SRC_DIR, removeFirstSlash };
