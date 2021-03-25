// getCustomer(1, (customer) => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

async function printCustomer() {
  const customer = await getCustomer(1);
  console.log("Customer", customer);

  if (customer.isGold) {
    const movies = await getTopMovies();
    console.log("Top Movies", movies);
    await sendEmail(customer.email, movies);
    console.log("Email sent...");
  }

  //   await getCustomer(id).then((customer) => {
  //     console.log("Customer ", customer);
  //     if (customer.isGold) {
  //       getTopMovies().then((movies) => {
  //         console.log(movies);
  //         sendEmail(customer.email, movies).then(() => {
  //           console.log("Email Sent");
  //         });
  //       });
  //     }
  //   });
}

printCustomer();

function getCustomer(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Cristian Custodio",
        isGold: true,
        email: "email",
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}
