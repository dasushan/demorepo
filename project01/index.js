function handleFormSubmit(event){
    event.preventDefault();
    const expense = event.target.expense.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    console.log(category);
    let details ={
        expense ,
        description ,
        category
    }
    localStorage.setItem(details.category, JSON.stringify(details));
    showUserOnScreen(details)
}
function showUserOnScreen(details){
    const unorderedlist = document.querySelector('ul');
    const newLi = document.createElement('li');
    newLi.textContent = details.expense + ' - ' + details.description + ' - '+details.category;
    const deleteButton = document.createElement('button');
    // input.setAttribute("type","button");
    // input.setAttribute("value","Delete");
    // deleteButton.type = "button"
   // deleteButton.value = "Delete"
   deleteButton.textContent = "Delete"
    deleteButton.onclick = () => {
        localStorage.removeItem(details.category);
        unorderedlist.removeChild(newLi);
    }
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.onclick = () => {
        localStorage.removeItem(details.category);
        unorderedlist.removeChild(newLi);
        document.getElementById('expense').value = details.expense;
        document.getElementById('description').value = details.description;
        document.getElementById('category').value = details.category;
    }

    newLi.appendChild(deleteButton);
    newLi.appendChild(editButton);
    unorderedlist.appendChild(newLi);
}