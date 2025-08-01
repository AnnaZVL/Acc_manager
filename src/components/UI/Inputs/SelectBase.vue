<script setup lang="ts">
import { AccountType } from '@/modules/account/types/account';
import type { SelectProp } from '@/types/inputs';

import { ref } from 'vue';

defineProps<SelectProp>();

const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
    (event: 'blur'): void;
}>();

const errorMessage = ref<string>('');
const isValid = ref<boolean>(false);

const options: AccountType[] = [AccountType.LOCAL, AccountType.LDAP];

const handelValue = (e: Event): void => {
    errorMessage.value = '';
    isValid.value = false;

    const target = e.target as HTMLSelectElement;
    if (target.value) {
        isValid.value = true;
        emit('update:modelValue', target.value);
    } else {
        isValid.value = false;
        errorMessage.value = 'Поле обязательно для заполнения';
    }
    emit('blur');
};
</script>

<template>
    <div class="relative">
        <select
            :name="name"
            :id="id"
            :value="modelValue"
            @change="handelValue"            
            class="px-4 py-2 w-full bg-transparent rounded-md hover:bg-indigo-100 transition-colors duration-300"
            :class="{
                'border-1 border-red-400': !!errorMessage,
                'border-2 border-green-400': isValid && !errorMessage,
                'border-1 border-indigo-300': !isValid && !errorMessage,
            }"
        >
            <option value="" disabled selected hidden>
                Выберите тип
            </option>
            <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
        </select>

        <transition name="fade">
            <span
                class="error absolute top-full left-2 mt-1 text-xs text-red-400 min-h-[1.5em]"
                v-if="errorMessage"
                >{{ errorMessage }}</span
            >
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
