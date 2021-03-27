const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

//Get Customers
router.get("/", async (req, res) => {
  const customers = await Customer.find({});
  res.send(customers);
});

//Create Customer
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  customer = await customer.save();

  res.send(customer);
});

//Update Customer
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("The customer with the given id was not found");

  res.send(customer);
});

//Delete a Customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.para.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res.status(400).send("The customer with the given id was not found");

  res.send(customer);
});

module.exports = router;
