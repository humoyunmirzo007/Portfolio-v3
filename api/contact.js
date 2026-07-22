// Vercel serverless function: forwards contact-form submissions to Telegram.
// Requires env vars TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (set in Vercel dashboard).

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body || {};
  if (!name || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ error: 'Telegram is not configured' });
  }

  const text =
    `📬 <b>Новая заявка с портфолио</b>\n\n` +
    `👤 <b>Имя:</b> ${esc(name)}\n` +
    `📞 <b>Телефон:</b> ${esc(phone) || '—'}\n` +
    `✉️ <b>Email:</b> ${esc(email) || '—'}\n` +
    `💬 <b>Сообщение:</b>\n${esc(message)}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    if (!tgRes.ok) {
      return res.status(502).json({ error: 'Telegram API error' });
    }
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Failed to reach Telegram' });
  }
}
