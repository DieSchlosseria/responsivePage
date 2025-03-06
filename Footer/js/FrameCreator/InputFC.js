
//____________________VARIABLEN_______________________
let configurations = [];
let currentIndex = 0
let outputText = "";

// Das Output-Element auswählen --> für Popup
const outDim = document.getElementById("outDim");
const outTotalWare = document.getElementById("outTotalWare");
const outTotalWood = document.getElementById("outTotalWood");
const outDeliv = document.getElementById("outDeliv");
const outTotalDel = document.getElementById("outTotalDel");

//HooverButton
let isButtonClicked = false;
let hideTimeout; // Timeout-Variable hinzugefügt
const buttonStates = {};

//Eingabe Maße
let width;
let hight;
let deepth;
let middleH;
let middleV;
let oversetLiRe;
let oversetFoBa;
let woodWidth;
let woodDeepth;

let perspective;
let material;
let materialScaled;

//Input Value
const widthInput = document.getElementById("iWidth") ?? 150;
const hightInput = document.getElementById("iHight");
const deepthInput = document.getElementById("iDeepth");
const MaterialInput = document.getElementById("iMaterial");
const MiddleInput = document.getElementById("iMiddleH");
const MiddleLengthInput = document.getElementById("iMiddleV");
const OversetLiReInput = document.getElementById("iOversetLeRi");
const OversetFoBaInput = document.getElementById("iOversetFoBa");
const perspectiveInput = document.getElementById("iPerspective");

//InOutput (anzeige aktuelle Werte)
const materialOutput = document.getElementById("iMaterialOutput");
const hightOutput = document.getElementById("iHightOutput");
const widthOutput = document.getElementById("iWidthOutput");
const deepthOutput = document.getElementById("iDeepthOutput");
const middleVOutput = document.getElementById("iMiddleVOutput");
const middleHOutput = document.getElementById("iMiddleHOutput");
const OversetLeRiOutput = document.getElementById("iOversetLeRiOutput");
const OversetFoBaOutput = document.getElementById("iOversetFoBaOutput");

const perspectiveOutput = document.getElementById("iPerspectiveOutput");
const add = document.getElementById("iAdd");

//Show
let takenWidth;
let takenHight;
let takenDeepth;

//Preis
let Total = 0;
let TotalFrame = 0;
let TotalWood = 0;


//KONSTANTEN
const PricePerMeter = 8; //Preis pro Meter bei einem 20mm Quadratrohr
const PricePerPeace = 10; //Für ABschnitt zusammenschweißen usw.
const PriceDelivery = 30; // Versand etc.
const PriceWood = 100; //Price pro Quadratmeter



//______________________TEST_________________________

  //Tischplatte hinzufügen
  let addBoard = document.getElementById("iAddBoard");
  var addedBoard = false;

  addBoard.addEventListener("click", function () {
    addedBoard = !addedBoard; // Toggle der Variable
    localStorage.setItem("iAddBoard", addedBoard);
  });


//Eingabe Slider --> führt Input aus
MaterialInput.addEventListener("input", getData);
hightInput.addEventListener("input", getData);
widthInput.addEventListener("input", getData);
deepthInput.addEventListener("input", getData);
MiddleInput.addEventListener("input", getData);
MiddleLengthInput.addEventListener("input", getData);
OversetLiReInput.addEventListener("input", getData);
OversetFoBaInput.addEventListener("input", getData);
perspectiveInput.addEventListener("input", getData);

//Werte übernehmen und limitieren
function updateInput(id, input, min, max) {
  let value = parseInt(input.value);
  value = Math.max(min, Math.min(value, max)); // Begrenze auf min/max
  localStorage.setItem(id, value);
  return value;
  };

//Linien in Canvas zeichnen
function draw(){

//______________________________TEST_______________________________
//Knotenpunkte
let trueCount = 0; // Variable zur Zählung der "true"-Werte
      for (const key in buttonStates) {
        if (buttonStates.hasOwnProperty(key) && buttonStates[key] === true) {
          trueCount++; // Erhöhe die Zählvariable, wenn der Wert "true" ist
        }
      }   
}
  
