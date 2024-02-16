import { CallbackQueryContext, Context } from "grammy";
import { errorHandler } from "@/utils/handlers";
import { executeStep } from "../creator";
import { userState } from "@/vars/userState";
import { templateSteps } from "../creator/steps";

export async function selectTemplate(ctx: CallbackQueryContext<Context>) {
  const confirmation = await ctx.reply("Getting template ready...");

  const selectedTemplate = Number(
    ctx.callbackQuery.data.replace("select-", "")
  );

  if (
    !isNaN(selectedTemplate) &&
    selectedTemplate &&
    templateSteps[selectedTemplate]
  ) {
    const from = ctx.from;
    if (!from) return ctx.reply("Please send the message again");
    userState[from.id] = `${selectedTemplate}-1`;
    // @ts-expect-error Weird type we have here
    await executeStep(ctx);

    ctx.deleteMessages([confirmation.message_id]).catch((e) => errorHandler(e));
    ctx.deleteMessage().catch((e) => errorHandler(e));
  }
}
