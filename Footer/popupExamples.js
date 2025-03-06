document.addEventListener("DOMContentLoaded", function() {
  loadFromLocalStorage(); // Local Storage prüfen und ggf. initialisieren

});

function loadFromLocalStorage() {    //Wenn accessories noch nicht vorhanden im localstorage hier erzeugen
  let savedData = JSON.parse(localStorage.getItem("accessories")) || {};

  // Falls noch keine Daten existieren, initialisieren
  if (Object.keys(savedData).length === 0) {
    console.log("Local Storage leer, initialisiere mit Standardwerten...");
    accessories.forEach((accessory) => {
      savedData[accessory.id] = { 
        name: accessory.name, 
        quantity: 0, 
        dimension: 20, 
        totalPrice: 0 
      };
    });
    localStorage.setItem("accessories", JSON.stringify(savedData));
  }

  // Daten ins UI laden
  accessories.forEach((accessory) => {
    if (savedData[accessory.id]) {
      document.getElementById(accessory.quantityId).value = savedData[accessory.id].quantity;
      document.getElementById(accessory.dropdownId).value = savedData[accessory.id].dimension;
      document.getElementById(accessory.outputId).textContent = `${savedData[accessory.id].totalPrice} €`;
    }
  });
}

// VARIABLEN
const popups = [
  {
    showButtonId: 'iShowPopup1',
    overlayId: 'popupOverlay1',
    closeButtonId: 'iClosePopup1',
  },
  {
    showButtonId: 'iShowPopup2',
    overlayId: 'popupOverlay2',
    closeButtonId: 'iClosePopup2',
  },
  {
    showButtonId: 'iShowPopup3',
    overlayId: 'popupOverlay3',
    closeButtonId: 'iClosePopup3',
  },
];

const Ids = [
  {
    IdJ: "iDefined1j", // ID des Ja-Buttons
    IdN: "iDefined1n", // ID des Nein-Buttons
  },
  {
    IdJ: "iDefined2j", // ID des Ja-Buttons
    IdN: "iDefined2n", // ID des Nein-Buttons
  },
  {
    IdJ: "iDefined3j", // ID des Ja-Buttons
    IdN: "iDefined3n", // ID des Nein-Buttons
  }
];

const buttonStates = {};
let width;
let hight;
let deepth;
let material;
let middleH;
let middleV;
let perspective;

//Konfiguration Produktbeispiele  //siehe funktion productexamples
const productConfigurations = [
  { ids: ["iDefined1j", "iDefined1n"], parameters: [120, 110, 50, 50, 50, 20, 20, 1, 0 , 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, "true"]},
  { ids: ["iDefined2j", "iDefined2n"], parameters: [80, 180, 90, 40, 90, 30, 30, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 , 0, 10, 5, "true"] },
  { ids: ["iDefined3j", "iDefined3n"], parameters: [200,50, 150,100,25,25,25,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,"false"] }
];

//Accesoires setzen
  //Produkte 1
  updateAccessoryBasedOnCondition("iDefined1j", "1", 4, 20);
  updateAccessoryBasedOnCondition("iDefined1j", "3", 4, 20);

  //Produkte 1
  updateAccessoryBasedOnCondition("iDefined2j", "1", 4, 30);
  updateAccessoryBasedOnCondition("iDefined2j", "3", 4, 30);

  //Produkte 1
  updateAccessoryBasedOnCondition("iDefined3j", "3", 4, 30);
  updateAccessoryBasedOnCondition("iDefined3j", "4", 4, 40);
  updateAccessoryBasedOnCondition("iDefined3j", "5", 4, 40);



function getData(){
width = localStorage.getItem("iWidth");
hight = localStorage.getItem("iHight");
deepth = localStorage.getItem("iDeepth");
material = localStorage.getItem("iMaterial")
middleH = localStorage.getItem("iMiddleH");
middleV = localStorage.getItem("iMiddleV");
perspective = localStorage.getItem("iPerspective");

// Lade den gespeicherten Zustand aus localStorage und weise ihn direkt buttonStates zu
const savedStates = JSON.parse(localStorage.getItem("buttonStates")) || {}; 
Object.assign(buttonStates, savedStates);
}

function setData(){

  // Speichere das aktualisierte buttonStates-Objekt in localStorage
  localStorage.setItem("buttonStates", JSON.stringify(buttonStates));

//Inputwerte aktualisieren
localStorage.setItem("iWidth", width);
localStorage.setItem("iHight", hight);
localStorage.setItem("iDeepth", deepth);
localStorage.setItem("iMaterial", material);
localStorage.setItem("iMiddleH", middleH);
localStorage.setItem("iMiddleV", middleV);
localStorage.setItem("iPerspective", perspective);
localStorage.setItem("iOversetLeRi", oversetLiRe);
localStorage.setItem("iOversetFoBa", oversetFoBa);
}

