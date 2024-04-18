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
const studyCards = document.querySelector(".study-cards");
const examCards = document.querySelector("#exam-cards");
const examModeProgress = document.querySelector(".sidebar #exam-mode");


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
    studyCards.classList.add('hidden');

    const fragment = new DocumentFragment();
    for (let i = 0; i < allWords.length; i++) {
        const element = document.createElement('span');
        element.classList.add('card');
        element.dataset.index = i;
        element.textContent = allWords[i];
        examCards.append(element);
    };

    examCards.append(fragment);

});


let firstCardIndex = null;

// Обработчик клика на карточке
function handleCardClick(event) {

    const clickedCard = event.target;
    if (clickedCard.classList.contains('.fade-out') || !clickedCard.classList.contains('card')) {
        return
    }
    const clickedIndex = parseInt(clickedCard.dataset.index);


    if (firstCardIndex == null) {
        // Первая выбранная карточка
        firstCardIndex = clickedIndex;
        clickedCard.classList.add('correct');

    } else {
        // Вторая выбранная карточка
        const firstCard = document.querySelector(`[data-index='${firstCardIndex}']`);

        const wordObject = words.find(word => word.word === firstCard.textContent || word.translation === firstCard.textContent);

        if (firstCard.textContent !== clickedCard.textContent) {
            if (wordObject.translation === clickedCard.textContent || wordObject.word === clickedCard.textContent) {
                // Пара подобрана верно
                firstCard.classList.add('fade-out');
                firstCard.style.pointerEvents = "none";
                clickedCard.classList.add('correct', 'fade-out');
                clickedCard.style.pointerEvents = "none";
                firstCardIndex = null;

            } else {
                // Пара подобрана неверно
                clickedCard.classList.add('wrong');
                setTimeout(() => {
                    clickedCard.classList.remove('wrong');
                    firstCard.classList.remove('correct');
                    firstCardIndex = null;

                }, 500);
            }
        }

    }

    // Проверяем, остались ли еще видимые карточки
    if (document.querySelectorAll('.card:not(.fade-out)').length === 0) {
        setTimeout(() => {
            alert('Поздравляем! Вы успешно завершили проверку знаний.');
        }, 700);

    }
}

// Добавляем обработчик клика на контейнер с карточками
examCards.addEventListener('click', handleCardClick);


prepareCard(words[idx]);

updateButtons();
updateWordNumber()