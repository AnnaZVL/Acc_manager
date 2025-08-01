<script setup lang="ts">
import HeaderBase from './components/Header/HeaderBase.vue';
import AccountItem from './modules/account/components/AccountItem.vue';
import { useAccountStore } from './modules/account/store/accountStore';

import { onMounted } from 'vue';

const accountStore = useAccountStore();

onMounted(() => {
    accountStore.loadAccounts();
});
</script>

<template>
    <HeaderBase />
    <main class="flex flex-col flex-1">
        <p class="p-2 mb-4 inline-block bg-indigo-100">
            Для указания нескольких меток для одной пар логин/пароль используйте разделитель ;
        </p>
        <section class="flex flex-1 flex-col gap-6 overflow-y-auto h-full">
            <div class="grid grid-cols-5 items-start gap-x-2">
                <span>Метки</span>
                <span>Тип записи</span>
                <span>Логин</span>
                <span>Пароль</span>
            </div>

            <AccountItem v-for="acc in accountStore.accounts" :key="acc.id" :account="acc" />
        </section>
    </main>
</template>

<style scoped></style>
