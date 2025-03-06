// Initialisierung der Koordinaten
let LineCoord = {
  FrontTop: {x1: null, y1: null, x2: null, y2: null},
  FrontBottom: {x1: null, y1: null, x2: null, y2: null},
  FrontRight: {x1: null, y1: null, x2: null, y2: null},
  FrontLeft: {x1: null, y1: null, x2: null, y2: null},
  FrontMiddleCross: {x1: null, y1: null, x2: null, y2: null},
  FrontMiddleLength: {x1: null, y1: null, x2: null, y2: null},
  TopMiddle: {x1: null, y1: null, x2: null, y2: null},
  BackTop: {x1: null, y1: null, x2: null, y2: null},
  BackBottom: {x1: null, y1: null, x2: null, y2: null},
  BackRight: {x1: null, y1: null, x2: null, y2: null},
  BackLeft: {x1: null, y1: null, x2: null, y2: null},
  BackMiddleCross: {x1: null, y1: null, x2: null, y2: null},
  BackMiddleLenght: {x1: null, y1: null, x2: null, y2: null},
  RightBottom: {x1: null, y1: null, x2: null, y2: null},
  RightTop: {x1: null, y1: null, x2: null, y2: null},
  LeftBottom: {x1: null, y1: null, x2: null, y2: null},
  LeftTop: {x1: null, y1: null, x2: null, y2: null},
  RightMiddleCross: {x1: null, y1: null, x2: null, y2: null},
  LeftMiddleCross: {x1: null, y1: null, x2: null, y2: null},
};
const lines = [
  "iFrontTop","iTopMiddle", "iFrontBottom", "iFrontLeft", "iFrontRight", "iFrontMiddleCross",
  "iFrontMiddleLenght", "iBackLeft", "iBackTop", "iBackRight", "iBackBottom",
  "iFrontBottom", "iBackMiddleCross", "iBackMiddleLenght", "iLeftTop", 
  "iRightBottom", "iRightTop", "iLeftBottom", "iRightMiddleCross", "iLeftMiddleCross"
];

//SVG Parameter
const WindowWidth = 550;
const WindowHeight = 650;
const scaleFactor = 1.2;

  // Erstelle das Polygon mit Holztextur
  const blade = document.getElementById("polygonGroup");
  const polygon = document.getElementById("iBoardT");;
  const polygonF = document.getElementById("iBoardF");
  const polygonR = document.getElementById("iBoardR");

//______________TEST_____________

let test = document.getElementById("iDisplayLine");
let isActive1 = false; // Die Variable, die getoggelt wird

test.addEventListener("click", function () {
  isActive1 = !isActive1; // Toggle der Variable
//Zustand ausgeben
if (isActive1) {
  test.innerHTML = "Hilfslinien einblenden";
} else {
  test.innerHTML = "Hilfslinien ausblenden";
}
});

// Funktion zum Ändern der Linienbreite
function changeMultipleLineWidths(lineIds, width) {
  const line = document.getElementById(lineIds);
  if (line) {
    line.style.strokeWidth = width;
  }
}

// Zyklischer Ablauf alle 200ms
setInterval(value, 200);

