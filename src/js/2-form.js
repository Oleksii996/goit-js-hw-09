// Завдання 2 - Форма зворотного зв'язку

//Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
let formData = {
  email: '',
  message: '',
};

// Знаходимо форму для роботи.. старт
const form = document.querySelector('.feedback-form');

// 2. Відстежуємо зміни у полях (делегування через подію input на форму)
form.addEventListener('input', function (event) {
  // Отримуємо назву поля (email або message) і його поточне значення
  const fieldName = event.target.name;
  const fieldValue = event.target.value;

  // Оновлюємо об’єкт formData
  formData[fieldName] = fieldValue;

  // Зберігаємо у localStorage як JSON-рядок
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

// 3. При завантаженні сторінки — перевіряємо localStorage
window.addEventListener('DOMContentLoaded', function () {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    // Якщо є збережені дані — розпарсимо їх
    const parsedData = JSON.parse(savedData);

    // Оновлюємо об’єкт formData
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    // Заповнюємо поля форми
    form.email.value = formData.email;
    form.message.value = formData.message;
  }
});

// 4. Обробка відправки форми
form.addEventListener('submit', function (event) {
  event.preventDefault(); // зупиняємо стандартну відправку

  // Перевіряємо, чи заповнені обидва поля
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  // Виводимо об’єкт у консоль
  console.log(formData);

  // Очищаємо все
  localStorage.removeItem('feedback-form-state');
  formData = { email: '', message: '' };
  form.reset(); // очищає поля форми
});
