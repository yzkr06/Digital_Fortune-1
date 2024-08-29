alert("デバイスを振っておみくじをひこう！")
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

// デバイスの振動を検知してランダムにページをリダイレクト
window.addEventListener("devicemotion", function(event) {
    var acceleration = event.accelerationIncludingGravity;
    if (acceleration) {
        var x = acceleration.x || 0;
        var y = acceleration.y || 0;
        var z = acceleration.z || 0;

        // しきい値を超えた振動を検知
        var threshold = 35;  // しきい値は必要に応じて調整
        if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
            onDeviceShake();
        }
    }
});
