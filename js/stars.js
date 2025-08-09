const SCALE_DIVIDER = 4;
const MAX_Z = 50;

const canvas = document.getElementById("stars");
let ctx = undefined;
let starCount = undefined;
let stars = undefined;

let targetSpeed = 0.08;
let speed = targetSpeed;

let acceleration = 0.005;

export function setFlySpeed(desiredSpeed, acc) {
    targetSpeed = desiredSpeed;
    acceleration = acc;
}

function computeStarsScreenPosition() {
    for (let i = 0; i < starCount; i++) {
        stars.screenX[i] = stars.x[i] / stars.z[i];
        stars.screenY[i] = stars.y[i] / stars.z[i];

        stars.screenX[i] = Math.floor(stars.screenX[i] + canvas.width/2);
        stars.screenY[i] = Math.floor(stars.screenY[i] + canvas.height/2);

    }
}

function drawStars(stars) {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    computeStarsScreenPosition();
    for (let i = 0; i < starCount; i++) {
        if (stars.screenX[i] >= canvas.width) continue;
        if (stars.screenY[i] >= canvas.height) continue;

        if (stars.screenX[i] < 0) continue;
        if (stars.screenY[i] < 0) continue;

        const index = Math.floor((stars.screenX[i] + (stars.screenY[i] * canvas.width)) * 4);

        imageData.data[index] = 255;
        imageData.data[index + 1] = 255;
        imageData.data[index + 2] = 255;
        // imageData.data[index + 3] = (255 - ((stars.z[i]/MAX_Z) * 255)) + 100;
        imageData.data[index + 3] = 255 - (5.1 * stars.z[i]);
    }

    ctx.putImageData(imageData, 0, 0);
}

function loop() {
    if (speed != targetSpeed) {
        if (speed > targetSpeed) {
            speed -= acceleration;
        } else {
            speed += acceleration;
        }
    }

    for (let i = 0; i < starCount; i++) {
        stars.z[i] -= speed;
        // console.log(stars.x, stars.y, stars.z);

        // if outside the screen

        if (speed > 0) {
            if ((stars.screenX[i] >= canvas.width || stars.screenX[i] <= 0) ||
                (stars.screenY[i] >= canvas.height || stars.screenY[i] <= 0)) {
                stars.x[i] = ((Math.random() * canvas.width) - (canvas.width/2)) * MAX_Z;
                stars.y[i] = ((Math.random() * canvas.height) - (canvas.height/2)) * MAX_Z;
                // star.init();
                stars.z[i] = MAX_Z + (stars.z[i] % 1);
            }
        } else if (speed < 0) {
            if (stars.z[i] > MAX_Z) {
                stars.x[i] = ((Math.random() * canvas.width) - (canvas.width/2)) * MAX_Z;
                stars.y[i] = ((Math.random() * canvas.height) - (canvas.height/2)) * MAX_Z;
                stars.z[i] = -(stars.z[i] % 1);
                // console.log("uhm");
            }
        }
        // if too dark to be seen (only applicable if going backwards)

    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars(stars);

    requestAnimationFrame(loop);
};

function init(b) {
    if (!canvas.getContext) {
        throw "JHAGDSHKAJ";
    }

    canvas.width = window.innerWidth / SCALE_DIVIDER;
    canvas.height = window.innerHeight / SCALE_DIVIDER;
    starCount = Math.floor((canvas.width * canvas.height) / 150);
    // starCount = 1;

    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black"

    // SoA structure for better performance
    stars = {
        x: new Int32Array(starCount),
        y: new Int32Array(starCount),
        z: new Float32Array(starCount),

        screenX: new Int32Array(starCount),
        screenY: new Int32Array(starCount),
    };

    for (let i = 0; i < starCount; i++) {
        stars.x[i] = ((Math.random() * canvas.width) - (canvas.width/2)) * MAX_Z;
        stars.y[i] = ((Math.random() * canvas.height) - (canvas.height/2)) * MAX_Z;
        stars.z[i] = Math.random() * MAX_Z;
        // console.log(stars.z[i]);
    }

    computeStarsScreenPosition();

    if (b)
        requestAnimationFrame(loop);
}

function onResize() {
    init(false);
}

window.addEventListener("resize", onResize);
window.addEventListener("load", () => init(true));
