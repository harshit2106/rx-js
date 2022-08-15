import { from } from "rxjs";

from(["a", "b", "c"]).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("completed"),
});

const somePromise = new Promise((resolve, reject) => {
  // resolve('Resolved!');
  reject("Rejected!");
});

const observableFromPromise$ = from(somePromise);

observableFromPromise$.subscribe({
  next: (value) => console.log(value), // behave like then
  error: (err) => console.log("Error:", err), // behave like catch
  complete: () => console.log("Completed"),
});
