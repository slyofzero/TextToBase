import { userState } from "@/vars/userState";
import { HearsContext, Context } from "grammy";

export function template1Step1(ctx: HearsContext<Context>) {
  const from = ctx.from;
  if (!from) return ctx.reply("Please do /start again");
  const text =
    "You have selected template 1, just follow the steps as they show and your website would be ready!";

  // copyFolderSync()

  userState[from.id] = "1-2";
  ctx.reply(text);
}
