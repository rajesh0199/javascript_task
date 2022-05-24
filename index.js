let submitBtn = document.querySelector('#submitBtn');
console.log("submit btn : " + submitBtn);

// setting local storage
function setLocalStorage() {
  if (localStorage.getItem('userData')) {
    let showDiv = document.querySelector('#show');
    showDiv.innerHTML = ""; 
    console.log("i am from getitem on local storage")
    let arr = JSON.parse(localStorage.getItem('userData'));
    console.log(arr);
    arr.forEach((user, id) => {
      let newDiv = document.createElement('div');
      let htmlData = `<span>Name : </span> ${user.name} || <span>Email : </span>  ${user.password} || <span>Number : </span>  ${user.number}
      <button onClick='onDelete(${id})' class="btn btn-danger edit_btn">Delete</button>
      <button id="btnEdit" onClick='onEdit(${id})' class="btn btn-success edit_btn">EDIT</button>`;
      newDiv.insertAdjacentHTML('afterbegin', htmlData);
      showDiv.insertAdjacentElement('afterbegin', newDiv)
    });
  } else {
    let arr = [];
    let arrData = {
      name: "",
      password: "",
      number: ""
    };
    arr.push(arrData);
    localStorage.setItem('userData', JSON.stringify(arr));
    console.log("data pushed successfully ");
  }
}
setTimeout(() => {
  setLocalStorage();
}, 2);


// CRUD operation 
// on submit event default
submitBtn.addEventListener('click', (e) => {
  e.preventDefault()

  // getting data from local storage 
  let arr = JSON.parse(localStorage.getItem('userData'));

  // getting input form input fields
  let name = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;
  let number = document.querySelector("#number").value

  // push it into arr
  if (name.length <= 0 && password.length <= 0) {
    alert("enter something")
  } else if (name.length > 0 && password.length > 0) {
    let arrData = {
      name: name,
      password: password,
      number: number
    };
    arr.push(arrData);
    localStorage.setItem('userData', JSON.stringify(arr));
    console.log("userData added succesfully from suybmit btn")
    setLocalStorage();
    alert("added succesfully")
  } else {
    alert("Plz Enter Your Details")
  }
  name = ""
})

// deletebutton
function onDelete(id) {
  console.log(id)
  let arr = JSON.parse(localStorage.getItem('userData'));
  let deleteArr = [...arr];
  deleteArr.splice(id, 1);
  arr = [...deleteArr];
  localStorage.setItem('userData', JSON.stringify(arr));
  setLocalStorage();
}

// edit
function onEdit(id) {
  console.log(id);
  let arr = JSON.parse(localStorage.getItem('userData'));
  let name = document.querySelector("#name").value = arr[id].name;
  let password = document.querySelector("#password").value = arr[id].password;
  let number = document.querySelector("#number").value = arr[id].number
  submitBtn.setAttribute('disabled', true)
  let editBtn = document.createElement('button');
  let form = document.querySelector('#form');
  let btnEdit = document.querySelectorAll('#btnEdit');
  editBtn.innerHTML = "save edit";
  editBtn.classList.add("btn", "btn-info")
  btnEdit.forEach((element) => { element.setAttribute('disabled', true); })
  form.insertAdjacentElement('beforeend', editBtn)
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let newname = document.querySelector("#name");
    let newpassword = document.querySelector("#password");
    let newnumber = document.querySelector("#number");
    arr.splice(id, 1, { name: newname.value, password: newpassword.value, number: newnumber.value })
    localStorage.setItem('userData', JSON.stringify(arr));
    setLocalStorage();
    newname.value = ""
    newpassword.value = ""
    newnumber.value = ""
    form.removeChild(form.lastElementChild);
    submitBtn.removeAttribute('disabled')
  })
}