function value() {
  
  // Elemente ein/ausblenden
     displayed(["iFrontMiddleLenght", "iBackMiddleLenght", "iTopMiddle"], "displayV", "flex");
     displayed(["iFrontMiddleCross", "iBackMiddleCross"], "displayH", "flex");
     
     document.querySelectorAll(".cDisplayB").forEach(el => {
      el.style.display = addedBoard ? "flex" : "none";
    });

  lines.forEach(line => createLine(line));
  drawSvg();

  //Zustand ausgeben
  if (!addBoard || !blade) {
    console.error("Fehlende Elemente im DOM: addBoard oder polygon nicht gefunden");
  } else {
    if (addedBoard) {
      addBoard.innerHTML = "Holzplatte entfernen";
      blade.style.display = "flex"; 
      blade.style.position = "relative";
      blade.style.zIndex = "99";
      console.log("Ein");
    } else {
      addBoard.innerHTML = "Holzplatte hinzufügen";
      blade.style.display = "none"; 
      console.log("Aus");
    }
  }

// Funktion zum Zeichnen der Linien im SVG
function drawSvg() {


let hightScaled = hight * scaleFactor;
let widthScaled = width * scaleFactor;
let deepthScaled = deepth * scaleFactor;
let middleVScaled = middleV * scaleFactor;
let middleHScaled = middleH * scaleFactor;

  let offset1 = (1 - Math.sin(perspective * (Math.PI / 180))) * deepthScaled;
  let offset2 = (  Math.sin(perspective * (Math.PI / 180))) * deepthScaled;

  var starty = WindowHeight / 2 - hightScaled / 2 + offset1/2; 
  var startx = WindowWidth / 2 - widthScaled / 2 - offset2/2;  

  // Aktualisierung der Koordinaten
  //Vorne oben
  LineCoord.FrontTop.x1 = startx;
  LineCoord.FrontTop.y1 = starty;
  LineCoord.FrontTop.x2 = startx + widthScaled;
  LineCoord.FrontTop.y2 = starty;

  //Top mitte
  LineCoord.TopMiddle.x1 = startx + middleVScaled;
  LineCoord.TopMiddle.y1 = starty;
  LineCoord.TopMiddle.x2 = startx + middleVScaled + offset2;
  LineCoord.TopMiddle.y2 = starty - offset1;;

  //Vorne unten
  LineCoord.FrontBottom.x1 = startx;
  LineCoord.FrontBottom.y1 = starty + hightScaled;
  LineCoord.FrontBottom.x2 = startx + widthScaled;
  LineCoord.FrontBottom.y2 = starty + hightScaled;
  //Vorne links
  LineCoord.FrontLeft.x1 = startx;
  LineCoord.FrontLeft.y1 = starty;
  LineCoord.FrontLeft.x2 = startx;
  LineCoord.FrontLeft.y2 = starty + hightScaled;
  //Vorne rechts
  LineCoord.FrontRight.x1 = startx + widthScaled;
  LineCoord.FrontRight.y1 = starty;
  LineCoord.FrontRight.x2 = startx + widthScaled;
  LineCoord.FrontRight.y2 = starty + hightScaled;
  //Hinten oben
  LineCoord.BackTop.x1 = startx + offset2;
  LineCoord.BackTop.y1 = starty - offset1;
  LineCoord.BackTop.x2 = startx + widthScaled + offset2;
  LineCoord.BackTop.y2 = starty - offset1;
  //Hinten unten
  LineCoord.BackBottom.x1 = startx + offset2;
  LineCoord.BackBottom.y1 = starty + hightScaled - offset1;
  LineCoord.BackBottom.x2 = startx + widthScaled + offset2;
  LineCoord.BackBottom.y2 = starty + hightScaled - offset1;
  //Hinten links
  LineCoord.BackLeft.x1 = startx + offset2;
  LineCoord.BackLeft.y1 = starty - offset1;
  LineCoord.BackLeft.x2 = startx + offset2;
  LineCoord.BackLeft.y2 = starty + hightScaled - offset1;
  //Hinten rechts
  LineCoord.BackRight.x1 = startx + widthScaled + offset2;
  LineCoord.BackRight.y1 = starty - offset1;
  LineCoord.BackRight.x2 = startx + widthScaled + offset2;
  LineCoord.BackRight.y2 = starty + hightScaled - offset1;
  
  //oben links
  LineCoord.LeftTop.x1 = startx;
  LineCoord.LeftTop.y1 = starty;
  LineCoord.LeftTop.x2 = startx + offset2;
  LineCoord.LeftTop.y2 = starty - offset1;

  //unten links
  LineCoord.LeftBottom.x1 = startx;
  LineCoord.LeftBottom.y1 = starty + hightScaled ;
  LineCoord.LeftBottom.x2 = startx + offset2;
  LineCoord.LeftBottom.y2 = starty + hightScaled - offset1;

  //oben rechts
  LineCoord.RightTop.x1 = startx + widthScaled;
  LineCoord.RightTop.y1 = starty;
  LineCoord.RightTop.x2 = startx + offset2 + widthScaled;
  LineCoord.RightTop.y2 = starty - offset1;

  //unten rechts
  LineCoord.RightBottom.x1 = startx + widthScaled;
  LineCoord.RightBottom.y1 = starty + hightScaled ;
  LineCoord.RightBottom.x2 = startx + widthScaled + offset2;
  LineCoord.RightBottom.y2 = starty + hightScaled - offset1;

  LineCoord.FrontMiddleCross.x1 = startx;
  LineCoord.FrontMiddleCross.y1 = starty  + hightScaled - middleHScaled;
  LineCoord.FrontMiddleCross.x2 = startx + widthScaled ;
  LineCoord.FrontMiddleCross.y2 = starty  + hightScaled  - middleHScaled;

  LineCoord.FrontMiddleLength.x1 = startx + middleVScaled;
  LineCoord.FrontMiddleLength.y1 = starty;
  LineCoord.FrontMiddleLength.x2 = startx + middleVScaled;
  LineCoord.FrontMiddleLength.y2 = starty + hightScaled;

  LineCoord.BackMiddleCross.x1 = startx + offset2;
  LineCoord.BackMiddleCross.y1 = starty  + hightScaled - middleHScaled - offset1;
  LineCoord.BackMiddleCross.x2 = startx + widthScaled + offset2;
  LineCoord.BackMiddleCross.y2 = starty  + hightScaled  - middleHScaled - offset1;

  LineCoord.BackMiddleLenght.x1 = startx + middleVScaled + offset2;
  LineCoord.BackMiddleLenght.y1 = starty - offset1;
  LineCoord.BackMiddleLenght.x2 = startx + middleVScaled + offset2;
  LineCoord.BackMiddleLenght.y2 = starty + hightScaled - offset1;

  LineCoord.RightMiddleCross.x1 = startx + widthScaled ;
  LineCoord.RightMiddleCross.y1 = starty  + hightScaled - middleHScaled;
  LineCoord.RightMiddleCross.x2 = startx + widthScaled + offset2;
  LineCoord.RightMiddleCross.y2 = starty  + hightScaled - middleHScaled - offset1;

  LineCoord.LeftMiddleCross.x1 = startx;
  LineCoord.LeftMiddleCross.y1 = starty  + hightScaled - middleHScaled;
  LineCoord.LeftMiddleCross.x2 = startx + offset2;
  LineCoord.LeftMiddleCross.y2 = starty  + hightScaled - middleHScaled - offset1;

  DrawLine(LineCoord.FrontTop, "iFrontTop");
  DrawLine(LineCoord.FrontBottom, "iFrontBottom");
  DrawLine(LineCoord.FrontRight, "iFrontRight");
  DrawLine(LineCoord.FrontLeft, "iFrontLeft");
  DrawLine(LineCoord.BackTop, "iBackTop");
  DrawLine(LineCoord.BackBottom, "iBackBottom");
  DrawLine(LineCoord.BackRight, "iBackRight");
  DrawLine(LineCoord.BackLeft, "iBackLeft");
  DrawLine(LineCoord.LeftTop, "iLeftTop");
  DrawLine(LineCoord.LeftBottom, "iLeftBottom");
  DrawLine(LineCoord.RightTop, "iRightTop");
  DrawLine(LineCoord.RightBottom, "iRightBottom");
  DrawLine(LineCoord.FrontMiddleCross, "iFrontMiddleCross");
  DrawLine(LineCoord.FrontMiddleLength,  "iFrontMiddleLenght");
  DrawLine(LineCoord.BackMiddleCross, "iBackMiddleCross");
  DrawLine(LineCoord.BackMiddleLenght, "iBackMiddleLenght");
  DrawLine(LineCoord.RightMiddleCross,  "iRightMiddleCross");
  DrawLine(LineCoord.LeftMiddleCross,  "iLeftMiddleCross");
  DrawLine(LineCoord.TopMiddle, "iTopMiddle");

      //Skalierung perspektive + übermaß Holzplatte
      let offset10 = (1 - Math.sin(perspective * (Math.PI / 180))) * oversetFoBa;
      let offset20 = (  Math.sin(perspective * (Math.PI / 180))) * oversetFoBa;
    
    const Thickness = -10;

    const p1X = LineCoord.FrontTop.x1 - oversetLiRe - offset20;
    const p1Y = LineCoord.FrontTop.y1 + offset10 + Thickness;
    const p2X = LineCoord.FrontTop.x2 + oversetLiRe - offset20 ;
    const p2Y = LineCoord.FrontTop.y2 + offset10 + Thickness;
    const p3X = LineCoord.BackTop.x2 + oversetLiRe + offset20;
    const p3Y = LineCoord.BackTop.y2 - offset10 + Thickness;
    const p4X = LineCoord.BackTop.x1 - oversetLiRe + offset20;
    const p4Y = LineCoord.BackTop.y1 - offset10 + Thickness;
    
      polygon.setAttribute("points", `${p1X},${p1Y} ${p2X},${p2Y} ${p3X},${p3Y} ${p4X},${p4Y}`);

      const f1X = LineCoord.FrontTop.x1 - oversetLiRe - offset20;
      const f1Y = LineCoord.FrontTop.y1 + offset10 ;
      const f2X = LineCoord.FrontTop.x2 + oversetLiRe - offset20 ;
      const f2Y = LineCoord.FrontTop.y2 + offset10;
      const f3X = LineCoord.FrontTop.x2 + oversetLiRe - offset20 ;
      const f3Y = LineCoord.FrontTop.y2 + offset10 + Thickness;
      const f4X = LineCoord.FrontTop.x1 - oversetLiRe - offset20;
      const f4Y = LineCoord.FrontTop.y1 + offset10 + Thickness;

      polygonF.setAttribute("points", `${f1X},${f1Y} ${f2X},${f2Y} ${f3X},${f3Y} ${f4X},${f4Y}`);

      const l1X = LineCoord.FrontTop.x2 + oversetLiRe - offset20 ;
      const l1Y =LineCoord.FrontTop.y2 + offset10 + Thickness;
      const l2X = LineCoord.FrontTop.x2 + oversetLiRe - offset20 ;
      const l2Y = LineCoord.FrontTop.y2 + offset10 ;


      const l3X = LineCoord.BackTop.x2 + oversetLiRe + offset20 ;
      const l3Y = LineCoord.BackTop.y2 - offset10 ;
      const l4X = LineCoord.BackTop.x2 + oversetLiRe + offset20 ;
      const l4Y = LineCoord.BackTop.y2 - offset10 + Thickness;

      polygonR.setAttribute("points", `${l1X},${l1Y} ${l2X},${l2Y} ${l3X},${l3Y} ${l4X},${l4Y}`);
  }
}

