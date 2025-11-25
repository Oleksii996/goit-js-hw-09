// Завдання 2 - Форма зворотного зв'язку

//Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }. Умова
let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

// делегування подій
form.addEventListener('input', function (event) {
  const fieldName = event.target.name; // зберігаємо ім'я поля
  const fieldValue = event.target.value; // зберігаємо значення поля

  //присвоєння значення відповідному полю в об'єкті formData
  formData[fieldName] = fieldValue;

  //тепер цю інфу у localStorage
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

// 3. Підзавдання При завантаженні сторінки — перевіряємо localStorage
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
    return; // зупиняємо виконання якщо є порожні поля
  }

  console.log(formData);

  // очистка localStorage і об'єкта formData після submit
  localStorage.removeItem('feedback-form-state');
  formData = { email: '', message: '' };
  form.reset(); // очищає поля форми
});
