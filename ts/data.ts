/* exported data */
interface Todo {
  todoId: string;
  task: string;
  isCompleted: boolean;
}

let todos: Todo[] = [];
const previousTodosJson = localStorage.getItem('javascript-local-storage');

if (previousTodosJson !== null) {
  todos = JSON.parse(previousTodosJson);
}

window.addEventListener('beforeunload', () => {
  const todosJson = JSON.stringify(todos);
  localStorage.setItem('Javascript-local-storage', todosJson);
});
