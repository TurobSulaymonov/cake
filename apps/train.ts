console.log("Hello World");

/* 
ZK-TASK:

Shunday function yozing, 
u har soniyada bir marta consolega 1 dan 5 gacha bolgan raqamlarni chop etsin
 va 5 soniyadan keyin ishini toxtatsin.
MASALAN: printNumbers()
*/

function printNumber() {
    let currentNumber = 1;
    const intervalId = setInterval(() => {
        console.log(currentNumber);
        currentNumber++;
        if (currentNumber > 5) {
            clearInterval(intervalId); 
        }
    }, 1000);
  }
  
  
  setTimeout(printNumber, 5000);

 




//ZJ TAsk
 
 /* 

 Shunday function yozing,
   u berilgan arrayni ichidagi numberlarni qiymatini hisoblab qaytarsin.
MASALAN: reduceNestedArray([1, [1, 2, [4]]]) return 8
 */
/*   
function reduceNestedArray(input: Array<number | Array<any>>): number {
    let total = 0;
      for (const element of input) {
          if (Array.isArray(element)) {
              total += reduceNestedArray(element); 
          } else {
              total += element; 
          }
      }
      return total;
  } 
  const result = reduceNestedArray([1, [1, 2, [4]]]);
  console.log(result); */
 