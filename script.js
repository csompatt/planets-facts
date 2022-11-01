const navigationButton = document.getElementById('hamburger-btn'); // Navigation hamburger button (checkbox)
const mainElement = document.querySelector('.main'); // Main part of body
const planetSelector = document.querySelectorAll('.planet-selector'); // Buttons for select the planet in the navigation (radio)
const planetNavBulletPoint = document.querySelectorAll('.planet-bullet'); // The colorized bullet points in the navigation
const planetName = document.querySelector('.planet-name'); // Element name of the selected planet
const planetDescription = document.querySelector('.info'); // Description of the selected planet
const descriptionSource = document.querySelector('.wikipedia-link'); // Wikipedia link of the selected planet
const rotationTime = document.querySelector('.rotation-data'); // Rotation data of the selected planet
const revolutionTime = document.querySelector('.revolution-data'); // Revolution data of the selected planet
const radius = document.querySelector('.radius-data'); // Radius data of the selected planet
const averageTemp = document.querySelector('.temp-data'); // Temperature data of the selected planet
const planetImage = document.querySelector('.planet-img'); // Planet image element
const planetInternalImage = document.querySelector('.planet-internal'); // Planet internal image element
const planetSurfaceImage = document.querySelector('.planet-surface'); // Planet geology image element
const infoTypeSelector = document.querySelectorAll('.info-type-selector'); // Selector buttons for type of the infos (radio)
const overviewRadioBtn = document.getElementById('overview'); //  The overview type button of the infos (radio)
const root = document.documentElement;

let selectedPlanet = 'Mercury';
let planetDatabase;
fetchDatas();

// ******* Hide the main part of body *****

navigationButton.addEventListener('input', function () {
  mainElement.classList.toggle('hide');
});

// ****** Add click function to the navigation elements

planetSelector.forEach((element) => {
  element.addEventListener('click', function (e) {
    mainElement.classList.remove('hide');
    overviewRadioBtn.checked = true;
    selectedPlanet = e.currentTarget.value;
    navigationButton.checked = false;
    fetchDatas();
  });
});

// ***** Fetch selected planet datas and add to HTML and variable *****

function fetchDatas() {
  fetch('./assets/data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      addColorToBullet(data);
      // ** Search the planet **
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === selectedPlanet) {
          planetDatabase = data[i];
          changeDatas(data[i]);
        }
      }
    });
}

// ** Change the datas in the HTML

function changeDatas(planet) {
  addPlanetName(planet);
  addShortInfos(planet);
  addOverview(planet);
  changeImages(planet);
  createPlanetColorVariable(planet);
}

// ** Add colors to the navigation bulletpoints

function addColorToBullet(array) {
  planetNavBulletPoint.forEach((element) => {
    for (let i = 0; i < array.length; i++) {
      if (element.dataset.name === array[i].name) {
        element.style.color = array[i].color;
      }
    }
  });
}

// ** Add color to the bottom border to info type buttons

function createPlanetColorVariable(planet) {
  root.style.setProperty('--planet-color', planet.color);
}

// ** Add the planet name **
function addPlanetName(planet) {
  planetName.textContent = planet.name;
}

// ** Add planet short infos **
function addShortInfos(planet) {
  rotationTime.textContent = planet.rotation;
  revolutionTime.textContent = planet.revolution;
  radius.textContent = planet.radius;
  averageTemp.textContent = planet.temperature;
}

// ** Add overview text **

function addOverview(planet) {
  planetDescription.textContent = planet.overview.content;
  descriptionSource.href = planet.overview.source;

  planetImage.classList.remove('hide');
  planetInternalImage.classList.add('hide');
  planetSurfaceImage.classList.add('hide');
}

// ** Change images **

function changeImages(planet) {
  planetImage.src = planet.images.planet;
  planetInternalImage.src = planet.images.internal;
  planetSurfaceImage.src = planet.images.geology;
}

// ** Add structure text ** /

function addStructure(planet) {
  planetDescription.textContent = planet.structure.content;
  descriptionSource.href = planet.structure.source;
  planetImage.classList.add('hide');
  planetInternalImage.classList.remove('hide');
  planetSurfaceImage.classList.add('hide');
}

// ** Add geology(surface) text **/

function addGeology(planet) {
  planetDescription.textContent = planet.geology.content;
  descriptionSource.href = planet.geology.source;
  planetImage.classList.remove('hide');
  planetInternalImage.classList.add('hide');
  planetSurfaceImage.classList.remove('hide');
}

// ** Select info type **

infoTypeSelector.forEach((element) => {
  element.addEventListener('click', function (e) {
    // ** Display the selected infos **

    if (e.currentTarget.value === 'overview') {
      addOverview(planetDatabase);
    } else if (e.currentTarget.value === 'structure') {
      addStructure(planetDatabase);
    } else {
      addGeology(planetDatabase);
    }
  });
});
