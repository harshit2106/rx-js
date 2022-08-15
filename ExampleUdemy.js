import { Observable } from "rxjs";

const observable$ =
  new Observable() <
  string >
  ((subscriber) => {
    console.log("Observable executed");
    subscriber.next("Alice");
    setTimeout(() => subscriber.next("Ben"), 2000);
    setTimeout(() => subscriber.next("Charlie"), 4000);
  });

const subscription = observable$.subscribe((value) => console.log(value));

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 3000);

// -------------------------------------------------

import { Observable } from "rxjs";

const observablee$ =
  new Observable() <
  string >
  ((subscriber) => {
    console.log("Observable executed");
    subscriber.next("Alice");
    setTimeout(() => subscriber.next("Ben"), 2000);
    setTimeout(() => subscriber.next("Charlie"), 4000);
  });

const subscriptionn = observable$.subscribe((value) => console.log(value));

setTimeout(() => {
  console.log("Unsubscribe");
  subscriptionn.unsubscribe();
}, 3000);

// --------------------------------------------------
import { Observable } from "rxjs";

const interval$ =
  new Observable() <
  number >
  ((subscriber) => {
    let counter = 1;

    const intervalId = setInterval(() => {
      console.log("Emitted", counter);
      subscriber.next(counter++);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  });

const subscription3 = interval$.subscribe((value) => console.log(value));

setTimeout(() => {
  console.log("Unsubscribe");
  subscription3.unsubscribe();
}, 7000);
