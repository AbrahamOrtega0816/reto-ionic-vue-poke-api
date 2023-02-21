<template>
  <div class="example-six">
    <vue-awesome-paginate
      :total-items="count"
      v-model="currentPage"
      :items-per-page="limit"
      :max-pages-shown="2"
    >
      <template #prev-button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>

      <template #next-button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { computed } from "vue";

const store = useStore();

const count = computed(()=> store.getCount);
const limit = computed(()=> store.getLimit);

const currentPage = computed({
  // getter
  get() {
    return store.getCurrentPage;
  },
  // setter
  set(newCurrentPage: number) {
    store.setCurrentPage(newCurrentPage);
  },
});
</script>

<style lang="scss">
.example-six .pagination-container {
  column-gap: 10px;
  align-items: center;
}
.example-six .paginate-buttons {
  height: 35px;
  width: 35px;
  cursor: pointer;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  color: white;
}

.example-six .back-button,
.example-six .next-button {
  background-color: black;
  color: white;
  border-radius: 8px;
  height: 45px;
  width: 45px;
}
.example-six .active-page {
  background-color: #e5e5e5;
  color: black;
}

.example-six .paginate-buttons:hover {
  background-color: #f5f5f5;
  color: black;
}
.example-six .active-page:hover {
  background-color: #e5e5e5;
  color: black;
}

.example-six .back-button svg {
  transform: rotate(180deg) translateY(-2px);
}
.example-six .next-button svg {
  transform: translateY(2px);
}

.example-six .back-button:hover,
.example-six .next-button:hover {
  background-color: rgb(45, 45, 45);
}

.example-six .back-button:active,
.example-six .next-button:active {
  background-color: rgb(85, 85, 85);
}
</style>
