const viewButton = document.getElementById("iView");

let Thickness = thick/10; // Materialstärke

// Sichtbarkeitsvariablen für jede Linie
let lineVisibility = [];3

lineVisibility[0] =  buttonStates["iBackBottom"];
lineVisibility[1] = buttonStates["iBackRight"];
lineVisibility[2] = buttonStates["iBackTop"];
lineVisibility[3] = buttonStates["iBackLeft"];

lineVisibility[4] = buttonStates["iLeftBottom"];
lineVisibility[5] = buttonStates["iRightBottom"];
lineVisibility[6] = buttonStates["iRightTop"];
lineVisibility[7] = buttonStates["iLeftTop"];

lineVisibility[8] = buttonStates["iFrontBottom"];
lineVisibility[9] = buttonStates["iFrontRight"];
lineVisibility[10] = buttonStates["iFrontTop"];
lineVisibility[11] = buttonStates["iFrontLeft"];

lineVisibility[12] = buttonStates["iBackMiddleCross"];
lineVisibility[13] = buttonStates["iFrontMiddleCross"];
lineVisibility[14] = buttonStates["iLeftMiddleCross"];

lineVisibility[15] = buttonStates["iRightMiddleCross"];

lineVisibility[16] = buttonStates["iTopMiddle"];
lineVisibility[17] = buttonStates["iFrontMiddleLenght"];
lineVisibility[18] = buttonStates["iBackMiddleLenght"];

// Koordinaten für den Würfelrahmen mit Indexq
var coordinates = {
    0: [0, 0, 0, width, 0, 0],
    1: [width, 0, 0, width, height, 0],
    2: [width, height, 0, 0, height, 0],
    3: [0, height, 0, 0, 0, 0],
    4: [0, 0, 0, 0, 0, length],
    5: [width, 0, 0, width, 0, length],
    6: [width, height, 0, width, height, length],
    7: [0, height, 0, 0, height, length],
    8: [0, 0, length, width, 0, length],
    9: [width, 0, length, width, height, length],
    10: [width, height, length, 0, height, length],
    11: [0, height, length, 0, 0, length],
    12: [0, middleH, 0, width, middleH, 0],
    13: [0, middleH, length, width, middleH, length],
    14: [0, middleH, 0, 0, middleH, length],
    15: [width, middleH, 0, width, middleH, length],
    16: [middleV, height, 0, middleV, height, length],
    17: [middleV, 0, length, middleV, height, length],
    18: [middleV, 0, 0, middleV, height, 0],
};

// Szene, Kamera und Renderer erstellen
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f4f4);

var material = new THREE.MeshStandardMaterial({
    color: 0x404040,
    roughness: 0.5,
    metalness: 0.5,
    envMapIntensity: 1.0,
    emissive: 0x1a1a1a,
    side: THREE.DoubleSide
});

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(150, 150, 150);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Licht hinzufügen
var ambientLight = new THREE.AmbientLight(0x404040, 3);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 20, 10);
directionalLight.intensity = 1.0;
scene.add(directionalLight);

// Gruppe für Rohre
var cubeGroup = new THREE.Group();
scene.add(cubeGroup);
cubeGroup.scale.set(0.7, 0.7, 0.7);

// Funktion zur Erstellung eines quadratischen Rohrs mit Überlappung
function createSquarePipe(x1, y1, z1, x2, y2, z2) {

    var length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2) + Thickness;
    var geometry = new THREE.BoxGeometry(Thickness, Thickness, length);
    var pipe = new THREE.Mesh(geometry, material);

    var direction = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1).normalize();
    var quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);

    pipe.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
    pipe.setRotationFromQuaternion(quaternion);
    cubeGroup.add(pipe);
}



// Lade die Textur (stelle sicher, dass das Bild korrekt geladen wird)
const loader = new THREE.TextureLoader();
const woodTexture = loader.load("images/Holz3.png");

// Material für die Holzplatte mit Textur
var woodMaterial = new THREE.MeshStandardMaterial({
    map: woodTexture,  // Bild als Textur
    roughness: 0.8,
    metalness: 0.2,
    side: THREE.DoubleSide
});

// Funktion zur Erstellung der Holzplatte

const widthWood = parseFloat(width) + Thickness + parseFloat(oversetLiRe);
const ThicknessWood = 5;
const hightWood = parseFloat(height) + Thickness * 2;
const lengthWood = parseFloat(length) + Thickness+ parseFloat(oversetFoBa);;

console.log(oversetLiRe);

function createWoodenTopPlate() {
    var woodGeometry = new THREE.BoxGeometry(widthWood, 5, lengthWood);
    var woodPlate = new THREE.Mesh(woodGeometry, woodMaterial);
    
    woodPlate.position.set(0, hightWood / 2, 0);
    cubeGroup.add(woodPlate);

 
    console.log(addWood);

    if (addWood == "true") {
        woodPlate.visible = true;
    } else {
        woodPlate.visible = false;
    }

}

// Holzplatte hinzufügen
createWoodenTopPlate();


















Object.entries(coordinates).forEach(([index, coord]) => {
    if (lineVisibility[index]) {
        createSquarePipe(coord[0] - width / 2, coord[1] - height / 2, coord[2] - length / 2,
                         coord[3] - width / 2, coord[4] - height / 2, coord[5] - length / 2);
    }
});

// OrbitControls aktivieren
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 150;
controls.maxDistance = 200;
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.target.set(0, 0, 0);
controls.maxPolarAngle = Math.PI / 2;
controls.update();

// Animationsschleife
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Fenstergrößenänderung anpassen
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
