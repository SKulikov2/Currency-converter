// Объект с курсами 3 валют
const rates = {}; 

// Элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
const elementJPY = document.querySelector('[data-value="JPY"]');

// Элементы формы: ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector('#input')
const result = document.querySelector('#result')
const select = document.querySelector('#select')



getCurrencies() //Вызов функции
setInterval (getCurrencies, 10000) // Автообновление данных через каждые 10 сек

// Функция получения курса валют и отображения их на странице
async function getCurrencies () {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const data = await response.json()
    const result = await data


    rates.USD = result.Valute.USD
    rates.EUR = result.Valute.EUR
    rates.GBP = result.Valute.GBP
    rates.JPY = result.Valute.JPY

    //console.log(rates);

    elementUSD.textContent = rates.USD.Value.toFixed(2)
    elementEUR.textContent = rates.EUR.Value.toFixed(2)
    elementGBP.textContent = rates.GBP.Value.toFixed(2)
    elementJPY.textContent = rates.JPY.Value.toFixed(2)

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('bottom')
    } else {
        elementUSD.classList.add('top')
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('bottom')
    } else {
        elementEUR.classList.add('top')
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('bottom')
    } else {
        elementGBP.classList.add('top')
    }

    if (rates.JPY.Value > rates.JPY.Previous) {
        elementJPY.classList.add('bottom')
    } else {
        elementJPY.classList.add('top')
    }

    }


// Слушаем изменения в поле ввода и в Select
input.oninput = convertValue
select.oninput = convertValue

// Функция конвертации валюты
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2)

}