// Produktbeispiele bzw konfiguration vorbestimmen
function PreConfigDesign(tHight, tWidth, tDeepth, tmiddleH, tmiddleV, tPerspective, tMaterial ,tFrontTop, tFrontBottom , tLeftTop, tRightTop, tTopMiddle, tBackTop, tBackBottom, tFrontRight, tBackRight, tFrontLeft, tBackLeft, tRightBottom, tLeftBottom, tFrontMiddleCross, tFrontMiddleLength, tBackMiddleCross, tBackMiddleLength, tRightMiddleCross, tLeftMiddleCross, tOversetLiRe, tOversetFoBa, tAddBoard ) {
  // Strebenzustände setzen
  buttonStates["iFrontTop"] = tFrontTop;
  buttonStates["iFrontBottom"] = tFrontBottom;
  buttonStates["iLeftTop"] = tLeftTop;
  buttonStates["iRightTop"] = tRightTop;
  buttonStates["iTopMiddle"] = tTopMiddle;
  buttonStates["iBackTop"] = tBackTop;
  buttonStates["iBackBottom"] = tBackBottom;
  buttonStates["iFrontRight"] = tFrontRight;
  buttonStates["iBackRight"] = tBackRight;
  buttonStates["iFrontLeft"] = tFrontLeft;
  buttonStates["iBackLeft"] = tBackLeft; 
  buttonStates["iRightBottom"] = tRightBottom;
  buttonStates["iLeftBottom"] = tLeftBottom;
  buttonStates["iFrontMiddleCross"] = tFrontMiddleCross;
  buttonStates["iFrontMiddleLenght"] = tFrontMiddleLength;
  buttonStates["iBackMiddleCross"] = tBackMiddleCross;
  buttonStates["iBackMiddleLenght"] = tBackMiddleLength;
  buttonStates["iRightMiddleCross"] = tRightMiddleCross;
  buttonStates["iLeftMiddleCross"] = tLeftMiddleCross;

  // Dimensionen setzen
  hight = tHight;
  width = tWidth;
  deepth = tDeepth;
  middleH = tmiddleH;
  middleV = tmiddleV;
  perspective= tPerspective;
  material = tMaterial;
  materialScaled = (Math.ceil(tMaterial / 5) * 5) / 10; // in cm und in 5 Schritten wandeln;
  
  oversetLiRe = tOversetLiRe;
  oversetFoBa = tOversetFoBa;
  addedBoard = tAddBoard;

setData();
localStorage.setItem("iAddBoard", addedBoard);
}

// Gespeicherte Werte laden
  window.onload = function() {         
    getData();

  }

//Funktionen
function popup() {
  const togglePopup = (popup) => {
    const showButton = document.getElementById(popup.showButtonId);
    const overlay = document.getElementById(popup.overlayId);
    const closeButton = document.getElementById(popup.closeButtonId);

    if (showButton && overlay && closeButton) {
      // Öffnen des Popups
      showButton.addEventListener('click', () => {
        overlay.style.display = 'block';
      });

      // Schließen mit der Schließen-Taste
      closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
      });

    } else {
      console.warn(`Fehlende Elemente für Popup:`, popup);
    }
  };

  // Alle Popups initialisieren
  popups.forEach(togglePopup);
}

function initializeIds() {


  Ids.forEach(({ IdJ, IdN }) => {
    [IdJ, IdN].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener("click", () => {
          localStorage.setItem(id, "true");
           window.location.href = 'index.html';

          productConfigurations.forEach(config => {
            const isActive = config.ids.some(id => localStorage.getItem(id) === "true");
            if (isActive) {
              PreConfigDesign(...config.parameters);
              config.ids.forEach(id => localStorage.setItem(id, "false"));
            }
          });
        });
      } else {
        console.warn(`Element mit ID ${id} nicht gefunden.`);
      }
    });
  });
}


function updateAccessoryBasedOnCondition(Button, IdAccessories, countAccessories, dimensionAccessories) {
  const accessoryId = IdAccessories; // ID, die gerade bearbeiten sollte

  const tButton = document.getElementById(Button);

  tButton.addEventListener("click", () => {





    console.log("test")
    const taccessoriesRaw = localStorage.getItem("accessories");
    const taccessories = taccessoriesRaw ? JSON.parse(taccessoriesRaw) : {};

    if (typeof taccessories !== "object") {
      console.error("accessories ist kein Objekt:", taccessories);
      return;
    }

    // Hole das Accessoire mit der dynamischen ID
    const accessory = taccessories[accessoryId];

    if (accessory) {
      accessory.dimension = dimensionAccessories;
      accessory.quantity += countAccessories;
      console.log(accessory.quantity);
      // Aktualisiere das Dropdown (falls vorhanden)
      const dropdownElement = document.getElementById(accessory.dropdownId);
      const quantityElement = document.getElementById(accessory.quantityId);

      if (dropdownElement) dropdownElement.value = accessory.dimension; // Dimension setzen
      if (quantityElement) quantityElement.value = accessory.quantity; // Menge erhöhen

      // Preisanzeige aktualisieren
      //!!!!!!!!!! updatePriceDisplay(accessory);

      // Speichere das aktualisierte accessories-Objekt zurück in localStorage
      taccessories[accessoryId] = accessory; // Accessoire im Objekt aktualisieren
      localStorage.setItem("accessories", JSON.stringify(taccessories)); // Speichere das ganze Objekt zurück
    } else {
      console.warn(`Accessoire mit ID '${accessoryId}' nicht gefunden.`);
    }
  

  
});
}

// Initialisierungen ausführen
document.addEventListener("DOMContentLoaded", () => {
  popup();
  initializeIds();
});