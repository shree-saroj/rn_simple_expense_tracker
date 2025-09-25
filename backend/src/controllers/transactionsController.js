import sql from "./../config/db.js";

export async function getTransactionByUserId(req, res) {
  try {
    const { userId } = req.params;
    let response = {};
    const transactions = await sql`
      SELECT * FROM Transactions WHERE user_id = ${userId} ORDER BY created_date DESC;
    `;
    if (transactions.length === 0) {
      response = {
        message: "No transactions found for the user",
        data: [],
        status: 400,
      };
    } else {
      response = {
        message:
          transactions.length === 0
            ? "No transactions found for the user"
            : "Transactions fetched successfully",
        data: transactions,
        status: transactions.length === 0 ? 400 : 200,
      };
    }
    res.status(200).json(response);
  } catch (err) {
    const response = {
      message: "Error fetching transactions",
      data: [],
      status: 500,
    };
    res.status(500).json(response);
  }
}

export async function createTransaction(req, res) {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || amount === undefined || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await sql`
      INSERT INTO Transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *;
    `;
    const response = {
      message: "Transaction created successfully",
      data: result[0],
      status: 201,
    };
    res.status(201).json(response);
  } catch (err) {
    const response = {
      message: "Error creating transaction",
      data: [],
      status: 500,
    };
    res.status(500).json(response);
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    let response;
    if (!isNaN(id)) {
      const result = await sql`
      DELETE FROM Transactions WHERE id = ${id} RETURNING *;
    `;
      if (result.length === 0) {
        response = {
          message: "Transaction not found",
          data: result,
          status: 404,
        };
      } else {
        response = {
          message: "Transaction deleted successfully",
          data: result,
          status: 200,
        };
      }
    } else {
      response = {
        message: "Invalid transaction ID",
        data: [],
        status: 400,
      };
    }
    res.status(200).json(response);
  } catch (err) {
    const response = {
      message: "Error deleting transaction",
      data: [],
      status: 500,
    };
    res.status(500).json(response);
  }
}

export async function getUserTrnsactionSummary(req, res) {
  try {
    const { userId } = req.params;
    let response = {};
    let summary = {};
    if (!isNaN(userId)) {
      const result = await sql`
      SELECT 
        COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END), 0) AS total_expense
      FROM Transactions
      WHERE user_id = ${userId};
    `;
      if (result.length === 0) {
        summary = {
          total_income: 0,
          total_expense: 0,
          balance: 0,
        };
        response = {
          message: "No transactions found for the user",
          data: summary,
          status: 404,
        };
      } else {
        summary = {
          total_income: parseFloat(result[0].total_income),
          total_expense: parseFloat(result[0].total_expense),
        };
        summary.balance = summary.total_income + summary.total_expense;

        response = {
          message: "Summary fetched successfully",
          data: summary,
          status: 200,
        };
      }
    } else {
      response = {
        message: "Invalid user ID",
        data: {},
        status: 400,
      };
    }
    res.status(200).json(response);
  } catch (err) {
    const response = {
      message: "Error fetching summary",
      data: {},
      status: 500,
    };
    res.status(500).json(response);
  }
}
