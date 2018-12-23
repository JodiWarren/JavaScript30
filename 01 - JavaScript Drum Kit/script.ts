const keys = [].slice.call(document.querySelectorAll("audio[data-key]"));

interface Sound {
    button: Element,
    audio: HTMLAudioElement,
};

interface SoundKeyMap {
    [name: string]: Sound;
}

function keysToKeyMap(acc: SoundKeyMap, currVal: HTMLAudioElement): SoundKeyMap {
    const keyCode = currVal.getAttribute('data-key');
    const thisButton = document.querySelector(`div[data-key="${keyCode}"]`);

    if ( keyCode && thisButton ) {
        acc[keyCode] = {
            button: thisButton,
            audio: currVal
        };
    }
    return acc;
}

const keyMap: SoundKeyMap = keys.reduce(keysToKeyMap, {});

function playAudio(audio: HTMLAudioElement) {
    const audioSrc = audio.src;
    const thisAudio = new Audio(audioSrc);
    thisAudio.play();
}

function handleKeyEvent(event: KeyboardEvent): void {
    if (!keyMap[event.keyCode]) {
        return;
    }

    const { button, audio } = keyMap[event.keyCode];

    playAudio(audio);

    button.classList.add('playing');
    window.setTimeout(() => {
        button.classList.remove('playing');
    }, 70);
}

window.addEventListener('keydown',handleKeyEvent)
