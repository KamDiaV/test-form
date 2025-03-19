// netlify/functions/sendForm.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Разрешаем только POST-запрос
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    // Парсим тело запроса
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // Считываем токен и chat_id из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Формируем текст сообщения
    const text = `Новая заявка:\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`;

    // Отправляем запрос в Телеграм
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    const telegramData = await telegramRes.json();

    // Проверяем ответ Телеграма
    if (!telegramData.ok) {
      throw new Error('Telegram API error: ' + telegramData.description);
    }

    // Если всё прошло успешно, возвращаем 200
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, msg: 'Form data sent to Telegram' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message }),
    };
  }
};