//Werte von Inputfeld übernehmen Limitieren und in localStorage  speichern
function getData() {
  oversetLiRe =updateInput("iOversetLeRi",OversetLiReInput, 0, 50);
  oversetFoBa =updateInput("iOversetFoBa",OversetFoBaInput, 0, 50);
  
width = updateInput("iWidth", widthInput, 5, 200);
hight = updateInput("iHight", hightInput, 5, 200);
deepth =  updateInput("iDeepth", deepthInput, 5, 200);
let limitMiddleH = hight; 
let limitMiddleV = width;
middleH = updateInput("iMiddleH",MiddleInput, 5, limitMiddleH - 5);
middleV = updateInput("iMiddleV",MiddleLengthInput, 5, limitMiddleV - 5);
perspective = updateInput("iPerspective",perspectiveInput, 25, 60);
material = updateInput("iMaterial", MaterialInput, 15, 50);
materialScaled = (Math.ceil(material/5)*5)/10; //in cm und in 5 schritten wandeln   

ActInput();  

}

function setData(){
  //Inputwerte aktualisieren
  widthInput.value = localStorage.getItem("iWidth") ?? 150;
  localStorage.setItem("iWidth", width);
  
  hightInput.value = localStorage.getItem("iHight") ?? 100;
  localStorage.setItem("iHight", hight);
  
  deepthInput.value = localStorage.getItem("iDeepth") ?? 100;
  localStorage.setItem("iDeepth", deepth);
  
  MaterialInput.value = localStorage.getItem("iMaterial") ?? 30;
  localStorage.setItem("iMaterial", material);
  
  MiddleInput.value = localStorage.getItem("iMiddleH") ?? 80;
  localStorage.setItem("iMiddleH", middleH);
  
  MiddleLengthInput.value = localStorage.getItem("iMiddleV") ?? 65;
  localStorage.setItem("iMiddleV", middleV);
  
  perspectiveInput.value = localStorage.getItem("iPerspective") ?? 26;
  localStorage.setItem("iPerspective", perspective);

  OversetLiReInput.value= localStorage.getItem("iOversetLeRi") ?? 0;
  localStorage.setItem("iOversetLeRi", oversetLiRe);

  OversetFoBaInput.value= localStorage.getItem("iOversetFoBa") ?? 0;
  localStorage.setItem("iOversetFoBa", oversetFoBa);


  }

function getButtons(){
   
    // Lade den gespeicherten Zustand aus localStorage und weise ihn direkt buttonStates zu
      const savedStates = JSON.parse(localStorage.getItem("buttonStates")) || {}; // Hole die gespeicherten Daten oder setze auf {} als Fallback
    // Kopiere die gespeicherten Zustände in das bereits vorhandene buttonStates-Objekt
      Object.assign(buttonStates, savedStates);
    } 

function setButtons(){
  // Speichere das aktualisierte buttonStates-Objekt in localStorage
    localStorage.setItem("buttonStates", JSON.stringify(buttonStates));

}

//Ein/Ausgabe aktualisieren
function ActInput(){ //Ein-Ausgänge aktualisieren

  widthInput.value = width;
  hightInput.value = hight;
  deepthInput.value = deepth;
  MaterialInput.value = materialScaled * 10;
  MiddleLengthInput.value = middleV;
  MiddleInput.value = middleH;
  perspectiveInput.value = perspective;
  OversetLiReInput.value = oversetLiRe;
  OversetFoBaInput.value = oversetFoBa;

  materialOutput.value = materialScaled * 10; 
  hightOutput.value = hight;
  widthOutput.value = width;
  deepthOutput.value = deepth;
  middleVOutput.value = middleV;
  middleHOutput.value = middleH;
  OversetLeRiOutput.value = oversetLiRe;
  OversetFoBaOutput.value = oversetFoBa;
}

//Design löschen
function FuncClear(){
  PreConfigDesign(100, 150, 100, 80, 65, 26, 40,  0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,false);  
}



// Funktion zum Aktualisieren der Button-Position unter Berücksichtigung des Scrollens
function updateButtonPosition(x, y) {
  const button = document.getElementById("iHoverButton");
  // Scrollversatz mit einberechnen
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Button-Position anpassen
  button.style.left = (x - 5 + scrollX) + "px";
  button.style.top = (y - 5 + scrollY) + "px";
}


