import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context, InputFile } from "grammy";
import { editHtmlFileText } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";
import { prevMessage } from "@/vars/prevMessage";

export async function template1Step9(ctx: HearsContext<Context>) {
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

    await editHtmlFileText(filePath, "h3:eq(1)", heroText);

    const storedPrevMessage = prevMessage[from.id];
    const photo = new InputFile("./step-images/1/10.png");
    const caption = `"${heroText}" set as the third section's title.\n\nNext up, send the description for the third section in the next message.\n\nStep 9 of 14`;
    const reply = await ctx.replyWithPhoto(photo, { caption });

    userState[from.id] = "1-10";
    prevMessage[from.id] = reply.message_id;
    ctx.deleteMessage();
    ctx.deleteMessages([storedPrevMessage, confirmation.message_id]);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}
