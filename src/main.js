alert("スマホを振っておみくじをひこう!");
var pages = ["resultpages/page1.html", "resultpages/page2.html", "resultpages/page3.html", "resultpages/page4.html", "resultpages/page5.html", "resultpages/page6.html", "resultpages/page7.html"];
function getRandomPage() {
    var randomIndex = Math.floor(Math.random() * pages.length);
    return pages[randomIndex];
}
function onDeviceShake() {
    var randomPage = getRandomPage();
    window.location.href = randomPage;
}
window.addEventListener("devicemotion", function (event) {
    if (event.acceleration && event.acceleration.x > 15) {
        onDeviceShake();
    }
});
