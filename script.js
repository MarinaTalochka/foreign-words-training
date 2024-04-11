const words = [
    {
        word: 'Apple',
        translation: 'Яблоко',
        example: "apples are rich with vitamin C",
    },
    {
        word: 'banana',
        translation: 'Банан',
        example: "banana is very high in calories",
    },
    {
        word: 'strawberry',
        translation: 'Клубника',
        example: "Strawberry season is coming soon"
    },
    {
        word: 'raspberries',
        translation: 'Малина',
        example: "raspberries are a very healthy berry"
    },
    {
        word: 'pear',
        translation: 'Груша',
        example: "the pear has an interesting shape"
    },
    {
        word: 'blackberry',
        translation: 'Ежевика',
        example: "blackberry - a berry for everyone"
    }
]

const card = document.querySelector(".flip-card");
const prevButton = document.querySelector("#back");
const nextButton = document.querySelector("#next");
const testButton = document.querySelector("#exam");
const wordNumberElement = document.querySelector("#current-word");
let idx = 0;

function prepareCard({ word, translation, example }) {
    renderCard({ word, translation, example });
    card.addEventListener("click", (event) => {
        if (idx !== words.length - 1) {
            event.currentTarget.classList.toggle("active");
        }
    });
}

function renderCard({ word, translation, example }) {
    card.querySelector("#card-front h1").textContent = word || "Default Word";
    card.querySelector("#card-back h1").textContent = translation || "Default Translation";
    card.querySelector("#card-back p span").textContent = example || "Default Example";

}

function updateButtons() {
    prevButton.disabled = idx === 0;
    nextButton.disabled = idx === words.length - 1;
}
function updateWordNumber() {
    wordNumberElement.textContent = `${idx + 1} из ${words.length}`;
}

// Добавьте обработчики событий для кнопок
prevButton.addEventListener("click", () => {
    idx = Math.max(0, idx - 1);
    prepareCard(words[idx]);
    updateButtons();
});

nextButton.addEventListener("click", () => {
    idx = Math.min(words.length - 1, idx + 1);
    prepareCard(words[idx]);
    updateButtons();
});

testButton.addEventListener("click", () => {
    // Логика перехода в режим тестирования
    // ...
});

// Вызов функции для подготовки начальной карточки
prepareCard(words[idx]);

updateButtons();
updateWordNumber()

