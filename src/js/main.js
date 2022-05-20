import KES from './KES.json'

// aboutme photo caption
const mainPhoto = document.getElementById('aboutmePhoto');
const mainPhotoCaption = document.getElementById('aboutmePhotoCaption');
if (mainPhoto) {
  mainPhoto.addEventListener('mouseover', (event) => {
    mainPhotoCaption.style.opacity = '1';
  });
  mainPhoto.addEventListener('mouseout', (event) => {
    mainPhotoCaption.style.opacity = '0';
  });
}

// research_gate icon hover
const rgIconImage = document.getElementById('rgIcon');
if (rgIconImage) {
  rgIconImage.addEventListener('mouseover', (event) => {
    rgIconImage.src = './images/rg_yellow.png';
  });
  rgIconImage.addEventListener('mouseout', (event) => {
    rgIconImage.src = './images/rg.png';
  });
}

// device drop down menu
const deviceDropDownButton = document.querySelector('#deviceDropDownButton');
const deviceDropDownMenu = document.querySelector('.nav');
deviceDropDownButton.addEventListener('click', (event) => {
  if (deviceDropDownMenu.style.display === 'none' || !deviceDropDownMenu.style.display) {
    deviceDropDownMenu.style.display = 'block';
    deviceDropDownButton.classList.add('nav__item--active');
  } else {
    deviceDropDownMenu.style.display = 'none';
    deviceDropDownButton.classList.remove('nav__item--active');
  }
});

// getting MediaPresents from JSON
function getMediaPresents() {
  const mediaPresents = KES.mediaPresents;
  function compare(a, b) {
    let comparison = 0;
    const yearA = a.year;
    const yearB = b.year;
    if (yearA > yearB) {
      comparison = 1;
    } else if (yearA < yearB) {
      comparison = -1;
    }
    return comparison * -1;
  }
  mediaPresents.sort(compare);
  return mediaPresents;
}

// create one mediaPresent
function createMediaPresent(present) {
  const newDiv = document.createElement('div');
  const mediaPresentsContainer = document.querySelector('.mediaPresents__container');
  const articlesContainer = document.querySelector('.articles__container');

  if (mediaPresentsContainer) {
    if (present.isVideo) {
      mediaPresentsContainer.append(newDiv);
      const subtitles = present.subtitles
        ? `<span class="sub_button" type="submit" onclick="window.open('${ present.subtitles }')">SUBTITLES</span>`
        : '';
      newDiv.outerHTML = `
      <div class="mediaPresent">
        <div class="mediaPresent__iframe cover" style="background-image: url(${ present.coverImageURL });">
          <i class="fab fa-youtube cover__play" onclick="uncoverMediaIframe(this);"></i>
        </div>
        <a href=${ present.captionLink } class="mediaPresent__link" target="_blank">${ present.captionRussianName }</a>
				${ subtitles }
      </div>
      `;
    }
  }

  if (articlesContainer) {
    if (!present.isVideo) {
      articlesContainer.append(newDiv);
      newDiv.outerHTML = `
      <div class="mediaPresent">
        <a href="${ present.iframeURL }" target="_blank">
          <div class="mediaPresent__iframe cover" style="background-image: url(${ present.coverImageURL });"></div>
        </a>
        <a href=${ present.captionLink } class="mediaPresent__link" target="_blank">${ present.captionRussianName }</a>
      </div>
      `;
    }
  }
}

// filling mediaPresents__container with media presents
let mediaArray;
document.addEventListener('DOMContentLoaded', () => {
  const mediaPresentsArray = getMediaPresents()
  mediaPresentsArray.forEach((element) => {
    createMediaPresent(element);
  });
  mediaArray = mediaPresentsArray;
});

// uncover media iframe
function uncoverMediaIframe(button) {
  const parent = button.parentNode;
  function checkName(element) {
    return parent.parentNode.innerHTML.includes(element.captionRussianName);
  }
  const iframeURL = mediaArray[mediaArray.findIndex(checkName)].iframeURL;
  parent.outerHTML = `<iframe class="mediaPresent__iframe" src="${ iframeURL }" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen scrolling="no"></iframe>`;
}

// getting Publications from JSON
function getPublications() {
  const publications = KES.publications;
  function compare(a, b) {
    let comparison = 0;
    const yearA = a.year;
    const yearB = b.year;
    if (yearA > yearB) {
      comparison = 1;
    } else if (yearA < yearB) {
      comparison = -1;
    }
    return comparison * -1;
  }
  publications.sort(compare);
  return publications;
}

// create one Publication
function createPublication(element) {
  const newDiv = document.createElement('div');
  const publicationsContainer = document.querySelector('.publications__container');

  const reviewContainer = document.querySelector('.js_review__container');
  const workingContainer = document.querySelector('.js_working__container');
  const russianContainer = document.querySelector('.js_russian__container');
  const chaptersContainer = document.querySelector('.js_chapters__container');
  const otherContainer = document.querySelector('.js_other__container');

  if (!publicationsContainer) return;

  const chooseContainer = (type) => {
    switch (type) {
      case 'review':
        return reviewContainer;
      case 'working':
        return workingContainer;
      case 'chapters':
        return chaptersContainer;
      case 'russian':
        return russianContainer;
      case 'other':
        return otherContainer;
      default:
        return otherContainer;
    }
  };

  const choosenContainer = chooseContainer(element.type);
  choosenContainer.append(newDiv);
  const authors = element.coAuthors ? `with ${ element.coAuthors }` : '';
  const journalLink = element.journalLink
    ? `<a href=${ element.journalLink } class="publication__journal__link" target = "_blank" >${ element.journal }</a>`
    : `<span class=".publication__journal__empty-link" >${ element.journal }</span>`;
  newDiv.outerHTML = `
      <div class="publication">
        <p class="publication__paragraph common__text">
          <span class="publication__span publication__title">${ element.title }</span>
          <span class="publication__span publication__journal italic">
						${ journalLink }
          </span>
          <span class="publication__span publication__year">${ element.year }.</span>
          <span class="publication__span publication__rest">${ element.rest }</span>
          <span class="publication__span publication__author">${ authors }</span>
        </p>
        <button type="submit" onclick="window.open('${ element.fileLink }')" class="button rotate">Read</button>
      </div>
      <div class="publication__line"></div>
    `;
}

// filling Publications container with publications
document.addEventListener('DOMContentLoaded', () => {
  getPublications()
    .filter((publication) => publication.hide !== true)
    .forEach((element) => {
      createPublication(element);
    });

});
