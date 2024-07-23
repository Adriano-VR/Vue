import { ref } from "vue";

export interface Task {
  id: number;
  tarefa: string;
  completed: boolean;
}

export const dados = ref<Task[]>([
  { id: 1, tarefa: 'Tarefas', completed: false }
]);
