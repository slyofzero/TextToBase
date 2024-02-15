import fs from "fs";
import path from "path";

export function copyFolderSync(source: string, target: string) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  fs.readdirSync(source).forEach((file) => {
    const sourceFile = path.join(source, file);
    const targetFile = path.join(target, file);

    if (fs.lstatSync(sourceFile).isDirectory()) {
      copyFolderSync(sourceFile, targetFile);
    } else {
      fs.copyFileSync(sourceFile, targetFile);
    }
  });
}
