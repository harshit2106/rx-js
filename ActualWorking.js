import { Observable } from "rxjs";

const obs = new Observable((observer) => {
  let counter = 1;
  // unsubscribe automatically whenever we recieved error or complete methed
  const producer = setInterval(() => {
    observer.next(counter++);
    if (counter > 5) {
      console.log("complete called");
      observer.complete();
    }
  }, 1000);

  return () => clearInterval(producer);
});

const subs = obs.subscribe({
  next: (daṭa) => console.log(daṭa),
  error: (err) => console.log(err),
  complete: () => console.log("done"),
});

// if we dont send object in observer but only sending callback then the callback will behave as a next method

const subs2 = ons.subscribe((data) => console.log(data));

// setTimeout(() => {
//   subs.unsubscribe();
// }, 5000);

// http requestAnimationFrame. in rxjs-------------------------------

const obss = new Observable((observer) => {
  const url = "some url";

  const http = new XMLHttpRequest();
  const onLoad = () => {
    if (http.status === 200 && http.readyState === 4) {
      observer.next(http.responseText);
    }
  };

  const onError = () => {
    observer.error(http.error);
  };

  http.addEventListener("load", onLoad);
  http.addEventListener("error", onError);
  http.open("get", url);
  http.send();

  return () => {
    http.removeEventListener("load", onLoad);
    http.removeEventListener("error", onError);
  };
  
});

const subbbs = obss.subscribe({
    next:(data)=>console.log(data),
    error:(error)=>console.log(error);
})
