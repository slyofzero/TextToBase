import path from "path";
import { userState } from "@/vars/userState";
import { HearsContext, Context, InputFile } from "grammy";
import { editHtmlFileText } from "@/utils/template";
import { errorHandler } from "@/utils/handlers";
import { prevMessage } from "@/vars/prevMessage";
import { deleteFileOrFolder, zipFolder } from "@/utils/files";

export async function template2Step22(ctx: HearsContext<Context>) {
  try {
    const from = ctx.from;
    const message = ctx.message;
    const title = message?.text || "";

    if (!from || !message) return ctx.reply("Please do /start again");
    const confirmation = await ctx.reply("Compressing project file...");

    const filePath = path.join(
      process.cwd(),
      "temp",
      `${from.id}-2`,
      "index.html"
    );

    await editHtmlFileText(filePath, "title", title);

    const storedPrevMessage = prevMessage[from.id];
    const caption = "Your project is ready.";

    const folderPath = path.join(process.cwd(), "temp", `${from.id}-2`);
    const zipFolderPath = path.join(process.cwd(), "temp", `${from.id}.zip`);
    await zipFolder(folderPath, zipFolderPath);
    await ctx.replyWithDocument(new InputFile(zipFolderPath), {
      caption,
    });

    delete userState[from.id];
    delete prevMessage[from.id];
    ctx.deleteMessage();
    ctx.deleteMessages([storedPrevMessage, confirmation.message_id]);

    deleteFileOrFolder(folderPath);
    deleteFileOrFolder(zipFolderPath);
  } catch (error) {
    errorHandler(error);
    ctx.reply("Please do /start again");
  }
}
