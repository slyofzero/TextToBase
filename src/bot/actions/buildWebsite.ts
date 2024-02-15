import {
  generateTemplateKeyboard,
  generateTemplateText,
} from "@/utils/template";
import { CallbackQueryContext, Context, InputFile } from "grammy";

export function buildWebsite(ctx: CallbackQueryContext<Context>) {
  const caption = generateTemplateText(1);
  const keyboard = generateTemplateKeyboard(1);
  const photo = new InputFile("./template-images/1.png");
  ctx.replyWithPhoto(photo, { caption, reply_markup: keyboard });
}
