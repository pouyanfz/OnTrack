// app/components/TaskItem.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { Task } from "../models/Task";

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <View
      style={{
        height: 10,
        backgroundColor: "#e3e3e3ff",
        borderRadius: 5,
        marginVertical: 4,
      }}
    >
      <View
        style={{
          width: `${Math.min(progress * 100, 100)}%`,
          backgroundColor: color,
          height: "100%",
          borderRadius: 5,
        }}
      />
    </View>
  );
}

export default function TaskItem({
  task,
  onIncrement,
  onDecrement,
}: {
  task: Task;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const workProgress = task.completedUnits / task.workUnits;

  const now = Date.now();
  const totalTime = task.dueDate.getTime() - task.createdAt.getTime();
  const remaining = task.dueDate.getTime() - now;
  const timeLeftProgress = Math.max(remaining / totalTime, 0);

  return (
    <View
      style={{
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{task.name}</Text>
      <Text>Due: {task.dueDate.toDateString()}</Text>
      <Text>Priority: {task.priority}</Text>
      {task.category && <Text>Category: {task.category}</Text>}
      {task.notes && <Text>Notes: {task.notes}</Text>}

      <Text style={{ marginTop: 8 }}>Work Progress</Text>
      <ProgressBar progress={workProgress} color="blue" />

      <Text>Time Remaining</Text>
      <ProgressBar progress={timeLeftProgress} color="green" />

      <Text>
        {Math.ceil(remaining / (1000 * 60 * 60 * 24))} days left (
        {Math.round(timeLeftProgress * 100)}% of time remaining)
      </Text>
      <Text>
        {task.completedUnits}/{task.workUnits} units done,{" "}
        {Math.ceil((task.dueDate.getTime() - now) / (1000 * 60 * 60 * 24))} days
        left
      </Text>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          gap: 10,
          justifyContent: "center",
        }}
      >
        <Button title="–" onPress={onDecrement} />
        <Button title="+" onPress={onIncrement} />
      </View>
    </View>
  );
}
