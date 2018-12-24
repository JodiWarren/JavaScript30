var $ = function (selector) { return document.querySelector(selector); };
var body = $('body');
var spacingInput = $('#spacing');
var blurInput = $('#blur');
var baseInput = $('#base');
var appendpx = function (value) { return value + "px"; };
var string = function (value) { return "" + value; };
function setListener(element, propertyName, valueCallback) {
    element.addEventListener('input', function () {
        body.style.setProperty(propertyName, valueCallback(element.value));
    });
}
;
setListener(spacingInput, '--spacing', appendpx);
setListener(blurInput, '--blur', appendpx);
setListener(baseInput, '--base-color', string);
