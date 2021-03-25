console.log("Before");
//Simulating reading a user from a database every two seconds (Non-Blocking Async Function)
getUser();
console.log("After");

function getUser() {
  setTimeout(() => {
    console.log("Reading a user from a database");
  }, 2000);
}
