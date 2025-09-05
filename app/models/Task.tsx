// app/models/Task.ts
export interface Task {
  id: string;
  name: string;
  dueDate: Date;
  startDate: Date;
  workUnits: number; // you can later decide if this is fixed units or just a progress bar
  completedUnits: number;
  priority: "low" | "medium" | "high";
  category?: string;
  notes?: string;
  createdAt: Date;
  isCompleted: boolean;
}
