function memoize(fn) {
  // Cache to store results of function calls and track the number of calls
  const cache = new Map();
  let callCount = 0;

  // Wrapper function for memoization and tracking call count
  function wrapper(...args) {
    const key = JSON.stringify(args); // Create a unique key for the arguments

    // Return cached result if available
    if (cache.has(key)) {
      return cache.get(key);
    }

    // If not cached, calculate the result, cache it, and increment the call count
    callCount++;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }

  // Method to get the number of times the original function was actually called
  wrapper.getCallCount = function () {
    return callCount;
  };

  return wrapper;
}

// Functions to be memoized
function sum(a, b) {
  return a + b;
}

function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function fib(n) {
  if (n <= 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

// Main function to handle actions for the given function
function solve(fnName, actions, values) {
  let result = [];
  let memoizedFn;

  // Choose the function to memoize based on the provided name
  if (fnName === "sum") {
    memoizedFn = memoize(sum);
  } else if (fnName === "factorial") {
    memoizedFn = memoize(factorial);
  } else if (fnName === "fib") {
    memoizedFn = memoize(fib);
  }

  // Execute actions on the memoized function
  actions.forEach((action, idx) => {
    const value = values[idx];
    if (action === "call") {
      result.push(memoizedFn(...value)); // Call the memoized function with the arguments
    } else if (action === "getCallCount") {
      result.push(memoizedFn.getCallCount()); // Get the number of calls made to the function
    }
  });

  return result;
}

// Test cases
console.log("Test1:", solve("sum", ["call", "call", "getCallCount", "call", "getCallCount"], [[2, 2], [2, 2], [], [1, 2], []]));
// Test1 verifies memoization for the sum function with multiple calls

console.log("Test2:", solve("factorial", ["call", "call", "call", "getCallCount", "call", "getCallCount"], [[2], [3], [2], [], [3], []]));
// Test2 checks memoization for the factorial function with repeated calls

console.log("Test3:", solve("fib", ["call", "getCallCount"], [[5], []]));
// Test3 ensures memoization works for Fibonacci calculation and verifies call count
