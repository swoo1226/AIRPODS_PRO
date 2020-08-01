const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");
//END SECTION
const section = document.querySelector("section");
const end = section.querySelector("h1");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 17000, //영상 길이 (ms 단위). scrollPosition이 이동할 총 길이를 나타내기도 함.
  triggerElemnt: intro,
  triggerHook: 0, //unpin이나 뭔가를 끝내고 싶은 지점의 비율을 나타냄. 0~1까지
})
  .addIndicators()
  .setPin(intro) //intro 를 스크롤 다운시에도 고정하도록 하는 함수. duration에 따른 길이만큼 스크롤 한 뒤에는 unpin 되면서 넘어감.
  .addTo(controller);

//Text animation
const textAnim = TweenMax.fromTo(text, 5, { opacity: 1 }, { opacity: 0 });

let scene2 = new ScrollMagic.Scene({
  duration: 8000,
  triggerElement: intro,
  triggerHook: 0,
})
  .setTween(textAnim)
  .addTo(controller);

//Video animations
let accelamount = 0.1; //스크롤에 따라서 영상을 얼마나 앞으로 감을 것인지를 정하는 값.
let scrollpos = 0;
let delay = 0;

scene.on("update", (e) => {
  //이벤트 리스너와 같은 역할
  scrollpos = e.scrollPos / 1000; //1000을 나눠줌으로써 duration에 ms 단위로 준 것을 s 단위로 스크롤 감지하도록 함.
  //   console.log(e);
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  video.currentTime = delay;
  // console.log(scrollpos, delay);
  // video.currentTime = scrollpos;
}, 41.7);

//interval 시간은 1000 / fps 값을 해주면 자연스러울 것임;
