<template>
  <div class="bg-[#f2f3f9] h-screen ">
    <div class="flex flex-col items-center justify-center h-full">
      <div class="w-6/12">
        <div class="flex   p-10 shadow-lg bg-white rounded">
        <input class="bg-[#f4f4fa] outline-none border rounded w-full p-2"  type="text" id="tarefa" placeholder="e.g. Play Soccer" />
        <button @click="salvar" class="bg-green-600 py-2 px-5 text-white font-semibold ">Submit</button>
        </div>
        <div v-if="dados.length > 0" class="  shadow-lg rounded bg-white p-5 mt-5" >
          
          <ul class="flex flex-col gap-5">
            
            <li v-for="item in dados" :key="item.id" class="border flex justify-between p-2">
              <div class="flex items-center gap-2  "  @click="complete(item.id)">
                <Check v-if="!item.completed"  class="size-7" />
                <BookmarkCheck v-else class="size-7 text-green-600"  />

                <span :class="item.completed && 'line-through' " class="font-semibold">{{ item.tarefa }} </span>
              
                </div>
            
           <div class="flex gap-5">
            <span :class="item.completed ? 'text-green-600' : 'text-red-700'">
                    {{ item.completed ? 'Complete' : 'Not Complete' }}
                    </span>
                    <Trash2 @click="remover(item)" class="cursor-pointer"/>
           </div>
          
            </li>
            </ul>
        </div>
      </div>
       
           
   
    </div>
  

  

    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { dados } from '../data/dados';
import { Trash2,Check,BookmarkCheck  } from 'lucide-vue-next';
import {Task} from "../data/dados"

// Definindo props
const props = defineProps<{ msg: string }>();

// Carrega as tarefas do localStorage
const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    dados.value = JSON.parse(savedTasks);
  }
};

// Salva uma nova tarefa
const salvar = (event: MouseEvent) => {
  const input = (event.target as HTMLElement).previousElementSibling as HTMLInputElement;
  const newItem = input.value.trim();

  if (newItem !== '') {
    const newTask = { id: Date.now(), tarefa: newItem, completed: false };
    dados.value.push(newTask);
    input.value = ''; // Limpa o campo de entrada após salvar

    // Atualiza o localStorage
    localStorage.setItem('tasks', JSON.stringify(dados.value));
  }
};

// Remove uma tarefa
const remover = (itemToRemove: Task) => {
  dados.value = dados.value.filter(item => item.id !== itemToRemove.id);

  // Atualiza o localStorage
  localStorage.setItem('tasks', JSON.stringify(dados.value));
};

// Marca uma tarefa como completa
const complete = (taskId: number) => {
  const task = dados.value.find(item => item.id === taskId);
  if (task) {
    task.completed = !task.completed; // Alterna o status de concluído
    // Atualiza o localStorage
    localStorage.setItem('tasks', JSON.stringify(dados.value));
  }
};

// Carrega as tarefas do localStorage quando o componente é montado
onMounted(() => {
  loadTasks();
});
</script>
