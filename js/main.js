// aboutme photo caption
const mainPhoto = document.getElementById('aboutmePhoto');
const mainPhotoCaption = document.getElementById('aboutmePhotoCaption');
if (mainPhoto) {
  mainPhoto.addEventListener('mouseover', event => {
    mainPhotoCaption.style.opacity = '1';
  })
  mainPhoto.addEventListener('mouseout', event => {
    mainPhotoCaption.style.opacity = '0';
  })
}

// research_gate icon hover
const rgIconImage = document.getElementById('rgIcon');
if (rgIconImage) {
  rgIconImage.addEventListener('mouseover', event => {
    rgIconImage.src = "./images/rg_yellow.png";
  })
  rgIconImage.addEventListener('mouseout', event => {
    rgIconImage.src = "./images/rg.png";
  })
}

// device drop down menu 
const deviceDropDownButton = document.querySelector('#deviceDropDownButton');
const deviceDropDownMenu = document.querySelector('.nav');
deviceDropDownButton.addEventListener('click', event => {
  if (deviceDropDownMenu.style.display === 'none' || !deviceDropDownMenu.style.display) {
    deviceDropDownMenu.style.display = 'block';
    deviceDropDownButton.classList.add('nav__item--active');
  } else {
    deviceDropDownMenu.style.display = 'none';
    deviceDropDownButton.classList.remove('nav__item--active');
  }
})

// getting MediaPresents from JSON
async function getMediaPresents() {
  const result = await fetch("./js/KES.json");
  const data = await result.json();
  const mediaPresents = data.mediaPresents;
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
  const newDiv = document.createElement("div");
  const mediaPresentsContainer = document.querySelector(".mediaPresents__container");
  if (mediaPresentsContainer) {
    mediaPresentsContainer.append(newDiv);
    if (present.isVideo) {
      newDiv.outerHTML = `
      <div class="mediaPresent">
        <div class="mediaPresent__iframe cover" style="background-image: url(${present.coverImageURL});">
          <i class="fab fa-youtube cover__play" onclick="uncoverMediaIframe(this);"></i>
        </div>
        <a href=${present.captionLink} class="mediaPresent__link" target="_blank">${present.captionRussianName}</a>
      </div>
      `;
    } else {
      newDiv.outerHTML = `
      <div class="mediaPresent">
        <a href="${present.iframeURL}" target="_blank">
          <div class="mediaPresent__iframe cover" style="background-image: url(${present.coverImageURL});"></div>
        </a>
        <a href=${present.captionLink} class="mediaPresent__link" target="_blank">${present.captionRussianName}</a>
      </div>
      `;
    }
  }
}

// filling mediaPresents__container with media presents
let mediaArray;
document.addEventListener("DOMContentLoaded", () => {
  getMediaPresents().then(mediaPresentsArray => {
    mediaPresentsArray.forEach(element => {
      createMediaPresent(element);
    });
    mediaArray = mediaPresentsArray;
  });
});

// uncover media iframe
function uncoverMediaIframe(button) {
  const parent = button.parentNode;
  function checkName(element) {
    return parent.parentNode.innerHTML.includes(element.captionRussianName);
  }
  const iframeURL = mediaArray[mediaArray.findIndex(checkName)].iframeURL;
  parent.outerHTML = `<iframe class="mediaPresent__iframe" src="${iframeURL}" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen scrolling="no"></iframe>`;  
}

// getting Publications from JSON
async function getPublications() {
  const result = await fetch("./js/KES.json");
  const data = await result.json();
  const publications = data.publications;
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
  const newDiv = document.createElement("div");
  const publicationsContainer = document.querySelector(".publications__container");
  if (publicationsContainer) {
    publicationsContainer.append(newDiv);
    newDiv.outerHTML = `
      <div class="publication">
        <p class="publication__paragraph common__text">
          <span class="publication__span publication__author bold">${element.authors}</span>
          <span class="publication__span publication__title">${element.title}</span>
          <span class="publication__span publication__journal italic">
            <a href=${element.journalLink} class="publication__journal__link" target = "_blank" >${element.journal}</a>
          </span>
          <span class="publication__span publication__year">${element.year}.</span>
          <span class="publication__span publication__rest">${element.rest}</span>
        </p>
        <button type="submit" onclick="window.open('${element.fileLink}')" class="button">Read</button>
      </div>
      <div class="publication__line"></div>
    `;
  }
}

// filling Publications container with publications
document.addEventListener("DOMContentLoaded", () => {
  getPublications().then(publicationsArray => {
    publicationsArray.forEach(element => {
      createPublication(element);
    });
  });
});