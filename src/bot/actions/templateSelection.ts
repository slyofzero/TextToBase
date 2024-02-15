import { errorHandler } from "@/utils/handlers";
import {
  generateTemplateKeyboard,
  generateTemplateText,
} from "@/utils/template";
import { CallbackQueryContext, Context, InputFile } from "grammy";

export async function templateSelection(ctx: CallbackQueryContext<Context>) {
  const confirmation = await ctx.reply("Getting template data...");
  const templateId = Number(ctx.callbackQuery.data.replace("template-", ""));
  const caption = generateTemplateText(templateId);
  const keyboard = generateTemplateKeyboard(templateId);

  const photo = new InputFile(`./template-images/${templateId}.png`);
  await ctx.replyWithPhoto(photo, { caption, reply_markup: keyboard });
  ctx.deleteMessages([confirmation.message_id]);
  ctx.deleteMessage().catch((e) => errorHandler(e));
}
