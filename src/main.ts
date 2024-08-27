alert("スマホを振っておみくじをひこう!");

const pages: string[] = ["resultpages/page1.html", "resultpages/page2.html", "resultpages/page3.html", "resultpages/page4.html", "resultpages/page5.html", "resultpages/page6.html", "resultpages/page7.html"];

function getRandomPage(): string {
  const randomIndex = Math.floor(Math.random() * pages.length);
  return pages[randomIndex];
}

function onDeviceShake() {
  const randomPage = getRandomPage();
  window.location.href = randomPage;
}

window.addEventListener("devicemotion", (event) => {
  if (event.acceleration && event.acceleration.x! > 15) {
    onDeviceShake();
  }
});