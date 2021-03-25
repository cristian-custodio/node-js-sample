const { get } = require("../video-service/routes/genres");

console.log("Before");
//Simulating reading a user from a database every two seconds (Non-Blocking Async Function)
//Callbacks

getUser(1, getRepositories);

console.log("After");

function getRepositories(user) {
  getRepositories(user.githubUsername, getCommits);
}

function getCommits(repositories) {
  //\getCommits(repositories, displayCommits);
  console.log(repositories);
}

function displayCommits(commits) {
  console.log(commits);
}

//Callbacks
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    callback({ id: id, githubUsername: "Cristian" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling Github API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

//3 Patterns to deal with asynchonous Code
//Callbacks
//Promises
//Async/Await
