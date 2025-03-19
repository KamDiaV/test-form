// my-netlify-site/netlify/functions/sendForm.js

// Если нужно использовать fetch, подключаем node-fetch
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Проверяем метод запроса
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    // Парсим тело запроса (JSON)
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // Пример: просто выводим в консоль (в реальном проекте - отправка в Телеграм и т.п.)
    console.log('Новая заявка:');
    console.log('Имя:', name);
    console.log('Email:', email);
    console.log('Сообщение:', message);

    // Здесь можно реализовать логику отправки:
    // - в Телеграм
    // - на почту (через сервис типа SendGrid)
    // - в CRM и т.д.

    // Возвращаем ответ
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, msg: 'Form data received' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message }),
    };
  }
};
