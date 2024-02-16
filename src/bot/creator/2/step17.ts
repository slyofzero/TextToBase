import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context, InputFile } from "grammy";
import { editHtmlFileText } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";
import { prevMessage } from "@/vars/prevMessage";

export async function template2Step17(ctx: HearsContext<Context>) {
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

    await editHtmlFileText(filePath, "p:eq(7)", heroText);

    const storedPrevMessage = prevMessage[from.id];
    const photo = new InputFile("./step-images/2/18.png");
    const caption = `"${heroText}" set as the third section's description.\n\nNext up, send the link the third's button would lead to in the next message.\n\nStep 18 of 22`;
    const reply = await ctx.replyWithPhoto(photo, { caption });

    userState[from.id] = "2-18";
    prevMessage[from.id] = reply.message_id;
    ctx.deleteMessage();
    ctx.deleteMessages([storedPrevMessage, confirmation.message_id]);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}
