
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
const totalWordsElement = document.querySelector("#total-word");

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
    totalWordsElement.textContent = words.length;
    wordNumberElement.textContent = `${idx + 1}`;
}


prevButton.addEventListener("click", () => {
    idx = Math.max(0, idx - 1);
    renderCard(words[idx]);
    updateButtons();
    updateWordNumber()
});

nextButton.addEventListener("click", () => {
    idx = Math.min(words.length - 1, idx + 1);
    renderCard(words[idx]);
    updateButtons();
    updateWordNumber()
});


const englishWords = words.map(function (item) {
    return item.word;
});
const russianWords = words.map(function (item) {
    return item.translation;
});
const allWords = [...englishWords, ...russianWords]; // формируем масив из англ и русских слов

testButton.addEventListener('click', function () {

    const fragment = new DocumentFragment();
    for (let i = 0; i < allWords.length; i++) {
        const element = document.createElement('span');
        element.classList.add('card');
        element.textContent = allWords[i];
        totalWordsElement.append(element);
    };
    totalWordsElement.append(fragment);

});


let firstCardIndex = null;

// Обработчик клика на карточке
function handleCardClick(event) {
   
    const clickedCard = event.target;
    const clickedIndex = parseInt(clickedCard.dataset.index);
   
    if (firstCardIndex === null) {
        // Первая выбранная карточка
        firstCardIndex = clickedIndex;
        clickedCard.classList.add('correct');
    } else {
        // Вторая выбранная карточка
        const firstCard = document.querySelector(`[data-index='${firstCardIndex}']`);
        if (words[firstCardIndex] === words[clickedIndex]) {
            // Пара подобрана верно
            firstCard.classList.add('fade-out');
            clickedCard.classList.add('fade-out');
        } else {
            // Пара подобрана неверно
            clickedCard.classList.add('wrong');
            setTimeout(() => {
                clickedCard.classList.remove('wrong');
            }, 500);
        }
        firstCardIndex = null;
    }

    // Проверяем, остались ли еще видимые карточки
    if (document.querySelectorAll('.card:not(.fade-out)').length === 0) {
        alert('Поздравляем! Вы успешно завершили проверку знаний.');
    }
}

// Добавляем обработчик клика на контейнер с карточками
totalWordsElement.addEventListener('click', handleCardClick);


prepareCard(words[idx]);

updateButtons();
updateWordNumber()

