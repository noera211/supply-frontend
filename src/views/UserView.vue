<template>
    <div class="user-view">
        <div class="scrollable-content">
            <div v-if="currentComponent === 'items'">
                <ItemList />
            </div>
            <div v-else-if="currentComponent === 'transactions'">
                <TransactionList />
            </div>   
            <div v-else-if="currentComponent === 'history'">
                <HistoryList />
            </div>
        </div>
    </div>
</template>

<script>
import ItemList from '@/components/user/item/ItemList.vue';
import TransactionList from '@/components/user/transaction/TransactionList.vue';
import HistoryList from '@/components/user/HistoryList.vue';

export default {
    props: {
        currentComponent: {
            type: String,
            required: true
        }
    },
    components: {
        ItemList,
        TransactionList,
        HistoryList
    },
    data() {
        return {
        showForm: false,
        selectedItem: null,
        isEdit: false
        };
    },
    methods: {
        showEditForm(item) {
        this.selectedItem = item;
        this.isEdit = true;
        this.showForm = true;
        },
        handleSubmit() {
        // Implement the logic for handling form submission
        this.showForm = false;
        this.selectedItem = null;
        this.isEdit = false;
        },
        cancelEditForm() {
            this.showForm = false;
            this.selectedItem = null;
            this.isEdit = false;
        }
    }
};
</script>

<style scoped>
.user-view {
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