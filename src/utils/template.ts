import { templateDescriptions } from "@/templates";
import { InlineKeyboard } from "grammy";

export function generateTemplateKeyboard(id: number) {
  let prevId = Math.abs((id - 1) % 10);
  prevId = prevId === 0 ? 10 : prevId;
  let nextId = Math.abs((id + 1) % 10);
  nextId = nextId === 0 ? 10 : nextId;

  const keyboard = new InlineKeyboard()
    .text("⬅️ Previous", `template-${prevId}`)
    .text("✏️ Select", `select-${id}`)
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
