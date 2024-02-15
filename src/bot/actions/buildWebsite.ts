import {
  generateTemplateKeyboard,
  generateTemplateText,
} from "@/utils/template";
import { CallbackQueryContext, Context } from "grammy";

export function buildWebsite(ctx: CallbackQueryContext<Context>) {
  const text = generateTemplateText(1);
  const keyboard = generateTemplateKeyboard(1);
  ctx.reply(text, { reply_markup: keyboard });
}
