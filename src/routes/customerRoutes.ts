import express from "express";
import { CustomerController } from "../controllers/CustomerController";
import { CustomerRepository } from "../repositories/customerRepository";
import { CustomerInteractor } from "../interactors/customerInteractor";

const repository = new CustomerRepository();
const interactor = new CustomerInteractor(repository);
const controller = new CustomerController(interactor);

const router = express.Router();

router.post("/customers", controller.onCreateCustomer.bind(controller));
router.get("/customers/:id", controller.onGetCustomer.bind(controller));
router.put("/customers/:id", controller.onUpdateCustomer.bind(controller));
router.delete("/customers/:id", controller.onDeleteCustomer.bind(controller));
router.get("/", controller.onGetCustomers.bind(controller));

export default router;
