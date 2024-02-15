import { BOT_USERNAME } from "@/utils/env";
import { CommandContext, Context, InlineKeyboard } from "grammy";

export async function startBot(ctx: CommandContext<Context>) {
  const from = ctx.from;

  if (!from) {
    return ctx.reply("Please do /start again");
  }

  const { username } = from;

  const introText = `🎉 Welcome to ${BOT_USERNAME}, @${username}! 🎉
  
The first Multi Industry customised Website Builder made entirely through Telegram

Scroll through custom Templates, GPT optimised content Write-up's and even generated Images to ensure you create your dream Website. Once created, you will receive a demo TestNet version, to make sure everything is perfect. From there, we have different hosting options to chose from.

Premium Bot users will have additional benefits such as AI image generation, SEO Implementation and so much more, you can also check that out below!

Happy building!`;

  const keyboard = new InlineKeyboard().text(
    "🛠️ Build a website",
    "build-website"
  );

  await ctx.reply(introText, { reply_markup: keyboard });
}
