<script setup lang="ts">
import type { Account } from '@/modules/account/types/account';
import IconDelete from '@/components/UI/Icons/IconDelete.vue';

import { useAccountStore } from '@/modules/account/store/accountStore';

const props = defineProps<{ id: Account['id'] }>();

const accountStore = useAccountStore()

const deleteAccount = (): void => {    
    accountStore.deleteAccount(props.id)
};
</script>

<template>
    <button class="btn-del w-8 h-8 hover:scale-110 transition-transform duration-300 cursor-pointer relative z-10" @click="deleteAccount" type="button" aria-label="Удалить аккаунт">
        <IconDelete/>
    </button>
</template>

<style lang="scss" scoped></style>
