// // app/add-task.tsx
// import React, { useState } from "react"
// import { View, TextInput, Button, Text } from "react-native"
// import DateTimePicker from "@react-native-community/datetimepicker"
// import { Task } from "./models/Task"
// import { v4 as uuid } from "uuid"

// export default function AddTask({ navigation }: any) {
//   const [name, setName] = useState("")
//   const [dueDate, setDueDate] = useState(new Date())
//   const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

//   const createTask = () => {
//     const task: Task = {
//       id: uuid(),
//       name,
//       dueDate,
//       workUnits: 5,
//       completedUnits: 0,
//       priority,
//       createdAt: new Date(),
//       isCompleted: false,
//     }
//     // pass back to main screen
//     navigation.navigate("MainScreen", { newTask: task })
//   }

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>Task Name</Text>
//       <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10 }} />
//       <DateTimePicker value={dueDate} onChange={(_, date) => date && setDueDate(date)} />
//       <Button title="Save Task" onPress={createTask} />
//     </View>
//   )
// }
