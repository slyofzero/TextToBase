import { CallbackQueryContext, Context } from "grammy";
import * as creator from "../creator";
import { errorHandler } from "@/utils/handlers";

export async function selectTemplate(ctx: CallbackQueryContext<Context>) {
  const confirmation = await ctx.reply("Getting template ready...");

  const selectedTemplate = Number(
    ctx.callbackQuery.data.replace("select-", "")
  );

  if (!isNaN(selectedTemplate) && selectedTemplate) {
    if (selectedTemplate === 1)
      await creator.createTemplate1(ctx, selectedTemplate);
    else if (selectedTemplate === 2)
      await creator.createTemplate2(ctx, selectedTemplate);

    ctx.deleteMessages([confirmation.message_id]);
    ctx.deleteMessage().catch((e) => errorHandler(e));
  }
}
