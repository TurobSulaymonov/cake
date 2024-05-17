console.log("Hello World");

/* 
ZN-TASK:

Shunday function yozing, uni array va number parametri bolsin. Ikkinchi parametrda berilgan raqamli indexgacha arrayni orqasiga ogirib qaytarsin.
MASALAN: rotateArray([1, 2, 3, 4, 5, 6], 3) return [5, 6, 1, 2, 3, 4]
*/
function rotateArray(arr: number[], index: number): number[] {

  if (index <= 0 || index >= arr.length) {
      return arr;
  }

  let part1 = arr.slice(index);
  let part2 = arr.slice(0, index);

  return part1.concat(part2);
}


const result = rotateArray([1, 2, 3, 4, 5, 6], 3);
console.log(result);  

/* 

ZM-TASK:

Shunday function yozing, u function parametrga berilgan
 raqamlarni orqasiga ogirib qaytarsin.
MASALAN: reverseInteger(123456789) return 987654321
*/
 


/* function reverseInteger (input: number): number {
  const stringified = input.toString();
  const reversed = parseInt(stringified.split('').reverse().join(''));
  return Math.sign(input) * reversed;

 }


 const result = reverseInteger(123456789);
 console.log( "result:", result);
 */


/*ZL-TASK:

Shunday function yozing, u parametrda berilgan stringni kebab casega otkazib qaytarsin. Bosh harflarni kichik harflarga ham otkazsin.
MASALAN: stringToKebab(“I love Kebab”) return “i-love-kebab”
*/
/* 
function stringToKebab(input: string): string {
    let result = '';
    for (let i = 0; i < input.length; i++) {
      const char = input[i].toLowerCase();
      if (char >= 'a' && char <= 'z') {
        result += char;
      } else if (char === ' ') {
        result += '-';
      }
    }
    return result;
  }
  
  
  console.log(stringToKebab("I love Kebab")); 
 */
/* 
ZK-TASK:

Shunday function yozing, 
u har soniyada bir marta consolega 1 dan 5 gacha bolgan raqamlarni chop etsin
 va 5 soniyadan keyin ishini toxtatsin.
MASALAN: printNumbers()
*/
/* 
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
  
  
  setTimeout(printNumber, 5000); */

 




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
 