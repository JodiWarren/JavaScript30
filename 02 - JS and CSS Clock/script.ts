const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

const getHandPosition = (currentTime, totalTime) => 360 * currentTime / totalTime;

function tick() {
    const time = new Date;
    const hour = time.getHours() > 11 ? time.getHours() - 12 : time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    if (
        !(hourHand instanceof HTMLElement) ||
        !(minuteHand instanceof HTMLElement) ||
        !(secondHand instanceof HTMLElement)
    ) {
        throw new Error("element #test not in document")
    }

    hourHand.style.transform = `rotateZ( ${getHandPosition(hour, 12)}deg)`;
    minuteHand.style.transform = `rotateZ( ${getHandPosition(minutes, 60)}deg)`;
    secondHand.style.transform = `rotateZ( ${getHandPosition(seconds, 60)}deg)`;

}

window.setInterval(tick, 1000);