// Funktion, um den Button bei Mausbewegung auf der Linie anzuzeigen und zu positionieren
function funcHooverButton() {
  const button = document.getElementById("iHoverButton");
  const svg = document.querySelector("svg");

  svg.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const svgRect = svg.getBoundingClientRect(); // Das SVG-Element Rechteck erhalten
      const relativeX = mouseX - svgRect.left; // Relative X-Position innerhalb des SVG
      const relativeY = mouseY - svgRect.top; // Relative Y-Position innerhalb des SVG

      let closestLine = null;
      let closestDistance = Number.MAX_SAFE_INTEGER;

      const lines = document.querySelectorAll(".cCube-line");

      // Finden der nächsten Linie zur Mausposition
      lines.forEach((line) => {
          const lineBox = line.getBBox();
          const lineX = (lineBox.x + lineBox.x + lineBox.width) / 2;
          const lineY = (lineBox.y + lineBox.y + lineBox.height) / 2;
          const distance = Math.sqrt(
              Math.pow(relativeX - lineX, 2) + Math.pow(relativeY - lineY, 2)
          );

          if (distance < closestDistance) {
              closestDistance = distance;
              closestLine = line;
          }
      });

      // Wenn eine Linie gefunden wurde, Button anzeigen und positionieren
      lines.forEach((line) => {
          line.classList.remove("hovered");
      });

      if (closestLine) {
          closestLine.classList.add("hovered");
          button.style.display = "block"; // Button anzeigen
          updateButtonPosition(mouseX, mouseY); // Button-Position aktualisieren
          button.setAttribute("data-line-id", closestLine.id);
      } else {
          button.style.display = "none"; // Button ausblenden, wenn keine Linie in der Nähe
      }
  });

  // Event-Listener für den Button-Klick
  button.addEventListener("click", function () {
      const lineId = button.getAttribute("data-line-id");
      if (lineId) {
          // Toggle den Status der Linie im buttonStates-Objekt
          buttonStates[lineId] = !buttonStates[lineId];
          setButtons();
          console.log(buttonStates); // Den aktuellen Zustand im Konsolenlog ausgeben
      }
  });
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
  materialScaled = (Math.ceil(tMaterial / 5) * 5) / 10; // in cm und in 5 Schritten wandeln;
  
  oversetLiRe = tOversetLiRe;
  oversetFoBa = tOversetFoBa;
  addedBoard = tAddBoard;
setData();
ActInput();  
setButtons();



localStorage.setItem("iAddBoard", addedBoard);
}

// Funktion zur Berechnung der Gesamtwerte
function calculateTotal(buttonStates, dimensions, keys) {
  return keys.reduce((total, key) => total + (buttonStates[key] ? dimensions : 0), 0);
}

//Rückgabewert gleich 0 wenn die entsprechenden streben nicht angewählt sind
function setValueToZero(ButtonList, dimension) {
  for (let button of ButtonList) {
    if (buttonStates[button]) {
      return dimension; // Gibt den Wert von dimension zurück, wenn ein Taster gedrückt ist
    }
  }
  return 0; // Gibt 0 zurück, wenn keiner der Taster gedrückt ist
}

//______________________AUSFÜHREN_____________________

funcHooverButton();

//alle werte zurücksetzen
let clear = document.getElementById("iTrash");
clear.addEventListener('click', FuncClear);

//Seite neu laden
window.onload = function() {
  getButtons();
  setData();
  getData();


  if ( localStorage.getItem("iAddBoard") === "true") {
    addedBoard = true;
  } else {
    addedBoard = false;
  }
  };

//____________________________POPUP_FENSTER______________________________________

const PopUp = document.getElementById('iShowPopup');
let fulllength; 
let delivery;
let countEdge;
let element; 

