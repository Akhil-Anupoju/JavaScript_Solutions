var timeLimit = function(fn, t) {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            // Set a timeout to reject if the function doesn't complete in time
            setTimeout(() => {
                reject("Time Limit Exceeded");
            }, t);

            // Call the function and resolve/reject based on its result
            fn(...args).then(resolve).catch(reject);
        });
    };
};

// Test 1: Function resolves before time limit
const limited1 = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
limited1(150).catch((error) => console.log("Test 1:", error));
// Expected: "Test 1: Time Limit Exceeded"

// Test 2: Function resolves within time limit
const limited2 = timeLimit((t) => new Promise(res => setTimeout(res, t)), 200);
limited2(100).then(() => console.log("Test 2: Test 1 passed")).catch((error) => console.log("Test 2:", error));
// Expected: "Test 2: Test 1 passed"

// Test 3: Function takes longer than the time limit
const limited3 = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
limited3(150).catch((error) => console.log("Test 3:", error));
// Expected: "Test 3: Time Limit Exceeded"

// Test 4: Function takes exactly the time limit
const limited4 = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
limited4(100).then(() => console.log("Test 4: Test 3 passed")).catch((error) => console.log("Test 4:", error));
// Expected: "Test 4: Test 3 passed"

// Test 5: Function resolves immediately (0 ms delay)
const limited5 = timeLimit(() => new Promise(res => res("Done")), 100);
limited5().then((result) => console.log("Test 5:", result))
// Expected: "Test 5: Done"

// Test 6: Function immediately rejects
const limited6 = timeLimit(() => new Promise((_, reject) => reject("Failure")), 100);
limited6().catch((error) => console.log("Test 6:", error));
// Expected: "Test 6: Failure"

// Test 7: Function executes longer than the time limit (edge case)
const limited7 = timeLimit((t) => new Promise(res => setTimeout(res, t)), 200);
limited7(300).catch((error) => console.log("Test 7:", error));
// Expected: "Test 7: Time Limit Exceeded"
