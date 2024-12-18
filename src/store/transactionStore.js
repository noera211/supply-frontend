import { defineStore } from "pinia";
import apiClient from "@/plugins/axios";

export const useTransactionStore = defineStore ( "transaction", {
  state: () => ({
    transactions: [],
  }),

  actions: {
    async fetchTransactions() {
      try {
        const response = await apiClient.get("/transactions");
        console.log("fetchTransactions:", response.data)
        this.transactions = response.data;
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    },

    async addTransaction(transaction) {
      try {
        const response = await apiClient.post("/transactions/borrow", transaction);
        this.transactions.push(response.data);
      } catch (error) {
        console.error("Failed to add transaction:", error);
      }
    },

    async returnTransaction(transactionId) {
      try {
        await apiClient.post(`/transactions/return/${transactionId}`);
        const index = this.transactions.findIndex(t => t.id === transactionId);
        if (index !== -1) this.transactions[index].status = "returned";
      } catch (error) {
        console.error("Failed to return transaction:", error);
      }
    },

    async verifyTransaction(transactionId) {
      try {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) throw new Error("Transaction not found");

        let newStatus = "";
        if (transaction.status === "Pending") {
          newStatus = "Borrowed";
        } else if (transaction.status === "Borrowed") {
          newStatus = "Returned";
        }

        if (newStatus) {
          await apiClient.patch(`/transactions/verify/${transactionId}`, { status: newStatus });
          const index = this.transactions.findIndex(t => t.id === transactionId);
          if (index !== -1) {
            this.transactions[index].status = newStatus;
          }
        }
      } catch (error) {
        console.error("Failed to verify transaction:", error);
      }
    }
  },
});