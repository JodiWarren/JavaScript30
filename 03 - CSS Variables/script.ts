const body = document.documentElement;
const inputs = document.querySelectorAll('.controls input');

function listenToInput(input) {
    input.addEventListener('input', setInputListener)
}

function setInputListener() {
    if (!(this instanceof HTMLInputElement)) {
        return;
    }
    body.style.setProperty(
        `--${this.name}`,
        this.value + (this.getAttribute('data-sizing') || '')
    );
}

inputs.forEach(listenToInput);
