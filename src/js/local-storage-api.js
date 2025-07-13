import { nanoid } from 'nanoid';

const localKey = 'my-tasks';
initStorage();

export function getTasksFromStorage() {
  const data = JSON.parse(localStorage.getItem(localKey));
  return data;
}

export function initStorage() {
  const data = getTasksFromStorage() ?? [];
  localStorage.setItem(localKey, JSON.stringify(data));
}

export function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem(localKey, JSON.stringify(tasks));
}

export function deleteStorageTask(id) {
  const array = getTasksFromStorage();
  const filteredArray = array.filter(elem => elem.id !== id);
  localStorage.setItem(localKey, JSON.stringify(filteredArray));
}
