//Trade off between query performace vs consistency

// Using References (Normalization) -> Consistency
let author = {
  name: "Cristian",
};

let course = {
  author: "_id",
};

// Using Embedded Documentents (Denormalization) -> PERFORMANCE
let course = {
  author: {
    name: "Cristian",
  },
};

// Hybrid Apporach
let author = {
  name: "Cristian",
  //50 other properties
};

let course = {
  author: {
    id: "ref", //-> to author document
    name: "Cristian",
  },
};
