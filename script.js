const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        if (display.value.trim() === "") {
            return;
        }

        if (!/^[0-9+\-*/%. ]+$/.test(display.value)) {
            throw new Error();
        }

        const result = Function(
            '"use strict"; return (' + display.value + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error();
        }

        display.value = Number(result.toFixed(10)).toString();
    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    if (/^[0-9+\-*/%.]$/.test(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        calculate();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
