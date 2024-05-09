console.log("Hello World");


 //ZJ TAsk
 
 /* 

 Shunday function yozing,
   u berilgan arrayni ichidagi numberlarni qiymatini hisoblab qaytarsin.
MASALAN: reduceNestedArray([1, [1, 2, [4]]]) return 8
 */
  
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
  console.log(result);
 