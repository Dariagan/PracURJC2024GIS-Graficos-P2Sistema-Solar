document.addEventListener('keydown', function (event) {
    if(event.shiftKey) switch (event.keyCode) {    
        // ***** CAMERA MOVEMENT *****
        // GOING DOWN
        case 32: // shift + space
            vec3.subtract(cameraPos, cameraPos, cameraUp.map(x => x * cameraMovSpeed) )     
            break;
    }
    else switch (event.keyCode) {
        // ***** CAMERA MOVEMENT *****
        // GOING FORWARD
        case 87: // W
        case 90: // Z
        case 38: // arrow up
            vec3.add(cameraPos, cameraPos, cameraFront.map(x => x * cameraMovSpeed));  
            break;
        // GOING BACKWARD
        case 83: // S
        case 40: // arrow down
            vec3.subtract(cameraPos, cameraPos, cameraFront.map(x => x * cameraMovSpeed));  
            break;
        // GOING LEFT
        case 65: // A
        case 81: // Q
        case 37:{ // arrow left
            let crossProduct = vec3.create();
            vec3.cross(crossProduct, cameraFront, cameraUp);
            vec3.normalize(crossProduct, crossProduct);
            crossProduct = crossProduct.map(x => x * cameraMovSpeed);
            vec3.subtract(cameraPos, cameraPos, crossProduct);
            break;}
        // GOING RIGHT
        case 68: // D
        case 39:{ // arrow right
            let crossProduct = vec3.create();
            vec3.cross(crossProduct, cameraFront, cameraUp);
            vec3.normalize(crossProduct, crossProduct);
            crossProduct = crossProduct.map(x => x * cameraMovSpeed);
            vec3.add(cameraPos, cameraPos, crossProduct);
            break;}
        // GOING UP
        case 32: // space
            vec3.add(cameraPos, cameraPos, cameraUp.map(x => x * cameraMovSpeed))     
            break;
            
        // ***** CAMERA RESET *****
        case 67: // C
            cameraPos = new Float32Array(initialCamPos);
            cameraUp = new Float32Array(initialCamUp);
            yaw = -90.0; pitch = 0; 
            break;
    } 
});

let canvas = document.getElementById('myCanvas');
canvas.style.cursor = 'none';
const rect = canvas.getBoundingClientRect();
let prevMouseX = rect.x / 2; // x-center of the canvas
let prevMouseY = rect.y / 2; // y-center of the canvas
let firstMouseMov = true;

// CAMERA VARIABLES
const sensibility = 1;
const cameraMovSpeed = sensibility; // in meter per tick
const cameraRotSpeed = sensibility / 10; // in meter per tick
// in degrees
var yaw = -90.0, pitch = 0.0; 

document.addEventListener('mousemove', (event) => {
    const {x, y} = event;
    
    if (firstMouseMov){
        prevMouseX = x;
        prevMouseY = y;
        firstMouseMov = false;
    }
    const xoffset = (x - prevMouseX)*cameraRotSpeed;
    const yoffset = (prevMouseY - y)*cameraRotSpeed; 
    prevMouseX = x;
    prevMouseY = y;

    yaw   += xoffset;
    pitch += yoffset;
    //pitch = Math.min(Math.max(this,-89.0), 89.0);
})

