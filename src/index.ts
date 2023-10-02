/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import { v4 as uuidv4 } from 'uuid';

const list = document.getElementById('list') as HTMLUListElement
const form = document.getElementById('new-task-form') as HTMLFormElement | null
const input = document.getElementById('new-task-title') as HTMLInputElement

type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at: Date;
}

const saveTasks = (): void => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
const loadTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  if(!tasks) return [];
  return JSON.parse(tasks);
}

const addListItem = (task: Task): void => {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', (event) => {
    task.completed = checkbox.checked;
    console.log(tasks);
    saveTasks();
  })
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);



form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if(!input?.value) return;
  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    created_at: new Date()
  }
  tasks.push(newTask);
  saveTasks();
  addListItem(newTask);
  input.value = '';
})