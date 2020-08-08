import Bot from 'tomon-sdk';

const bot = new Bot();
// replace your fullname & password
bot.startWithPassword('tester#0012', 'Tomon123');
bot.on('MESSAGE_CREATE', async (data) => {
  if (data.d.author?.id === bot.id) {
    return;
  }
  const channelId = data.d.channel_id;
  let reply: string | undefined;
  let files: string[] | undefined;
  switch (data.d.content) {
    case '/hello': {
      reply = `Hello ${data.d.author?.name}`;
      break;
    }
    case '/ping': {
      const ping = new Date().getTime() - new Date(data.d.timestamp).getTime();
      reply = `<@${data.d.author.id}> ${ping}ms`;
      break;
    }
    case '/photo': {
      files = ['./resources/image.png'];
      break;
    }
  }
  if (!reply && !files) {
    return;
  }
  try {
    await bot.api.route(`/channels/${channelId}/messages`).post({ data: { content: reply }, files });
  } catch (e) {
    console.log(e);
  } finally {
  }
});
