import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context } from "grammy";
import { editHtmlFileText } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";
import { prevMessage } from "@/vars/prevMessage";

export async function template1Step13(ctx: HearsContext<Context>) {
  try {
    const from = ctx.from;
    const message = ctx.message;
    const heroText = message?.text || "";

    if (!from || !message) return ctx.reply("Please do /start again");
    const confirmation = await ctx.reply("Adding...");

    const filePath = path.join(
      process.cwd(),
      "temp",
      `${from.id}-1`,
      "index.html"
    );

    await editHtmlFileText(filePath, "p:eq(3)", heroText);

    const storedPrevMessage = prevMessage[from.id];
    const text = `"${heroText}" set as the sub- section's title.\n\nFor the final step, please give pass the title of the project in the next message.\n\nStep 14 of 14`;
    const reply = await ctx.reply(text);

    userState[from.id] = "1-14";
    prevMessage[from.id] = reply.message_id;
    ctx.deleteMessage();
    ctx.deleteMessages([storedPrevMessage, confirmation.message_id]);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}
