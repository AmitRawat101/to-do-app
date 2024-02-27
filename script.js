let url = "http://worldtimeapi.org/api/Asia/Kolkata";
const btn = document.querySelector(".task button");
const taskbox = document.querySelector(".task input");

async function checktime() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Get the full datetime string from the API response
        const fullDatetime = new Date(data.datetime);

        // Extract the time, date, and year components
        const time = fullDatetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        const date = fullDatetime.toLocaleDateString('en-IN'); // Format the date as per the desired format

        // Create the formatted time string
        const formattedTime = `${time} , ${date}`;

        // Update the HTML element with the formatted time
        document.querySelector(".time").innerHTML = formattedTime;
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}
checktime();

const addtask = (event) => {

   // Prevent form from submitting
   event.preventDefault();

   // Get the task text from the input field
   const taskText = taskbox.value.trim(); // Trim whitespace

   // Check if the task text is not empty
   if (taskText === '') {
       alert('Please enter a task.');
       return; // Exit the function early if taskText is empty
   }

   // Create a new task box div
   const taskBox = document.createElement('div');
   taskBox.classList.add('box');
   taskBox.textContent = taskText; // Set task text directly to the box content

   // Append the task box to the container1
   const container1 = document.querySelector('.container1');
   container1.appendChild(taskBox);
   
   // Clear the input field after adding the task  
   taskbox.value = '';
   
       // Create a delete button
       const deleteBtn = document.createElement('button');
       deleteBtn.innerText = 'Delete';
       deleteBtn.style.backgroundColor = 'blue';
       deleteBtn.classList.add('delete');
       taskBox.appendChild(deleteBtn);
       
    deleteBtn.addEventListener('click', () => {
        // Apply fadeOut animation to taskBox
        taskBox.style.animation = 'fadeOut 0.8s forwards'; // 0.5s is the duration of the animation
    
        // Create a new reference to the taskBox element
        const currentTaskBox = taskBox;
    
        // Remove taskBox from the DOM after the animation ends
        currentTaskBox.addEventListener('animationend', () => {
            container1.removeChild(currentTaskBox);
        });
    });
    
    
    
       //create a checkbox
       const checkbox=document.createElement('input');
       checkbox.type='checkbox';
       checkbox.classList.add('checkbox');
       taskBox.appendChild(checkbox);
   // event listner for check box 
   checkbox.addEventListener('change',()=>{
    if(checkbox.checked){
        taskBox.style.textDecoration = 'line-through';
        taskBox.style.color='yellow';
        taskBox.style.backgroundColor = 'green';
    }
    else{
        taskBox.style.textDecoration = 'none';
        taskBox.style.color='white';
        taskBox.style.backgroundColor = 'rgb(120, 34, 34)';
    }
   })
};

btn.addEventListener("click", addtask);
