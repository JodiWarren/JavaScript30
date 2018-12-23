var keys = [].slice.call(document.querySelectorAll("audio[data-key]"));
;
function keysToKeyMap(acc, currVal) {
    var keyCode = currVal.getAttribute('data-key');
    var thisButton = document.querySelector("div[data-key=\"" + keyCode + "\"]");
    if (keyCode && thisButton) {
        acc[keyCode] = {
            button: thisButton,
            audio: currVal
        };
    }
    return acc;
}
var keyMap = keys.reduce(keysToKeyMap, {});
function playAudio(audio) {
    var audioSrc = audio.src;
    var thisAudio = new Audio(audioSrc);
    thisAudio.play();
}
function handleKeyEvent(event) {
    if (!keyMap[event.keyCode]) {
        return;
    }
    var _a = keyMap[event.keyCode], button = _a.button, audio = _a.audio;
    playAudio(audio);
    button.classList.add('playing');
    window.setTimeout(function () {
        button.classList.remove('playing');
    }, 70);
}
window.addEventListener('keydown', handleKeyEvent);
