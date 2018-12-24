const $ = (selector) => document.querySelector(selector);

const body = $('body');
const spacingInput = $('#spacing');
const blurInput = $('#blur');
const baseInput = $('#base');

const appendpx = (value) => `${value}px`;
const string = (value) => `${value}`;

function setListener(
    element: HTMLInputElement,
    propertyName: string,
    valueCallback: (value: number | string) => string
) {
    element.addEventListener('input', () => {
        body.style.setProperty(propertyName, valueCallback(element.value));
    })
};

setListener(
    spacingInput,
    '--spacing',
    appendpx
);

setListener(
    blurInput,
    '--blur',
    appendpx
);

setListener(
    baseInput,
    '--base-color',
    string
);
