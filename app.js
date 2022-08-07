const observable = (observer) => {
  let counter = 0;

  const producer = setInterval(() => {
    observer.next(counter++);
  }, 1000);

  // unsubscribe logic

  return () => {
    clearInterval(producer);
  };
};

const closeFn = observable({
  // observer contains these 3 methods
  next: (daṭa) => console.log(daṭa),
  error: (err) => console.log(err),
  complete: () => console.log("done"),
});

setTimeout(() => {
  closeFn();
}, 5000);

// more elaborated example using ---------------------------------------------------------------------

// how rxJs work behind the scene (mimicing)

class ObserverGuard {
  constructor(observer) {
    this.observer = observer;
    this.unSubscribe = false;
  }

  next(data) {
    if (this.unSubscribe || !this.observer.next) {
      return;
    }

    try {
      this.observer.next(data);
    } catch (error) {
      this.unSubscribe();
      throw error;
    }
  }

  error(err) {
    if (this.unSubscribe || !this.observer.error) {
      return;
    }

    try {
      this.observer.error(err);
    } catch (innerError) {
      this.unSubscribe();
      throw innerError;
    }
    this.unSubscribe();
  }

  complete() {
    if (this.unSubscribe || !this.observer.complete) {
      this.unSubscribe();
      return;
    }
    try {
      this.observer.complete();
    } catch (error) {
      this.unSubscribe();
      throw error;
    }
  }

  unSubscribe() {
    this.unSubscribe = true;
    if (this.closeFn) {
      this.closeFn();
    }
  }
}

class Observable {
  constructor(blueprint) {
    this.observable = blueprint;
  }

  subscribe(observer) {
    const observerWithGuard = new ObserverGuard(observer);
    const closeFn = this.observable(observerWithGuard);
    observerWithGuard.closeFn = closeFn;
    return closeFn;
  }
}

const obs = new Observable(function observable(observer) {
  let counter = 0;
  const producer = setInterval(() => {
    observer.next(counter++);
  }, 1000);
  // unsubscribe logic
  return () => {
    clearInterval(producer);
  };
});

const unsubs = obs.subscribe({
  // observer contains these 3 methods
  next: (daṭa) => console.log(daṭa),
  error: (err) => console.log(err),
  complete: () => console.log("done"),
});

setTimeout(() => {
  unsubs();
}, 5000);
