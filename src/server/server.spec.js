import { addNewTask, updateTask } from "./server";

(async function myFunc (){
	await addNewTask({
		name: "My DBServer Test Task",
		id: "99997"
	}); 

	await updateTask({
		id: "99997",
		name: "My UPDATED DBServer Test Task"
	})

})(); 

