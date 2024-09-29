<template>
    <div>
      <input type="file" class="form-control" :class="inputClass" @change="handleFileChange" />
      <div v-if="error" class="text-danger fs-sm">{{ error }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    modelValue: File,
    inputClass : String
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const error = ref('');
  
  const validateFile = (file) => {
    const validFormats = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes
  
    if (!validFormats.includes(file.type)) {
      return 'Format file salah, hanya boleh PDF, JPG, JPEG, dan PNG.';
    }
  
    if (file.size > maxSize) {
      return 'Ukuran file tidak boleh lebih dari 1MB.';
    }
  
    return '';
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validationError = validateFile(file);
  
    if (validationError) {
    error.value = validationError;
    emit('update:modelValue', null);
    fileInput.value.value = ''; // Clear the file input
  } else {
    error.value = '';
    emit('update:modelValue', file);
  }
  };
  
  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      error.value = validateFile(newValue);
    }
  });
  </script>
  