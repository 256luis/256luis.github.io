import { setFlySpeed } from "./stars.js";

const introPanel = document.getElementById("intro-panel");

const aboutButton = document.getElementById("about-button");
const projectsButton = document.getElementById("projects-button");
const contactButton = document.getElementById("contact-button");
const backButtons = document.getElementsByClassName("back");

const contactPanel = document.getElementById("contact-panel");
const aboutPanel = document.getElementById("about-panel");
const projectsPanel = document.getElementById("projects-panel");

let activePanel = introPanel;

async function flyForward() {
    setFlySpeed(9999, 0.006);
    await new Promise(r => setTimeout(r, 1200));
    setFlySpeed(0.08, 0.006);
}

async function flyBackward() {
    setFlySpeed(-9999, 0.006);
    await new Promise(r => setTimeout(r, 1200));
    setFlySpeed(-0.08, 0.006);
}

async function transitionOut(panel) {
    panel.style.animation =
        "fly-away 1.5s cubic-bezier( 0.04, -0.07, 0.76, 0.01 )";

    await new Promise(r => setTimeout(r, 200));
    flyForward();
    await new Promise(r => setTimeout(r, 1200));
    panel.style.display = "none";
}

async function transitionInto(panel) {
    let oldPanel = activePanel;

    deactivateButtons();

    activePanel = panel;
    transitionOut(oldPanel);
    await new Promise(r => setTimeout(r, 500));

    activePanel.style.display = "block";
    activePanel.style.animation = "fly-into-view 2s ease-in-out";
    await new Promise(r => setTimeout(r, 2000));
    activePanel.style.animation = "float-y 2.5s ease-in-out infinite, float-x 3.5s ease-in-out infinite, rotation 6s ease-in-out infinite"

    activateButtons();
}

aboutButton.onclick = () => transitionInto(aboutPanel);
contactButton.onclick = () => transitionInto(contactPanel);
projectsButton.onclick = () => transitionInto(projectsPanel);

function deactivateButtons() {
    const buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.disabled = true;
    }

}

function activateButtons() {
    const buttons = document.getElementsByTagName("button");
    for (let button of buttons) {
        button.disabled = false;
    }

}

for (let button of backButtons) {
    button.onclick = () => transitionInto(introPanel);
}

// console.log(backButtons.length);

// Array.from(backButton).forEach((e) => {

// });
