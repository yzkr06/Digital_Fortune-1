alert("スマホを振っておみくじをひこう!");

var pages = [
    "resultpages/page1.html",
    "resultpages/page2.html",
    "resultpages/page3.html",
    "resultpages/page4.html",
    "resultpages/page5.html",
    "resultpages/page6.html",
    "resultpages/page7.html"
];

function getRandomPage() {
    var randomIndex = Math.floor(Math.random() * pages.length);
    return pages[randomIndex];
}

function onDeviceShake() {
    var randomPage = getRandomPage();
    window.location.href = randomPage;
}

var shakeTriggered = false;

function handleDeviceMotion(event) {
    var acceleration = event.accelerationIncludingGravity;

    if (acceleration) {
        var x = acceleration.x || 0;
        var y = acceleration.y || 0;
        var z = acceleration.z || 0;
        
        if (Math.abs(x) > 5 || Math.abs(y) > 5 || Math.abs(z) > 5) {
            if (!shakeTriggered) {
                shakeTriggered = true;
                onDeviceShake();
                setTimeout(function() {
                    shakeTriggered = false;
                }, 2000);
            }
        }
    }
}

window.addEventListener('devicemotion', handleDeviceMotion);
