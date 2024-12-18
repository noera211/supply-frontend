<template>
  <div class="transaction-list container my-4">
    <h2 class="text-center text-primary mb-4">List Data Transaksi</h2>
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nama User</th>
            <th>Nama Barang</th>
            <th>Jumlah Pinjam</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Pengembalian</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.userId }}</td>
            <td>{{ transaction.item }}</td>
            <td>{{ transaction.quantityBorrowed}}</td>
            <td>{{ transaction.borrowedAt}}</td>
            <td>{{ transaction.returnedAt}}</td>
            <td>
              <span :class="{
                'badge': true,
                'bg-success': transaction.status === 'Borrowed',
                'bg-danger': transaction.status === 'Returned',
                'bg-warning': transaction.status === 'Pending'
              }">
                {{ transaction.status }}
              </span>
            </td>
            <td class="d-flex">
              <button 
                class="btn btn-primary me-2" 
                @click="verifyTransaction(transaction.id)" 
                :disabled="transaction.status === 'Returned'">
                {{ transaction.status === 'Returned' ? 'Terkembalikan' : 'Verifikasi' }}
              </button>
              <button 
                class="btn btn-warning"
                @click="openReturnForm(transaction)" 
                :disabled="transaction.status === 'Returned'">
                {{ transaction.status === 'Returned' ? 'Dikembalikan' : 'Kembalikan' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal untuk form pengembalian -->
    <Modal :visible="showForm" @close="cancelReturnForm">
      <TransactionForm :transaction="selectedTransaction" 
        @submit="handleReturn" 
        @cancel="cancelReturnForm" />
    </Modal>
  </div>
</template>

<script>
import { useTransactionStore } from "@/store/transactionStore";
import Modal from "@/components/Modal.vue";
import TransactionForm from "@/components/admin/transaction/TransactionForm.vue";

export default {
  components: {
    Modal,
    TransactionForm,
  },
  data() {
    return {
      showForm: false,
      selectedTransaction: null,
    };
  },
  computed: {
    transactions() {
      const store = useTransactionStore();
      console.log("Transactions from store:", store.transactions);
      return store.transactions;
    },
  },
  mounted() {
  const store = useTransactionStore(); // Assuming useTransactionStore is correctly imported
  store.fetchTransactions()
    .then(() => console.log("Transaction fetched successfully"))
    .catch(error => {
      console.error("Error Fetching transactions:", error);
      // Optionally, do something else with the error, like display it to the user
    });
},
  methods: {
    openReturnForm(transaction) {
      this.selectedTransaction = { ...transaction };
      this.showForm = true;
    },
    async handleReturn(updatedTransaction) {
      const store = useTransactionStore();
      await store.returnTransaction(updatedTransaction.id, updatedTransaction);
      this.cancelReturnForm();
    },
    cancelReturnForm() {
      this.showForm = false;
      this.selectedTransaction = null;
    },
    async verifyTransaction(transactionId) {
      const store = useTransactionStore();
      try {
        await store.verifyTransaction(transactionId);
      } catch (error) {
        console.error("Failed to verify transaction:", error);
      }
    }
  },
};
</script>

<style scoped>
.transaction-list {
  padding: 20px;
}

.table-responsive {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td, th {
  text-align: center;
  padding: 12px;
  border: 1px solid #ddd;
  font-size: 16px;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  cursor: not-allowed;
  background-color: #cccccc;
}

/* Styling untuk status */
.badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 12px;
  color: rgb(235, 162, 27);
  font-size: 14px;
}

.bg-success {
  background-color: #28a745; /* Hijau untuk status 'Borrowed' */
}

.bg-danger {
  background-color: #dc3545; /* Merah untuk status 'Returned' */
}

.bg-warning {
  background-color: #ffc107; /* Kuning untuk status 'Pending' */
}

</style>
