const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const attemptsCounter = document.querySelector('.attempts-counter');
const correctCounter = document.querySelector('.correct-counter');
const wrongCounter = document.querySelector('.wrong-counter');

const characters = [
  'luffy',
  'ace',
  'zoro',
  'nami',
  'robin',
  'yamato',
  'usopp',
  'chopper',
  'franky',
  'kid',
  'marco',
  'oden',
  'bigmom',
  'kaido'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';
let attempts = 0;
let correctAttempts = 0;
let wrongAttempts = 0;

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 28) {
    clearInterval(this.loop);

    const messageContainer = createElement('div', 'message-container');

    const message = createElement('div', 'message');
    message.innerHTML = `
      <h2>Parabéns, ${spanPlayer.innerHTML}!</h2>
      <p>Você completou o jogo em ${timer.innerHTML} segundos com ${attempts} tentativas.</p>
      <p>Acertos: ${correctAttempts}</p>
      <p>Erros: ${wrongAttempts}</p>
    `;

    const playAgainButton = createElement('button', 'play-again-button');
    playAgainButton.textContent = 'Jogar Novamente';
    playAgainButton.addEventListener('click', () => {
      messageContainer.remove();
      resetGame();
    });

    messageContainer.appendChild(message);
    messageContainer.appendChild(playAgainButton);
    document.body.appendChild(messageContainer);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    correctAttempts++;
    correctCounter.textContent = correctAttempts;

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

      wrongAttempts++;
      wrongCounter.textContent = wrongAttempts;
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    attempts++;
    attemptsCounter.textContent = attempts;
    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.gif')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
};

const resetGame = () => {
  grid.innerHTML = '';
  firstCard = '';
  secondCard = '';
  attempts = 0;
  correctAttempts = 0;
  wrongAttempts = 0;
  attemptsCounter.textContent = attempts;
  correctCounter.textContent = correctAttempts;
  wrongCounter.textContent = wrongAttempts;
  startTimer();
  loadGame();
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  attemptsCounter.textContent = attempts;
  correctCounter.textContent = correctAttempts;
  wrongCounter.textContent = wrongAttempts;
  startTimer();
  loadGame();
};