// Funktion zum Zeichnen einer Linie mit den Koordinaten
function DrawLine(coord, Id) {
  let line = document.getElementById(Id);
  if (line) {
    line.setAttribute('x1', coord.x1);
    line.setAttribute('y1', coord.y1);
    line.setAttribute('x2', coord.x2);
    line.setAttribute('y2', coord.y2);




  }
}

// Funktion zum Erstellen und Anpassen einer Linie
function createLine(Line) {
  const tLine = document.getElementById(Line);
  
  // Überprüfen, ob die Linie sichtbar sein soll
  if (buttonStates[Line]) {
    tLine.style.stroke = "black";
    tLine.style.strokeDasharray = "none";
    tLine.parentNode.appendChild(tLine); // Linie nach vorne bringen
    changeMultipleLineWidths(Line, materialScaled);
  } else {
    tLine.style.stroke = "";
    tLine.style.strokeDasharray = "10, 1";
    tLine.style.strokeWidth = ""; // Zurücksetzen, damit CSS wieder greift
  }
 if (isActive1) {
  if (!buttonStates[Line]) {
    tLine.style.stroke = "none";
  }
 }
 
}

//Ein/Ausblenden
function displayed(ButtonList, id, show) {
  // Hole das Element anhand der ID
  let element = document.getElementById(id);

  // Überprüfe, ob das Element gefunden wurde
  if (!element) {
      console.error("Element mit ID " + id + " nicht gefunden.");
      return;
  }

  // Prüfen, ob einer der Buttons aktiv ist (true)
  let showElement = false;
  for (let button of ButtonList) {
      if (buttonStates[button]) {
          showElement = true;
          break; // Wenn einer wahr ist, abbrechen und das Element anzeigen
      }
  }

  // Blende das Element ein oder aus
  if (showElement) {
      element.style.display = show; // Element anzeigen
  } else {
      element.style.display = "none"; // Element ausblenden
  }
}