PopUp.addEventListener('click', () => {
 takenWidth = setValueToZero(["iFrontTop", "iFrontBottom", "iFrontMiddleCross", "iBackTop", "iBackBottom", "iBackMiddleCross"], width);
 takenHight = setValueToZero(["iFrontLeft", "iFrontRight", "iFrontMiddleLength", "iBackLeft", "iBackRight", "iBackMiddleLength"], hight);
 takenDeepth = setValueToZero(["iLeftBottom", "iLeftTop", "iLeftMiddleCross", "iRightBottom", "iRightTop", "iRightMiddleCross", "iTopMiddle"], deepth);

 //Lieferung 
if (takenDeepth > 150 || takenWidth > 150 || takenHight > 150 ) {
  delivery = "Nur Abholung";
} else {
  delivery = "Versand möglich";
};

//Preis berechnen
let trueCount = Object.values(buttonStates).filter(value => value == true).length; //Anzahl schweißpunkte

// Berechnung der Gesamtwerte für Länge, Höhe und Tiefe
let FullWidth = calculateTotal(buttonStates, takenWidth, ["iFrontTop", "iFrontBottom", "iFrontMiddleCross", "iBackTop", "iBackBottom", "iBackMiddleCross"]);
let FullHeight = calculateTotal(buttonStates, takenHight, ["iFrontLeft", "iFrontRight", "iFrontMiddleLength", "iBackLeft", "iBackRight", "iBackMiddleLength"]);
let FullDepth = calculateTotal(buttonStates, takenDeepth, ["iLeftBottom", "iLeftTop", "iLeftMiddleCross", "iRightBottom", "iRightTop", "iRightMiddleCross", "iTopMiddle"]);
let Fulllength = (FullWidth + FullHeight + FullDepth)/100 * (material/20); //Für 20mm Quadratrohr kalkuliert
if (Fulllength > 0) { PricePauschal = PriceDelivery;} else {PricePauschal = 0;};
TotalFrame = Fulllength * PricePerPeace + trueCount * PricePerPeace;
 
//Berechnung Holzplatte
if (addedBoard) {
  woodWidth = (width + oversetLiRe*2);
  woodDeepth = (deepth + oversetFoBa*2);
  TotalWood = woodWidth * woodDeepth / 10000 * PriceWood;

} else {
  TotalWood = 0;
}
Total = TotalWood + TotalFrame;

//_________________AUSGABEWERTE____________________
// Den Wert der Variable in das Output-Element einfügen

outDim.textContent = takenWidth + "X" + takenDeepth + "X" + takenHight ;
outTotalWare.textContent = TotalFrame + "€" ;
outTotalWood.textContent = TotalWood + "€"
outDeliv.textContent = delivery ;
outTotalDel.textContent = PricePauschal + "€";
});
for (const id in buttonStates) {
  if (buttonStates.hasOwnProperty(id)) {
    const status = buttonStates[id];
  }
};

//_________________________________FORMULAR_SENDEN____________________________________
//save Object
add.addEventListener('click', () => {

  for (const id in buttonStates) {
    if (buttonStates.hasOwnProperty(id)) {
      const status = buttonStates[id];
      outputText += ` ID: ${id}, vorhanden: ${status}`;
    }
  };

  // Create  object mit aktuellen configuration
  const currentConfig = {
      Streben: outputText,
      dicke: materialScaled * 10,
      width: takenWidth,
      deepth: takenDeepth,
      hight: takenHight,
      totalWood: TotalWood,
      totalFrame: TotalFrame,
      total: Total,
      versand: PricePauschal,
      widthWood: woodWidth,
      deepthWood: woodDeepth
      };


if (takenWidth > 0 || takenDeepth > 0 || takenHight > 0) {
  
  // Save  current configuration to the array
  configurations[currentIndex] = currentConfig;

  // Increment the index for the next configuration
  currentIndex++;

localStorage.setItem('configurations', JSON.stringify(configurations));
  alert("erfolgreich zum Warenkorb hinzugefügt.");  

} else {
  alert("Bitte wählen sie eine Strebe aus!");  
}
});
//_________________________________________________________________________________---

// Beim Laden der Seite --> Konfigurationen wiederherstellen
window.addEventListener('load', () => {
  // Laden der gespeicherten Konfigurationen aus dem Local Storage
  const storedConfigurations = localStorage.getItem('configurations');
  ActInput();

  // Überprüfen, ob gespeicherte Konfigurationen vorhanden sind
  if (storedConfigurations) {
    configurations = JSON.parse(storedConfigurations);
    currentIndex = configurations.length; // Setzen Sie den Index auf die nächste verfügbare Position
  }

});
























