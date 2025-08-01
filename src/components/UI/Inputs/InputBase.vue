<script setup lang="ts">
import IconPasswordHidden from '@/components/UI/Icons/IconPasswordHidden.vue';
import IconPasswordShowed from '@/components/UI/Icons/IconPasswordShowed.vue';

import type { InputProp } from '@/types/inputs';
import { computed, ref } from 'vue';

const props = defineProps<InputProp>();

const emit = defineEmits<{
    (event: 'update:modelValue', value: string | null): void;
    (event: 'blur'): void;    
}>();

const isVisible = ref<boolean>(false);
const errorMessage = ref<string>('');
const isValid = ref<boolean>(false);

const toggleVisibility = (): void => {
    isVisible.value = !isVisible.value;
};

const inputType = computed<string>(() => {
    if (props.type === 'text') return 'text';
    return isVisible.value ? 'text' : 'password';
});

const iconComponent = computed(() => (isVisible.value ? IconPasswordShowed : IconPasswordHidden));

const handelValue = (e: Event): void => {
    errorMessage.value = '';
    isValid.value = false;

    const target = e.target as HTMLInputElement;

    if (props.required) {
        if (target.value === '') {            
            isValid.value = false;          
            errorMessage.value = `Поле обязательно для заполнения`;
        } else if (props.maxLength && target.value.length >= props.maxLength) {            
            isValid.value = false;          
            errorMessage.value = `Максимальное количество символов: ${props.maxLength}`;
        } else {  
            errorMessage.value = '';
            isValid.value = true;
            emit('update:modelValue', target.value);            
        }
    } else {
        errorMessage.value = '';
        isValid.value = true;
        emit('update:modelValue', target.value);        
    }   
   
    emit('blur');
};
</script>

<template>
    <label class="block w-full" :for="props.name">
        <div class="relative">
            <input
                class="px-4 py-2 w-full bg-transparent rounded-md border-1 hover:bg-indigo-100 transition-colors duration-300"
                :class="{
                'border-1 border-red-400': !!errorMessage,
                'border-2 border-green-400': isValid && !errorMessage,
                'border-1 border-indigo-300': !isValid && !errorMessage
            }"
                :value="modelValue ?? ''"
                :name="name"
                :type="inputType"
                :maxlength="maxLength"
                autocomplete="off"
                :required="required"
                @blur="handelValue"
                @keyup="handelValue"                
            />
            <component
                :is="iconComponent"
                @click="toggleVisibility"
                class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                v-if="props.type === 'password'"
            />

            <transition name="fade">
                <span
                    class="error absolute left-2 top-full mt-1 text-xs text-red-400"
                    v-if="errorMessage"
                    >{{ errorMessage }}</span
                >
            </transition>
        </div>
    </label>
</template>

<style lang="scss" scoped>
    input[type='password']::-ms-reveal,
    input[type='password']::-ms-clear {
        display: none;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.2s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
