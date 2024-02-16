import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context } from "grammy";
import { editHtmlFileText } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";
import { prevMessage } from "@/vars/prevMessage";

export async function template2Step21(ctx: HearsContext<Context>) {
  try {
    const from = ctx.from;
    const message = ctx.message;
    const heroText = message?.text || "";

    if (!from || !message) return ctx.reply("Please do /start again");
    const confirmation = await ctx.reply("Adding...");

    const filePath = path.join(
      process.cwd(),
      "temp",
      `${from.id}-2`,
      "index.html"
    );

    await editHtmlFileText(filePath, "p:eq(9)", heroText);

    const storedPrevMessage = prevMessage[from.id];
    const caption = `"${heroText}" set as footer section's description.\n\nFor the final step, please give pass the title of the project in the next message.\n\nStep 22 of 22`;
    const reply = await ctx.reply(caption);

    userState[from.id] = "2-22";
    prevMessage[from.id] = reply.message_id;
    ctx.deleteMessage();
    ctx.deleteMessages([storedPrevMessage, confirmation.message_id]);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}
