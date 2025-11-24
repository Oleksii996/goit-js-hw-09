//Завдання 2 - Форма зворотного зв'язку
// Ключ локального сховища
const STORAGE_KEY = 'feedback-form-state';

// 1. Об’єкт formData за умовчанням
const formData = {
  email: '',
  message: '',
};

// 2. Пошук форми
const form = document.querySelector('.feedback-form');

// 3. Завантаження збережених даних при відкритті сторінки
loadFormData();

// 4. Відстежуємо input на формі (делегування)
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);

// ----------------- ФУНКЦІЇ -----------------

function onInput(event) {
  // ігноруємо, якщо це не email або message
  if (event.target.name === 'email') {
    formData.email = event.target.value.trim();
  }

  if (event.target.name === 'message') {
    formData.message = event.target.value.trim();
  }

  // зберігаємо в сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) return; // якщо нічого немає — виходимо

  const parsedData = JSON.parse(savedData);

  // Записуємо дані у formData
  formData.email = parsedData.email;
  formData.message = parsedData.message;

  // Заповнюємо інтерфейс форми
  form.elements.email.value = parsedData.email;
  form.elements.message.value = parsedData.message;
}

function onSubmit(event) {
  event.preventDefault();

  // Перевіряємо заповненість
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Виводимо актуальні дані
  console.log(formData);

  // Очищаємо все
  formData.email = '';
  formData.message = '';
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}
