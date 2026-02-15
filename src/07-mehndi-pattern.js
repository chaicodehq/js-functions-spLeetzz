/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  if (typeof char !== "string" || !char || typeof n !== "number" || n <= 0)
    return "";
  if (n > 0) return char + repeatChar(char, n - 1);
}

export function sumNestedArray(arr) {
  if (!Array.isArray(arr) || arr.length < 1) return 0;

  let sum = 0;
  for (const x of arr) {
    if (Array.isArray(x)) sum += sumNestedArray(x);
    else if (typeof x !== "number" || isNaN(x)) continue;
    else sum += x;
  }

  return sum;
}

export function flattenArray(arr) {
  if (!Array.isArray(arr)) return [];
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) newArr.push(...flattenArray(arr[i]));
    else newArr.push(arr[i]);
  }
  return newArr;
}

export function isPalindrome(str) {
  if (typeof str !== "string") return false;

  if (str.length <= 1) return true;

  if (
    str.charAt(0).toLowerCase() === str.charAt(str.length - 1).toLowerCase()
  ) {
    return isPalindrome(str.slice(1, str.length - 1));
  } else return false;
}

export function generatePattern(n) {
  if (typeof n !== "number" || !Number.isInteger(n) || n <= 0) return [];

  function addtoarray(arr) {
    if (n <= 0) {
      for (let index = arr.length - 2; index >= 0; index--) {
        arr.push(arr[index]);
      }
      return arr;
    } else if (n > 0) {
      arr.push("*".repeat(arr.length + 1));
      n--;
      return addtoarray(arr);
    }
  }
  return addtoarray([]);
}
