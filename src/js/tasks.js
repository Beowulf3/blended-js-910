import { nanoid } from 'nanoid';
import { saveTaskToStorage, getTasksFromStorage } from './local-storage-api';
import { deleteStorageTask } from './local-storage-api';

const form = document.querySelector('.header-form');
const list = document.querySelector('.tasks-list');

getStorageTask();

export function addNewItem(event) {
  event.preventDefault();
  const title = event.target.taskName.value.trim();
  const descr = event.target.taskDescription.value.trim();
  const newTask = {
    title,
    descr,
    id: nanoid(),
  };
  console.log(newTask);
  const markUp = createMarkup(newTask);
  list.insertAdjacentHTML('beforeend', markUp);
  saveTaskToStorage(newTask);
  form.reset();
}

export function getStorageTask() {
  const arr = getTasksFromStorage();
  const markup = arr.map(createMarkup).join('');
  list.insertAdjacentHTML('beforeend', markup);
}

function createMarkup({ title, descr, id }) {
  return `
    <li class="task-list-item" data-id="${id}">
    <button class="task-list-item-btn">Delete</button>
        <h3>${title}</h3>
        <p>${descr}</p>
    </li>
    `;
}

function deleteTask(event) {
  if (event.target.classList.contains('task-list-item-btn')) {
    const taskItem = event.target.parentElement;
    taskItem.remove();
    deleteStorageTask(taskItem.dataset['id']);
  }
}

list.addEventListener('click', deleteTask);
form.addEventListener('submit', addNewItem);
