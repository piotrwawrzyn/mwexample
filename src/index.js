import MarkupWriter from 'markupwriter';

const htmlDumpElement = document.querySelector('#htmlDump');
const textDumpElement = document.querySelector('#textDump');

const htmlString = `
<div class="container">
  <header>
    <img class="logo" src="./resources/logo.png" />
  </header>
  <main>
    <p><strong>markupwriter</strong> is a tiny little library that lets you animate your html code and render it at the same time, just as you were writing it live.</p>
    <a href="https://github.com/piotrwawrzyn/markupwriter" target="_blank" class="btn"><img src="./resources/github.svg"/>Check out on GitHub</a>
  </main>
</div>
`;

const closeTopBar = () => {
  const notificationBar = document.querySelector('#notification-bar');

  if (!notificationBar) return;

  notificationBar.style.display = 'none';
  textDumpElement.style.height = '100vh';
};

/* Handle moblie switch */
const switchOptions = [
  document.querySelector('.picked'),
  document.querySelector('.not-picked')
];

const handleUnpick = el => {
  el.classList.remove('picked');
  el.classList.add('not-picked');
};

const handlePick = el => {
  el.classList.add('picked');
  el.classList.remove('not-picked');
};

for (const [index, optionElement] of switchOptions.entries()) {
  optionElement.addEventListener('click', e => {
    if (!e.target.classList.contains('picked')) {
      if (index === 0) {
        handlePick(switchOptions[0]);
        handleUnpick(switchOptions[1]);
      } else {
        handlePick(switchOptions[1]);
        handleUnpick(switchOptions[0]);
      }

      [htmlDumpElement, textDumpElement].forEach(el => {
        el.classList.toggle('only');
        el.classList.toggle('none');
      });
    }
  });
}

const config = {
  charInterval: 60,
  displayCursor: true,
  pauseAfterTagClose: 180,
  increasingPace: {
    use: true,
    maximumTimesChange: 1.15
  },
  onFinish: () => {
    closeTopBar();
  }
};

const markupWriter = new MarkupWriter(
  htmlDumpElement,
  textDumpElement,
  htmlString,
  config
);

const skipButton = document.querySelector('.button-skip');
skipButton.addEventListener('click', () => {
  markupWriter.renderToEnd();
  closeTopBar();
});

const iconClose = document.querySelector('.icon-close');
iconClose.addEventListener('click', closeTopBar);

markupWriter.start();
