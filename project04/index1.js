function handleFormSubmit(event){
    event.preventDefault();
    const todoDetails = {
        todoname : event.target.todoname.value,
        description : event.target.description.value,
        isDone : false
    };
    axios.post("https://crudcrud.com/api/cda63e59f78d4c19a188deb8ab450029/todoNew",
todoDetails).then((response)=> displayUserOnScreen(response.data))
            .catch((error)=>console.log(error))
    
    document.getElementById("todoname").value = "";
    document.getElementById("description").value = "";
}
window.addEventListener("DOMContentLoaded",()=> {
    axios.get("https://crudcrud.com/api/cda63e59f78d4c19a188deb8ab450029/todoNew")
        .then((response)=>{
            for(let i=0; i<response.data.length; i++){
                displayUserOnScreen(response.data[i]);
            }
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err);
        })
})
function displayUserOnScreen(todoDetails){
    const todounorderedlist = document.getElementById("todo");
    const doneunorderedlist = document.getElementById("done")
    const newLi = document.createElement('li');
    newLi.textContent = todoDetails.todoname+' - '+todoDetails.description;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete"
    deleteButton.onclick = () => {
        console.log(todoDetails)
        axios.delete(`https://crudcrud.com/api/cda63e59f78d4c19a188deb8ab450029/todoNew/${todoDetails._id}`)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))
            if(todoDetails.isDone){
                doneunorderedlist.removeChild(newLi);
            }
        todounorderedlist.removeChild(newLi);
    }

    const doneButton = document.createElement('button');
    doneButton.textContent = "Done";
    doneButton.onclick = () =>{
        todounorderedlist.removeChild(newLi)
        axios.put(`https://crudcrud.com/api/cda63e59f78d4c19a188deb8ab450029/todoNew/${todoDetails._id}`,{
            todoname : todoDetails.todoname,
            description : todoDetails.description,
            isDone : true
        }).then((response)=>{
                console.log(response)
                axios.get("https://crudcrud.com/api/cda63e59f78d4c19a188deb8ab450029/todoNew")
            .then((response) =>{
                for(let i=0; i<response.data.length; i++){
                    console.log(response.data[i].isDone)
                    if(response.data[i].isDone){
                        displayUserOnScreen(response.data[i]);
                    }
                }
            })
            .catch((err)=>{
                console.log(err);
            })
            
        }).catch((err)=>console.log(err));
        
        //displayUserOnScreen(todoDetails)
    }
    // newLi.appendChild(deleteButton);
    // newLi.appendChild(doneButton);
    // todounorderedlist.appendChild(newLi);
    if(todoDetails.isDone){
        newLi.appendChild(deleteButton);
        doneunorderedlist.appendChild(newLi)
    }else{
        newLi.appendChild(deleteButton);
        newLi.appendChild(doneButton);
       todounorderedlist.appendChild(newLi);
    }
}