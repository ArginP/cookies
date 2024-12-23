//document.getElementsByClassName('main-content')[0].style.color = 'red';
// Поиск элементов по названию класса, индекс 0 выбирает самый первый класс из найденных, и меняет цвет на красный

document.getElementById('main-action-button').onclick = function () {
    document.getElementById('products').scrollIntoView({behavior: 'smooth'});
}
// scrollIntoView({behavior: 'smooth'}) плавно переносит страницу в нужное место

const links = document.querySelectorAll('.menu-item > a');
// Создаем переменную, которой присваиваем все ссылки(а) в классе .menu-item

for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute('data-link')).scrollIntoView({behavior: 'smooth'});
    }
}
// Цикл, присваивающий функцию по клику всем элементам в links
// Индекс [i] позволяет перебивать все ссылки в переменной, и обрабатывать относящиеся к ним атрибуты
// getAttribute('data-link') привязывает кастомный атрибут к функции

const buttons = document.querySelectorAll('.products-item .button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementById('order').scrollIntoView({behavior: 'smooth'});
    }
}

const prices = document.getElementsByClassName('products-item-price');
document.getElementById('change-currency').onclick = function (e) { // e - событие мыши (event)
    const currentCurrency = e.target.innerText; // Получаем текущую валюту

    let newCurrency = '$';
    let coefficient = 1;
    if (currentCurrency === '$') {
        newCurrency = '₽';
        coefficient = 120.45;
    } else if (currentCurrency === '₽') {
        newCurrency = 'BYN'; // Белорусский рубль
        coefficient = 3.53;
    }
    else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    }

    e.target.innerText = newCurrency; // Меняет внутренний текст кнопки на то что содержится в переменной

    for (let i = 0; i < prices.length; i++) { // Меняет текст цен всех карточек на новую цену в новой валюте
        prices[i].innerText = +(prices[i].getAttribute('data-base-price') * coefficient).toFixed(2) + " " + newCurrency;
        // .toFixed(2) указывает, сколько знаков после точки будет показывать в дробном числе
    }
}

const product = document.getElementById('product');
const customerName = document.getElementById('name');
const phone = document.getElementById('phone');

document.getElementById('order-action').onclick = function () {
    let hasError = false; // По умолчанию ошибки нет

    [product, customerName, phone].forEach((item) => {
        if (!item.value) { // Если значения нет
            item.style.borderColor = 'red';
            hasError = true; // Теперь ошибка есть
        } else {
            item.style.borderColor = ''; // Возвращаем цвет на стандартный
        }
    });

    if (!hasError) { // Если ошибки нет
        [product, customerName, phone].forEach((item) => {
            item.value = ''; // Очищаем все поля
        });
        alert('Спасибо за заказ! Мы скоро свяжемся с вами.');
    }
}
