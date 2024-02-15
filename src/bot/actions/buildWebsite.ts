import {
  generateTemplateKeyboard,
  generateTemplateText,
} from "@/utils/template";
import { CallbackQueryContext, Context, InputFile } from "grammy";

export async function buildWebsite(ctx: CallbackQueryContext<Context>) {
  const confirmation = await ctx.reply("Getting templates...");
  const caption = generateTemplateText(1);
  const keyboard = generateTemplateKeyboard(1);
  const photo = new InputFile("./template-images/1.png");
  await ctx.replyWithPhoto(photo, { caption, reply_markup: keyboard });
  ctx.deleteMessages([confirmation.message_id]);
}
