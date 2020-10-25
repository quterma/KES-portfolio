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

// getting mediaPresents from JSON
async function getMediaPresents() {
  let result = await fetch("./js/KES.json");
  let data = await result.json();
  let mediaPresents = data.mediaPresents;
  return mediaPresents;
}

// create one mediaPresent
function createMediaPresent(present) {
  const newDiv = document.createElement("div");
  const mediaPresentsContainer = document.querySelector(".mediaPresents__container");
  if (mediaPresentsContainer) {
    mediaPresentsContainer.append(newDiv);
    newDiv.outerHTML = `
    <div class="mediaPresent">
      <div class="mediaPresent__iframe cover" style="background-image: url(${present.coverImageURL});">
        <i class="fab fa-youtube cover__play"></i>
      </div>
      <a href=${present.captionLink} class="mediaPresent__link" target="_blank">${present.captionRussianName}</a>
    </div>
  `;
  }
}

// filling mediaPresents__container with media presents
document.addEventListener("DOMContentLoaded", () => {
  getMediaPresents().then(mediaPresentsArray => {
    mediaPresentsArray.forEach(element => {
      createMediaPresent(element);
    });
  });
});

// uncover media iframe
function uncoverMediaIframe() {
  const coverButtons = document.querySelectorAll('.cover__play');
  for (let i = 0; i < coverButtons.length; i++) {
    coverButtons[i].addEventListener('click', event => {
      coverButtons[i].parentNode.outerHTML = `<iframe class="mediaPresent__iframe" src="https://www.youtube.com/embed/p-Lf_vSIuaY" frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });
  }
}
