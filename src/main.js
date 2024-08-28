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
    if (confirm("おみくじを引きますか？")) {
        window.location.href = randomPage;
    }
}

// State to prevent multiple rapid triggers
var shakeTriggered = false;
var debounceTimeout;
var lastAccelerations = { x: 0, y: 0, z: 0 };
var smoothingFactor = 0.2;
var threshold = 30; // Adjust this value as needed

function handleDeviceMotion(event) {
    var acceleration = event.accelerationIncludingGravity;

    if (acceleration) {
        var x = acceleration.x || 0;
        var y = acceleration.y || 0;
        var z = acceleration.z || 0;

        // Smooth the acceleration values
        x = lastAccelerations.x * (1 - smoothingFactor) + x * smoothingFactor;
        y = lastAccelerations.y * (1 - smoothingFactor) + y * smoothingFactor;
        z = lastAccelerations.z * (1 - smoothingFactor) + z * smoothingFactor;

        lastAccelerations.x = x;
        lastAccelerations.y = y;
        lastAccelerations.z = z;

        console.log(`Smoothed Acceleration - x: ${x}, y: ${y}, z: ${z}`); // Debug log

        if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
            if (!shakeTriggered) {
                shakeTriggered = true;
                onDeviceShake();
                // Reset the flag after a delay
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(function() {
                    shakeTriggered = false;
                }, 3000); // Adjust the debounce timeout as needed
            }
        } else {
            // Reset shakeTriggered if the movement is below the threshold
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(function() {
                shakeTriggered = false;
            }, 500); // Shorter debounce timeout for no movement
        }
    }
}

if (window.DeviceMotionEvent) {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission().then(permissionState => {
            if (permissionState === 'granted') {
                window.addEventListener('devicemotion', handleDeviceMotion);
            } else {
                alert("デバイスのモーションイベントのアクセスが許可されていません。");
            }
        }).catch(console.error);
    } else {
        window.addEventListener('devicemotion', handleDeviceMotion);
    }
} else {
    alert("このデバイスはデバイストリガーをサポートしていません。");
}
