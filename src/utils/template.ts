import { templateDescriptions } from "@/templates";
import { InlineKeyboard } from "grammy";
import { load } from "cheerio";
import fs from "fs/promises";

export function generateTemplateKeyboard(id: number) {
  let prevId = Math.abs((id - 1) % 10);
  prevId = prevId === 0 ? 10 : prevId;
  let nextId = Math.abs((id + 1) % 10);
  nextId = nextId === 0 ? 10 : nextId;

  const { preview } = templateDescriptions[id - 1];

  const keyboard = new InlineKeyboard()
    .url("👁️ Preview", preview)
    .text("✏️ Select", `select-${id}`)
    .row()
    .text("⬅️ Previous", `template-${prevId}`)
    .text("Next ➡️", `template-${nextId}`);

  return keyboard;
}

export function generateTemplateText(id: number) {
  const { name, category, details, estimatedTime } =
    templateDescriptions[id - 1];

  const text = `🌐 Choose a Template: 

📜 Template Name: ${name}

📁 Category: ${category}

⏳ Estimated Generation Time: ${estimatedTime}

📝 Template Details:

${details}`;

  return text;
}

export async function editHtmlFileText(
  filePath: string,
  identifier: string,
  text: string
) {
  const data = await fs.readFile(filePath, "utf8");
  const $ = load(data);
  $(identifier).text(text || "");
  await fs.writeFile(filePath, $.html(), "utf8");
}

export async function editHtmlFileImage(
  filePath: string,
  identifier: string,
  newSrc: string
) {
  const data = await fs.readFile(filePath, "utf8");
  const $ = load(data);
  $(identifier).attr("src", newSrc);
  $(identifier).attr("srcset", newSrc);
  await fs.writeFile(filePath, $.html(), "utf8");
}

export async function editHtmlLink(
  filePath: string,
  identifier: string,
  newSrc: string
) {
  const data = await fs.readFile(filePath, "utf8");
  const $ = load(data);
  $(identifier).attr("href", newSrc);
  await fs.writeFile(filePath, $.html(), "utf8");
}
