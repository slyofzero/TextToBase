import { copyFolderSync } from "@/utils/files";
import { errorHandler } from "@/utils/handlers";
import { userState } from "@/vars/userState";
import { CallbackQueryContext, Context } from "grammy";
import path from "path";

export async function createTemplate(
  ctx: CallbackQueryContext<Context>,
  templateId: number
) {
  try {
    const from = ctx.from;
    if (!from) return ctx.reply("Please do /start again");

    await ctx.deleteMessage();
    const text = `You have selected template ${templateId}, just follow the steps as they show and your website would be ready!
    
For the first step, please send the hero text in the next message that would show in the website.`;

    const source = path.join(process.cwd(), "templates", String(templateId));
    const target = path.join(process.cwd(), "temp", `${from.id}-${templateId}`);
    copyFolderSync(source, target);

    userState[from.id] = `${templateId}-1`;
    ctx.reply(text);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please restart again");
  }
}
