import { CallbackQueryContext, Context } from "grammy";
import { createTemplate } from "../creator";

export function selectTemplate(ctx: CallbackQueryContext<Context>) {
  const selectedTemplate = Number(
    ctx.callbackQuery.data.replace("select-", "")
  );

  if (!isNaN(selectedTemplate) && selectedTemplate)
    createTemplate(ctx, selectedTemplate);
}
