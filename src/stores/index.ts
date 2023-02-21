import { defineStore } from "pinia";

interface mainStore {
    currentPage: number;
    limit: number;
    count: number; 
    searchbar: string; 
    movimientos: string;
    range:number; 
}

export const useStore = defineStore('main', {
    // global states
    state:() : mainStore => ({
       currentPage: 1,
       limit: 4,
       count: 1279,
       searchbar:"",
       movimientos:"",
       range:0,
    }),

    getters: {
        getCurrentPage : state => state.currentPage,
        getLimit : state => state.limit,
        getCount : state => state.count,
        getSearchbar : state => state.searchbar,
        getMovimientos : state => state.movimientos,
        getRange : state => state.range,
    },

    actions:{
        async setCurrentPage(newPage:number) {
            this.currentPage = newPage;
        },
        async setLimit(newLimit:number) {
            this.limit = newLimit;
        },
        async setCount(newCount:number) {
            this.count = newCount;
        },
        async setSearchbar(newSearchbar:string) {
            this.searchbar = newSearchbar;
        },
        async setMovimientos(newMovimientos:string) {
            this.movimientos = newMovimientos;
        },
        async setRange(newRange:number) {
            this.range = newRange;
        },
    },
})