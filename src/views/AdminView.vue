<template>
    <div class="admin-view">
      <div class="scrollable-content">
        <ItemList
          v-if="currentComponent === 'items'"
          @edit-item="showEditForm"
          @add-item="showAddForm"
        />
        <UserList v-if="currentComponent === 'users'" />
        <TransactionList v-if="currentComponent === 'transactions'" />
      </div>
      <Modal
        v-if="showForm"
        :isVisible="showForm"
        @close="cancelEditForm"
        :title="isEdit ? 'Edit Barang' : 'Tambah Barang'"
      >
        <ItemForm :item="selectedItem" :isEdit="isEdit" @submit="handleSubmit" />
      </Modal>
    </div>
  </template>
  
  <script>
  import ItemList from '@/components/admin/item/ItemList.vue';
  import ItemForm from '@/components/admin/item/itemForm.vue';
  import UserList from '@/components/admin/user/UserList.vue';
  import TransactionList from '@/components/user/transaction/TransactionList.vue';
  import Modal from '@/components/Modal.vue';
  
  export default {
    components: {
      ItemList,
      ItemForm,
      UserList,
      TransactionList,
      Modal,
    },
    props: {
      currentComponent: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        showForm: false,
        selectedItem: null,
        isEdit: false,
      };
    },
    methods: {
      showEditForm(item) {
        this.selectedItem = item;
        this.isEdit = true;
        this.showForm = true;
      },
      showAddForm() {
        this.selectedItem = null;
        this.isEdit = false;
        this.showForm = true;
      },
      handleSubmit() {
        this.showForm = false;
        this.selectedItem = null;
        this.isEdit = false;
      },
      cancelEditForm() {
        this.showForm = false;
        this.selectedItem = null;
        this.isEdit = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  
  .scrollable-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    max-height: calc(100vh - 60px);
  }
  </style>
  