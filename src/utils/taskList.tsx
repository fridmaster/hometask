import { Item, Task } from "../types/tasks";
import { apiRequest } from "./apiRequest";

function getFullTaskList(): Promise<Item[]> {
  return apiRequest(import.meta.env.VITE_API_HOST);
}

function prepareTaskList(taskList: Item[]): Task[] {
  return taskList.map((task: Item) => ({
    ...task,
    isCompleted: false,
  }));
}

function calculateTotalPages(taskList: Task[], sizeOfPage: number): number {
  return Math.ceil(taskList.length / sizeOfPage);
}

function getCurrentPageRange(currentPage: number, sizeOfPage: number, totalTasks: number) {
  const start = (currentPage - 1) * sizeOfPage;
  const end = Math.min(start + sizeOfPage, totalTasks);
  return { start, end };
}

function isAllChecked(taskList: Task[]): boolean {
  return taskList.every((task: Task) => task.isCompleted);
}

function getCompletedTasksCount(taskList: Task[]): number {
  return taskList.filter((task: Task) => task.isCompleted).length;
}

function isAllUnChecked(taskList: Task[]): boolean {
  return taskList.every((task: Task) => !task.isCompleted);
}

export { getFullTaskList, getCompletedTasksCount, prepareTaskList, calculateTotalPages, getCurrentPageRange, isAllChecked, isAllUnChecked };