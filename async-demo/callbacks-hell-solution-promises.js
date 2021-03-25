console.log("Before");

getUser(1).then((user) =>
  getRepositories(user)
    .then((repo) => getCommits(repo))
    .then((commits) => console.log(commits))
    .catch((err) => console.log("Error", err.message))
);

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    //kick off some async work
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit"]);
    }, 2000);
  });
}
