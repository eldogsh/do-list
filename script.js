// Select all elements
const form = document.getElementById("form");
const input = document.getElementById("taskInput");
const ul = document.getElementById("taskList");
const clearall = document.getElementById("clearall");
const taskemptydiv = document.getElementById("emp");

// Focus on input when window loads
window.onload = input.focus();
taskempty(); // Check if the task list is empty on load

// On form submit
form.onsubmit = newtask;

// Function to add a new task
function newtask(l) {
    l.preventDefault(); // Prevent form submission
    taskempty(); // Update empty task message

    // Check if input is empty
    if (input.value === "") {
        if (!document.querySelector(".valid")) {
            // Create alert message
            const alert = document.createElement("div");
            alert.innerHTML = "Please insert a value";
            alert.classList.add("valid");

            form.appendChild(alert);

            // Remove alert after 1 second
            setTimeout(() => {
                alert.remove();
            }, 1000);
        }
    } else {
        // Capitalize the first letter of the input value
        let invalu = input.value.charAt(0).toUpperCase() + input.value.slice(1);

        // Create li element
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.gap = "10px"; // Add gap between items
        li.style.fontSize = "20px";
        li.style.padding = "12px";
        
        // Mark task as done
        li.onclick = function(e) {
            if (e.target.tagName !== "BUTTON") {
                e.target.classList.toggle("done");
                tasksfinish(); // Update the count of finished tasks
            }
        };

        // Add content to li
        li.innerHTML = `
        <span class="task fs-6">${invalu}</span>
        <div class="d-flex gap-2">
            <button class="del btn btn-outline-danger">Delete</button>
            <button class="edit btn btn-outline-success">Edit</button>
        </div>`;
        
        li.classList.add("classitem", "list-group-item", "list-group-item-light");
        
        // Add li to ul
        ul.appendChild(li);

        // Clear the input and refocus
        input.value = "";
        input.focus();
        taskscount(ul.children.length); // Update the task count

        // Select the delete button for this task and add event listener
        const del = li.querySelector(".del");
        del.onclick = deletetask;

        // Add the edit functionality
        const edit = li.querySelector(".edit");
        edit.onclick = function handleEdit() {
            const taskSpan = li.querySelector('.task');
            const currentTask = taskSpan.innerText;

            // Create input field with current task value
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = currentTask;
            inputField.style.padding="10px";
            inputField.style.outline="none";
            inputField.style.border="1px solid red";
            inputField.style.width="100%";
            inputField.style.borderRadius="20px";

            // Replace task text with input field
            taskSpan.innerHTML = '';
            taskSpan.appendChild(inputField);

            // Change the Edit button to Save
            edit.innerText = 'Save';

            // Save the new task value
            edit.onclick = function handleSave() {
                const newTask = inputField.value.trim();
                if (newTask !== "") {
                    taskSpan.innerHTML = newTask; // Update the task with the new value
                    edit.innerText = 'Edit'; // Change back to Edit

                    // Reassign edit functionality
                    edit.onclick = handleEdit;
                } else {
                    alert('Please insert a value!');
                    inputField.focus();
                }
            };
        };

        // To clear all tasks
        clearall.onclick = clear;

        // Update the empty task message
        taskempty();
    }
}

// Function to delete a task
function deletetask(e) {
    e.target.parentNode.parentNode.remove(); // Remove the task
    taskempty(); // Update the empty task message
    taskscount(ul.children.length); // Update the task count
    tasksfinish(); // Update the finished tasks count
}

// Function to clear all tasks
function clear() {
    ul.innerHTML = ""; // Remove all li elements from ul without removing the ul itself
    taskempty(); // Update the empty task message
    taskscount(ul.children.length); // Update the task count
    tasksfinish(); // Update the finished tasks count
}

// Function to display "Task Empty" when no tasks are present
function taskempty() {
    if (ul.children.length === 0) {
        taskemptydiv.innerHTML = "Task Empty";
        taskemptydiv.classList.add("btn", "btn-outline-warning");
    } else {
        taskemptydiv.innerHTML = "";
        taskemptydiv.classList.remove("btn", "btn-outline-warning");
    }
}

// Function to update the number of all tasks
function taskscount(count) {
    document.querySelector(".tasks").innerHTML = count;
}

// Function to update the number of finished tasks
function tasksfinish() {
    let finished = document.querySelectorAll(".done").length;
    document.querySelector(".finish").innerHTML = finished;
}
