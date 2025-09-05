// app/index.tsx
import React, { useEffect, useState } from "react";
import { Button, FlatList, Modal, TextInput, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import TaskItem from "./components/TaskItem";
import { Task } from "./models/Task";
import { loadTasks, saveTasks } from "./storage/tasks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [customStart, setCustomStart] = useState(false); // false = default

  const [workUnits, setWorkUnits] = useState("1");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  const addTask = () => {
    const id =
      Date.now().toString() + Math.random().toString(36).substring(2, 9);

    const newTask: Task = {
      id,
      name,
      dueDate,
      startDate,
      workUnits: parseInt(workUnits) || 1,
      completedUnits: 0,
      priority,
      category,
      notes,
      createdAt: new Date(),
      isCompleted: false,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
    setShowModal(false);
    // clear form
    setName("");
    setWorkUnits("1");
    setPriority("medium");
    setCategory("");
    setNotes("");
    setDueDate(new Date());
  };

  const incrementTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id && t.completedUnits < t.workUnits
        ? { ...t, completedUnits: t.completedUnits + 1 }
        : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const decrementTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id && t.completedUnits > 0
        ? { ...t, completedUnits: t.completedUnits - 1 }
        : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onIncrement={() => incrementTask(item.id)}
            onDecrement={() => decrementTask(item.id)}
          />
        )}
      />

      <Button title="Add Task" onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <View style={{ flex: 1, padding: 20 }}>
            <Text>Task Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />

            <Text>Due Date</Text>
            <DateTimePicker
              value={dueDate}
              onChange={(_, date) => date && setDueDate(date)}
            />

            <Text>Start Date (counter)</Text>
            <Button
              title={
                customStart
                  ? "Use Today as Start"
                  : "Pick a Different Start Date"
              }
              onPress={() => setCustomStart(!customStart)}
            />

            {customStart ? (
              <DateTimePicker
                value={startDate}
                onChange={(_, date) => date && setStartDate(date)}
              />
            ) : (
              <Text style={{ marginBottom: 10 }}>Default: Today</Text>
            )}

            <Text>Work Units</Text>
            <TextInput
              value={workUnits}
              onChangeText={setWorkUnits}
              keyboardType="numeric"
              style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />

            <Text>Priority</Text>
            <Picker
              selectedValue={priority}
              onValueChange={(val) => setPriority(val)}
            >
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>

            <Text>Subject</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />

            <Text>Notes</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
              multiline
            />

            <Button title="Save" onPress={addTask} />
            <Button title="Cancel" onPress={() => setShowModal(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
