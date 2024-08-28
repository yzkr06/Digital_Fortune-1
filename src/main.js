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

var shakeTriggered = false;

function handleDeviceMotion(event) {
    var acceleration = event.accelerationIncludingGravity;

    if (acceleration) {
        var x = acceleration.x || 0;
        var y = acceleration.y || 0;
        var z = acceleration.z || 0;

        console.log(`Acceleration - x: ${x}, y: ${y}, z: ${z}`); // デバッグ用ログ

        var threshold = 10;
        if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
            if (!shakeTriggered) {
                shakeTriggered = true;
                onDeviceShake();
                // Reset the flag after a short delay
                setTimeout(function() {
                    shakeTriggered = false;
                }, 3000);
            }
        }
    }
}

if (window.DeviceMotionEvent) {
    // Attempt to request permission if needed (modern browsers might handle this automatically)
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
