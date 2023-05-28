let Y_current, X_current;
let Y_next = [],
  X_next = [];
let Ymt;
//кнопки
const start = document.querySelector(".start-btn");
const stop = document.querySelector(".stop-btn");

//АНПА
const anpa = document.querySelectorAll(".anpa-item");

//Переменные
let radiusANPA; //радиус обозначаемого круга для расчета траектории
let neighDistance; //дистанция до соседа
let P = 1000; // размер района ведения сейсморазведки
const flowInput = document.querySelector(".v-flow__input"); //скорость течения
let flow = flowInput.value;

let deviation; //отклонение
let deviationDir; //направление отклонения

const container = document.querySelector(".anpa-container");
const distInput = document.querySelector(".dist-neigh__input");
const rect = container.getBoundingClientRect();
const containerRightX = rect.right;

const gapValue = distInput.value + "px";
container.style.gridColumnGap = gapValue;

// переменные для траектории по эллипсу
let startAngle = Math.PI; // начальный угол
let endAngle = 2 * Math.PI; // конечный угол
let stopMoving;
// Скорость воспроизведения //
const speedInput = document.querySelector(".speed__input");
let interval = 50;
speedInput.addEventListener("input", () => {
  const value = speedInput.value;

  switch (value) {
    case "1":
      interval = 80;
      break;
    case "2":
      interval = 65;
      break;
    case "3":
      interval = 50;
      break;
    case "4":
      interval = 45;
      break;
    case "5":
      interval = 13;
      break;
  }
});

let startIterations = -1;

let animationId;
start.addEventListener("click", anim = () => {
  console.log("start")
  let i = 1;
  startIterations++;
  const animateGroup = () => {
    const elements = document.querySelectorAll(`.group${i}`);
    const startAngle = Math.PI;
    let angle = startAngle;
    const step = 0.05;
    const endAngle = 2 * Math.PI;
    const radiusX = (140 + distInput.value * 7) / 2;
    const radiusY = 45;
    const centerX = startIterations * 2 * radiusX + radiusX;
    const centerY = 0;
    let deviationX = Math.floor(Math.random() * flow*8) + centerX;
    let deviationY = Math.floor(Math.random() * flow*6) + centerY;
    if (stopMoving >= containerRightX - 30 - distInput.value) {
      clearTimeout(animateGroup);
      return;
    }
    if(i==8){
      clearTimeout(animationId )
     anim()
    }
    animationId = setTimeout(function animate() {
      angle += step;
      if (angle >= endAngle) {
        i++;
        console.log(i);
        animationId = setTimeout(animateGroup, 100);
        return;
      }
      const x = deviationX + radiusX * Math.cos(angle);
      const y = deviationY + radiusY * Math.sin(angle);
      elements.forEach((element) => {
        const rectANPA = element.getBoundingClientRect();
        stopMoving = rectANPA.right + flow * 1.2;

        element.style.transform = `translate(${x}px, ${y}px)`;
        const transformStyle = window
          .getComputedStyle(element)
          .getPropertyValue("transform");

        const matrixValues = transformStyle
          .match(/matrix.*\((.+)\)/)[1]
          .split(", ");
        const translateX = parseInt(matrixValues[12] || matrixValues[4], 10);
      });
      setTimeout(animate, interval);
    }, 10);
  };
  animateGroup();
  return;
});

distInput.addEventListener("input", function () {
  const gapValue = distInput.value + "px";
  container.style.gridColumnGap = gapValue;
});

distInput.addEventListener("input", function () {
  const gapValue = distInput.value + "px";
  container.style.gridColumnGap = gapValue;
});
