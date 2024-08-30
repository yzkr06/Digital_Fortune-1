document.addEventListener('DOMContentLoaded', function() {
    alert("デバイスを振っておみくじをひこう！");

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

    function handleDeviceMotion(event) {
        var acceleration = event.accelerationIncludingGravity;
        if (acceleration) {
            var x = acceleration.x || 0;
            var y = acceleration.y || 0;
            var z = acceleration.z || 0;

            var threshold = 15; // デバイスが振られたと見なす閾値
            if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
                onDeviceShake();
            }
        }
    }

    function initializeMotionListeners() {
        if ('DeviceMotionEvent' in window) {
            window.addEventListener('devicemotion', handleDeviceMotion);
        } else {
            console.error('DeviceMotionEvent is not supported.');
            // ユーザーに対するフィードバックを追加することもできます
        }
    }

    // デバイスモーションリスナーを初期化
    initializeMotionListeners();
});
