import { Observable, timer } from "rxjs";

console.log("App started");

const subscriptionn = timer.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed"),
});

setTimeout(() => {
  subscriptionn.unsubscribe();
  console.log("Unsubscribe");
}, 1000);

// polyfill
const timer$ =
  new Observable() <
  number >
  ((subscriber) => {
    const timeoutId = setTimeout(() => {
      console.log("Timeout!");
      subscriber.next(0);
      subscriber.complete();
    }, 2000);

    return () => clearTimeout(timeoutId);
  });

const subscription = timer$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed"),
});

setTimeout(() => {
  subscription.unsubscribe();
  console.log("Unsubscribe");
}, 1000);
