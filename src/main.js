alert("スマホを振っておみくじをひこう！");

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
    // Confirm with the user before redirecting
    if (confirm("おみくじを引きますか？")) {
        window.location.href = randomPage;
    }
}

// State to prevent multiple rapid triggers
var shakeTriggered = false;

function handleDeviceMotion(event) {
    var acceleration = event.accelerationIncludingGravity;

    if (acceleration) {
        var x = acceleration.x || 0;
        var y = acceleration.y || 0;
        var z = acceleration.z || 0;
        
        if (Math.abs(x) > 8 || Math.abs(y) > 8 || Math.abs(z) > 8) {
            // To prevent multiple triggers from a single shake
            if (!shakeTriggered) {
                shakeTriggered = true;
                onDeviceShake();
                // Reset the flag after a short delay
                setTimeout(function() {
                    shakeTriggered = false;
                }, 2000);
            }
        }
    }
}

if (window.DeviceMotionEvent) {
    // Attempt to request permission if needed (modern browsers might handle this automatically)
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // iOS 13+ devices
        DeviceMotionEvent.requestPermission().then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('devicemotion', handleDeviceMotion);
            } else {
                alert("デバイスのモーションイベントのアクセスが許可されていません。");
            }
        }).catch(console.error);
    } else {
        // For devices that do not require permission
        window.addEventListener('devicemotion', handleDeviceMotion);
    }
} else {
    alert("このデバイスはデバイストリガーをサポートしていません。");
}
