const bodyElement = document.querySelector('.body');
const navigationButton = document.getElementById('hamburger-btn');
const planetSelector = document.querySelectorAll('.planet-selector');
const planetName = document.querySelector('.planet-name');
const planetDescription = document.querySelector('.info');
const descriptionSource = document.querySelector('.wikipedia-link');
const rotationTime = document.querySelector('.rotation-data');
const revolutionTime = document.querySelector('.revolution-data');
const radius = document.querySelector('.radius-data');
const averageTemp = document.querySelector('.temp-data');
const planetImage = document.querySelector('.planet-img');
const planetInternalImage = document.querySelector('.planet-internal');
const planetSurfaceImage = document.querySelector('.planet-surface');
const infoTypeSelector = document.querySelectorAll('.info-type-selector');
const planetInfoLabel = document.querySelectorAll('.planet-info-label');
const overviewRadioBtn = document.getElementById('overview');

let selectedPlanet = 'Mercury';
let planetDatabase;
fetchDatas();

navigationButton.addEventListener('input', function () {
  bodyElement.classList.toggle('hide-overflow');
});

planetSelector.forEach((element) => {
  element.addEventListener('click', function (e) {
    overviewRadioBtn.checked = true;
    selectedPlanet = e.currentTarget.value;
    navigationButton.checked = false;
    bodyElement.classList.remove('hide-overflow');
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

function createPlanetColorVariable(planet) {
  const root = document.documentElement;
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
