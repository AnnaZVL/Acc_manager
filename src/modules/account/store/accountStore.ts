import type { Account } from '@/modules/account/types/account'
import  { AccountType } from '@/modules/account/types/account'
import { useStorage } from '@/composables/useStorage'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountStore = defineStore('accountStore', () => {
    let accounts = ref<Account[]>([]);

    const { toLocalStorage, fromLocalStorage } = useStorage<Account>();
    
    const addAccount = ():void => {
        const newAccount: Account = {
            id: Date.now(),
            label: [{text: ''}],
            login: '',
            password: '',
            type: AccountType.LOCAL
        }
        accounts.value.push(newAccount)
        
        toLocalStorage('accounts', accounts.value);
    }

    return {
        accounts,
        addAccount
    }
})