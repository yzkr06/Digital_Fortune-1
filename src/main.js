alert("デバイスを振っておみくじをひこう！");

// ランダムに移動するページのリスト
var pages = [
    "resultpages/page1.html",
    "resultpages/page2.html",
    "resultpages/page3.html",
    "resultpages/page4.html",
    "resultpages/page5.html",
    "resultpages/page6.html",
    "resultpages/page7.html"
];

// ランダムなページを選ぶ関数
function getRandomPage() {
    var randomIndex = Math.floor(Math.random() * pages.length);
    return pages[randomIndex];
}

// デバイスを振ったときの処理
function onDeviceShake() {
    var randomPage = getRandomPage();
    window.location.href = randomPage;
}

// デバイスモーションの許可を求める関数
function requestMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("devicemotion", handleDeviceMotion);
                } else {
                    alert("デバイスモーションの許可が必要です。設定アプリで「モーションと方向のアクセス」をオンにしてください。");
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener("devicemotion", handleDeviceMotion);
    }
}

// デバイスの振動を検知してランダムにページをリダイレクト
function handleDeviceMotion(event) {
    var acceleration = event.accelerationIncludingGravity;
    if (acceleration) {
        var x = acceleration.x || 0;
        var y = acceleration.y || 0;
        var z = acceleration.z || 0;

        // iOS対応のために閾値を調整
        var threshold = 25;
        if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
            onDeviceShake();
        }
    }
}

// ページ読み込み時にモーションセンサーの許可を要求
window.onload = function() {
    requestMotionPermission();
};
