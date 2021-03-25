//Used for Unit Testing

//Resolved Promise
const p = Promise.resolve({ id: 1 });
p.then((result) => console.log(result));

//Rejected Promise
const r = Promise.reject(new Error("Reason for rejection"));
r.catch((error) => console.log(error));
