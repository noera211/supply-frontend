<template>
  <div class="item-list container py-4">
    <div class="header d-flex justify-content-between align-items-center mb-3">
      <h2>Daftar Barang</h2>
      <button class="btn btn-primary" @click="showAddForm">Tambah Item</button>
    </div>
    <div class="item-cards row">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit-item="editItem"
        @delete-item="handledeleteItem"
        class="col-md-6 col-lg-4"
      />
    </div>

    <Modal :visible="showForm" @close="cancelEditForm">
      <ItemForm
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="cancelEditForm"
      />
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import ItemCard from "./itemCard.vue";
import Modal from "@/components/Modal.vue";
import ItemForm from "./itemForm.vue";
import { useItemStore } from "@/store/itemStore";
import { EventBus } from "@/utils/EventBus";

export default {
  name: "ItemList",
  components: {
    ItemCard,
    Modal,
    ItemForm,
  },
  setup() {
        const itemStore = useItemStore();
        const items = computed(() => itemStore.items);

        onMounted(() => {
            itemStore.fetchItems();
        });
        return {
            items,
            itemStore,
            addItem: itemStore.addItem,
            updateItem: itemStore.updateItem,
            deleteItem: itemStore.deleteItem,
        };
    },
    data() {
        return {
            showForm: false,
            selectedItem: null,
            isEdit: false,
            searchQuery: "",
        };
    },


    methods: {
        showAddForm() {
            this.selectedItem = { id: 0, name: "", description: "", quantity: 0 };
            this.isEdit = false;
            this.showForm = true;
        },
        editItem(item) {
            this.selectedItem = { ...item };
            this.isEdit = true;
            this.showForm = true;
        },
        async handleSubmit(item) {
            if (this.isEdit) {
                await this.itemStore.updateItem(item);
            } else {
                await this.itemStore.addItem(item);
            }
            await this.itemStore.fetchItems();
            this.showForm = false;
        },
        cancelEditForm() {
            this.showForm = false;
        },
        async handledeleteItem(item) {
            await this.deleteItem(item);
            await this.itemStore.fetchItems();
        },
        handleSearch(query) {
            this.searchQuery = query;
        },
    },
    mounted() {
        EventBus.on("search", this.handleSearch);
    },
    beforeUnmount() {
        EventBus.off("search", this.handleSearch);
    },
};
</script>

<style scoped>
.item-list {
  background-color: white;
  border-radius: 8px;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.header h2 {
  color: #595dd1;
  font-size: 24px;
}
.btn btn-primary{
  background-color: #595dd1;
  color: white;
}
</style>
