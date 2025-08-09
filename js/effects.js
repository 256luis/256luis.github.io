const typeSpeedSlow = 100;
const typeSpeedFast = 40;
const backspacePauseLength = 300;
const backspaceSpeed = 30;
const waitLength = 600;

const caret = "\u2588";

async function animateTyping() {

    let element = document.getElementById("subtitle");
    const text = element.textContent.repeat(1);

    async function backspaceAll() {
        element.textContent = element.textContent.slice(0, -2) + caret;
        await new Promise(r => setTimeout(r, backspacePauseLength));
        while (element.textContent.length > 1) {
            element.textContent = element.textContent.slice(0, -2) + caret;
            // element.textContent += c + "\u2588";
            await new Promise(r => setTimeout(r, backspaceSpeed));
        }

        await new Promise(r => setTimeout(r, waitLength));
    }

    async function type(string) {
        for (const c of string) {
            element.textContent = element.textContent.slice(0, -1);
            element.textContent += c + caret;
            let ms = (Math.random() * (typeSpeedSlow - typeSpeedFast)) + typeSpeedFast;
            await new Promise(r => setTimeout(r, ms));
        }

        await new Promise(r => setTimeout(r, waitLength));
    }

    element.textContent = caret;

    await new Promise(r => setTimeout(r, 1500));

    while (true) {
        await type("Software Engineer");
        await backspaceAll();
        await type("Embedded Systems");
        await backspaceAll();
        await type("Compiler Design");
        await backspaceAll();
    }
}

window.addEventListener("load", animateTyping);
