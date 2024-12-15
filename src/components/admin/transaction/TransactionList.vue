<template>
  <div class="transaction-list">
      <h2>List Data Transaksi</h2>
      <div class="table-responsive">
          <table>
              <thead>
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
                      <td>{{ transaction.namaUser }}</td>
                      <td>{{ transaction.namaBarang }}</td>
                      <td>{{ transaction.jumlahPinjam }}</td>
                      <td>{{ transaction.tanggalPinjam }}</td>
                      <td>{{ transaction.tanggalPengembalian }}</td>
                      <td>{{ transaction.status }}</td>
                      <td class="action-buttons">
                          <button
                          class="return-btn"
                          @click= "openReturnForm(transaction)" :disabled= "transaction.status === 'Returned'">
                          {{ transaction.status === "Returned" ? "Dikembalikan" : "Kembalikan" }}
                          </button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <Modal :visible="showForm" @close="cancelReturnForm">
          <TransactionForm :transaction="selectedTransaction"
          @submit="handleReturn"
          @cancel="cancelReturnForm"
          />
      </Modal>
  </div>
</template>

<script>
import { useTransactionStore } from "@/store/transactionStore";
import Modal from "@/components/Modal.vue";
import TransactionForm from "@/components/user/transaction/TransactionForm.vue";

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
      const transactionStore = useTransactionStore();
      return transactionStore.transactions;
    }
  },
  methods: {
      openReturnForm(transaction) {
          this.selectedTransaction = { ...transaction };
          this.showForm = true;
      },
      handleReturn(updatedTransaction) {
      const transactionStore = useTransactionStore();
      // Update status transaksi di store
      transactionStore.returnTransaction(updatedTransaction.id);
      this.cancelReturnForm();
      },
     cancelReturnForm() {
          this.showForm = false;
          this.selectedTransaction = null;
      },
  },
};
</script>

<style scoped>
.transaction-list {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
}
h2 {
  margin-bottom: 20px;
  color: #2980b9;
  text-align: center;
  font-size: 24px;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
th {
  background-color: #2980b9;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #ddd;
}
button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}
.return-btn {
  background-color: #754bc5;
  color: white;
}
.return-btn:hover {
  background-color: #5a37a0;
}
.return-btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  th,td {
      padding: 8px 10px;
  } 
  .action-buttons {
      display: flex;
      flex-direction: column;
      align-items: stretch;
  }
}
</style>