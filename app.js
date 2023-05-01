// const input1 = document.getElementById("input1");
// const input2 = document.getElementById("input2");

// // получаем числовые значения из input, парсим
// const value1 = parseInt(input1.value);
// const value2 = parseFloat(input2.value);

//кнопки 
const start = document.querySelector('.start-btn');
const stop = document.querySelector('.stop-btn');

//АНПА
const anpa = document.querySelectorAll('.anpa-item')

start.addEventListener('click', () => {
    console.log("start")
    for(let i=1; i<=5; i++){
        document.querySelectorAll(`.anpa-item:nth-child(5n+${i})`).forEach((element)=>{
            element.style.animation= ` rotate-circle 4s  linear  forwards ${(i-1)*4}s `
        })
        
      }
  });

 
  