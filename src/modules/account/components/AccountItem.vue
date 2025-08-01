<script setup lang="ts">
import ButtonDelete from '@/components/UI/Buttons/ButtonDelete.vue';
import InputBase from '@/components/UI/Inputs/InputBase.vue';
import SelectBase from '@/components/UI/Inputs/SelectBase.vue';
import InputsLabel from '@/components/UI/Inputs/InputsLabel.vue';

import { ref } from 'vue';

import type { Account } from '@/modules/account/types/account';
import { AccountType } from '@/modules/account/types/account';
import { useAccountStore } from '@/modules/account/store/accountStore';

const accountStore = useAccountStore();

const { account } = defineProps<{ account: Account }>();

const currentAccount = ref<Account>(account);

const updateAccount = (): void => {    
    if (account.type === AccountType.LDAP) {
        currentAccount.value.password = null;
    }

    accountStore.updateAccount(currentAccount.value);    
};
</script>

<template>
    <form
        class="account-base grid grid-cols-5 items-center gap-x-2 gap-y-4 w-full"
        @keyup.enter.prevent="updateAccount"
    >
        <InputsLabel
            :id="`${account.id}-label`"
            :name="`${account.id}-label`"
            v-model="currentAccount.label"
            :maxLength="50"
            @blur="updateAccount"            
        />

        <SelectBase
            :id="`${account.id}-type`"
            :name="`${account.id}-type`"
            v-model="currentAccount.type"
            @blur="updateAccount"
        />

         <InputBase
            :class="{ big: account.type === AccountType.LDAP }"
            :id="`${account.id}-login`"
            :name="`${account.id}-login`"
            type="text"
            v-model="currentAccount.login"
            :maxLength="100"
            :required="true"
            @blur="updateAccount"            
        />

        <InputBase
            :id="`${account.id}-password`"
            :name="`${account.id}-password`"
            type="password"
            v-model="currentAccount.password"
            :maxLength="100"
            :required="true"
            v-if="account.type !== AccountType.LDAP"
            @blur="updateAccount"
        />

        <ButtonDelete :id="account.id" />
    </form>
</template>

<style lang="scss" scoped>
.account-base {
    & > label.big {
        grid-column: span 2;
    }
}
</style>
