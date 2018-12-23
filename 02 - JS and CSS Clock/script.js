var hourHand = document.querySelector('.hour-hand');
var minuteHand = document.querySelector('.min-hand');
var secondHand = document.querySelector('.second-hand');
var getHandPosition = function (currentTime, totalTime) { return 360 * currentTime / totalTime; };
function tick() {
    var time = new Date;
    var hour = time.getHours() > 11 ? time.getHours() - 12 : time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    if (!(hourHand instanceof HTMLElement) ||
        !(minuteHand instanceof HTMLElement) ||
        !(secondHand instanceof HTMLElement)) {
        throw new Error("element #test not in document");
    }
    hourHand.style.transform = "rotateZ( " + getHandPosition(hour, 12) + "deg)";
    minuteHand.style.transform = "rotateZ( " + getHandPosition(minutes, 60) + "deg)";
    secondHand.style.transform = "rotateZ( " + getHandPosition(seconds, 60) + "deg)";
}
window.setInterval(tick, 1000);
