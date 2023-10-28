var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var addBtn = document.getElementById("addBtn")

var tableBody = document.getElementById("tableBody")

//& ==================================>>
var bookMarks = []
var mainIndx = 0;
if(localStorage.getItem("bookMarks")==null){
    bookMarks=[]
}else{
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"))
    displayBookMark(bookMarks)
}


var nameRegex = /^[A-Za-z]{1,}$/

function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        return true
    }else{
        return false
    }
}

var urlRegex = /^(https:\/\/)(www\.)[A-Za-z0-9_\.]{3,}\.[a-z]{3}$/

function isUrlValid(){
    if(urlRegex.test(urlInput.value)){
        return true
    }else{
        return false
    }
}
nameInput.onkeyup = function(){
    if(isNameValid() && isUrlValid()){
        addBtn.removeAttribute("disabled")
    }else{
        addBtn.disabled = "true"
    }
    
}
urlInput.onkeyup = function(){
    if(isNameValid() && isUrlValid()){
        addBtn.removeAttribute("disabled")
    }else{
        addBtn.disabled = "true"
    }
}






addBtn.onclick = function(){
    if(addBtn.innerHTML== "Update"){
        addBtn.innerHTML = "Submit";
        var bookMark = {
            name : nameInput.value,
            url : urlInput.value
        }
        bookMarks.splice(mainIndx,1,bookMark) 
    }else{
        var bookMark = {
        name : nameInput.value,
        url : urlInput.value
    }
    bookMarks.push(bookMark)
    }
    
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
displayBookMark(bookMarks)
clear()
}



function displayBookMark(anyArray){
    var marks = ``
    for(var i = 0; i < anyArray.length; i++){

        marks += `
        <tr class="d-flex justify-content-around align-items-center">
            <td class="fw-bolder">${anyArray[i].name}</td>
            <td><button class="btn btn-primary"><a class="text-white text-decoration-none" href="${anyArray[i].url}" target="_blank">Visit</a></button></td>
            <td><button onclick="updateBook(${i})" class="btn btn-info">Update</button></td>
            <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `;
    }
    tableBody.innerHTML = marks;
}

function clear(){
    nameInput.value='';
    urlInput.value='';
    addBtn.disabled = "true"

}

function deleteBook(indx){
    bookMarks.splice(indx,1)
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks))
    displayBookMark(bookMarks)
}

function updateBook(indx){
    nameInput.value=bookMarks[indx].name
    urlInput.value = bookMarks[indx].url
    addBtn.innerHTML = "Update"
    mainIndx = indx;
}

function search(term){
    var wantedBook=[]
    for(var i=0;i<bookMarks.length;i++){
        if(bookMarks[i].name.toLowerCase().includes(term.toLowerCase())){
            wantedBook.push(bookMarks[i])
        }
            displayBookMark(wantedBook)
        
    }
}