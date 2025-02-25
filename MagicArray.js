// Magic Array Problem

class MagicArray {
    /**
     * Checks if the given sorted array is a magic array for the number X.
     * Uses two-pointer technique for efficiency.
     * @param {number[]} arr - Sorted array of integers
     * @param {number} x - Magic number
     * @returns {boolean} - True if magic array, else false
     */
    static isMagicArray(arr, x) {
        let left = 0, right = arr.length - 1;
        while (left < right) {
            const sum = arr[left] + arr[right];
            if (sum === x) return true;
            sum < x ? left++ : right--;
        }
        return false;
    }
}

// Unit Test Cases for MagicArray
console.assert(MagicArray.isMagicArray([1, 2, 3, 4, 5], 9) === true, "Test Case 1 Failed");
console.assert(MagicArray.isMagicArray([1, 2, 3, 4, 5], 10) === false, "Test Case 2 Failed");
console.assert(MagicArray.isMagicArray([-3, -1, 0, 2, 5], 4) === true, "Test Case 3 Failed");
console.assert(MagicArray.isMagicArray([0, 1, 2, 3, 4, 5, 10], 15) === true, "Test Case 4 Failed");
console.assert(MagicArray.isMagicArray([], 10) === false, "Test Case 5 Failed");
console.assert(MagicArray.isMagicArray([0, 1, 2, 3, 4, 5, 10], 0) === false, "Test Case 5 Failed");
console.log("All test cases passed for MagicArray!");
