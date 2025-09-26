// react custom hook file for transactions

import { useCallback, useState } from "react";
import { Alert } from "react-native";
const prodUrl = process.env.EXPO_PUBLIC_PUBLIC_API?.trim();
const localUrl = process.env.EXPO_PUBLIC_LOCAL_API?.trim();

const API_URL =
  (process.env.NODE_ENV === "production" ? prodUrl : localUrl) + "/api";

export const useTransactions = (userId: string) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(false);

  // function to fetch transactions from the backend API based on userId
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTransactions(data.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/transactions/summary/${userId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setSummary(data.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId || userId === "") return;
    setLoading(true);
    try {
      // can be optimized using Promise.all to fetch both simultaneously
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error: any) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (transactionId: string) => {
    if (!userId || userId === "") return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/transactions/${transactionId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        loadData();
        Alert.alert("Success", "Transaction deleted successfully");
      } else {
        Alert.alert("Error", "Failed to delete transaction");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to delete transaction");
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    summary,
    loading,
    loadData,
    deleteTransaction,
  };
};
