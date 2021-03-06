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

function removeTransition(event: Event): void {
    if (
        (<TransitionEvent>event).propertyName !== 'transform' ||
        !event.target
    ) {
        return;
    }
    (<HTMLDivElement>event.target).classList.remove('playing');
}

function handleKeyEvent(event: KeyboardEvent): void {
    if (!keyMap[event.keyCode]) {
        return;
    }

    const { button, audio } = keyMap[event.keyCode];

    playAudio(audio);

    button.classList.add('playing');
    button.addEventListener('transitionend', removeTransition)
}

window.addEventListener('keydown', handleKeyEvent)
