// app/storage/tasks.ts
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Task } from "../models/Task"

const TASKS_KEY = "TASKS"

export async function saveTasks(tasks: Task[]) {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export async function loadTasks(): Promise<Task[]> {
  const data = await AsyncStorage.getItem(TASKS_KEY)
  if (!data) return []
  const parsed = JSON.parse(data)
  return parsed.map((t: any) => ({
    ...t,
    dueDate: new Date(t.dueDate),
    createdAt: new Date(t.createdAt),
  }))
}
