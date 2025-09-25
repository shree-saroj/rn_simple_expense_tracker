import express from "express";
import {
  getTransactionByUserId,
  createTransaction,
  deleteTransaction,
  getUserTrnsactionSummary,
} from "../controllers/transactionsController.js";
const router = express.Router();

router.get("/:userId", getTransactionByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getUserTrnsactionSummary);

export default router;
