import { templateDescriptions } from "@/templates/description";
import { CallbackQueryContext, Context } from "grammy";

export function buildWebsite(ctx: CallbackQueryContext<Context>) {
  const { id, category, details, estimatedTime } = templateDescriptions[0];

  const text = `🌐 Choose a Template: 

📜 Template Name: ${id}

📁 Category: ${category}

⏳ Estimated Generation Time: ${estimatedTime}

📝 Template Details:

${details}`;

  ctx.reply(text);
}
