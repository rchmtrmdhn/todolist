import { useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import Moment from "moment";
import Service from "./Service";
import { Link } from "react-router-dom";


// dibawah ini adalah data dummy
// const todos = [
//   {
//     name: 'Beli bakso aja',
//     date: '2022/08/17',
//     isDone: true,
//   },
//   {
//     name: 'Beli bakso ya',
//     date: '2022/08/16',
//     isDone: false,
//   },
//   {
//     name: 'Beli bakso ya',
//     date: '2022/08/16',
//     isDone: false,
//   },
// ];

function Todolist(){
  
  // let [inputTodo, setInputTodo] = useState("");
  // let [inputDate, setInputDate] = useState("");
  let inputTodoRef = useRef("");
  let inputDateRef = useRef("");
  let [todoList, setTodoList] = useState([]); // menggunakan API
  //let [todoList, setTodoList] = useState(todos); // Untuk tambah
  let [todoIndex, setTodoIndex] = useState(null); // Untuk Edit

  // untuk uji coba
  // function handleInputText(element){
  //   setInputTodo(() => {
  //     inputTodo = element.target.value;
  //   });
  //   // console.log(element.target.value); cek value di console
  // }

  // function handleInputDate(element){
  //   // console.log(element.target.value);
  //   setInputDate(() => {
  //     inputDate = element.target.value;
  //   });
  // }

  async function loadListData(){
    const response = await Service.list();
    const data = response.data.data;
    setTodoList(() => data);
  } // saat menggunakan API
  
  useEffect(() => {
    loadListData();
  }, []); // saat menggunakan API

  // saat menggunakan API
  async function handleAddButton(e){
    e.preventDefault();
    // Edit
    if (todoIndex != null) {
      // menggunakan API
      await Service.update({
      name: inputTodoRef.current.value,
      date: inputDateRef.current.value,
      },
      todoIndex);
      setTodoIndex(() => null);
      // menggunakan cara dummy
      // setTodoList((_todos) => {
      //   _todos[todoIndex].name = inputTodoRef.current.value;
      //   _todos[todoIndex].date = inputDateRef.current.value;
      //   return[..._todos];
      // });
      // setTodoIndex(()=> null);
    } else {
    // Add
    await Service.create({
      name: inputTodoRef.current.value,
      date: inputDateRef.current.value,
      isDone: false,
    });
    // loadListData(); //dipindahkan keluar if dan else agar lebih efektif
    }
    loadListData();
  }

  // dibawah tanpa menggunakan API
  // function handleAddButton(e){
  //   e.preventDefault();
  //   // alert(inputTodo + " - " + inputDate); //contoh muncul di alert
  //   // Edit
  //   if (todoIndex != null) {
  //     setTodoList((_todos) => {
  //       _todos[todoIndex].name = inputTodoRef.current.value;
  //       _todos[todoIndex].date = inputDateRef.current.value;
  //       return[..._todos];
  //     });
  //     setTodoIndex(()=> null);
  //   } else {
  //   // Add
  //     setTodoList((_todos)=> [ ..._todos,
  //       {
  //       name: inputTodoRef.current.value,
  //       date: inputDateRef.current.value,
  //     },
  //   ]);  
  //   }
    
  // }

  async function handleRadioOnChecked(e, index) {
    await Service.toggleDone(index);
    loadListData();
    // saat menggunakan Radio
    // setTodoList((_todos) => {
    //   const _todosLocal = _todos;
    //   _todosLocal[index].isDone = e.target.value;
    //   return [..._todos];
    // })
  }

  async function handleClearAll(e){
    e.preventDefault();
    if(!confirm("Apakah anda YaQueen?")) return;
    await Service.deleteAll();
    // setTodoList(() =>[]); cuma menghapus yang di local 
    loadListData();
  }
  
  async function handleDeleteList(e, index){
    e.preventDefault();
    if(!confirm("Apakah anda YaQueen?")) return;
    await Service.delete(index);
    loadListData();
    // saat menggunakan data dummy
    //   setTodoList((_todos) => {
    //     _todos.splice(index,1);
    //     return [..._todos];
    //   });
    // }
  }

  function handleEdit(e, index){
    e.preventDefault();
    // saat menggunakan API dibawah
    const selectedTodo = todoList.find((_todo) => _todo.id == index);
    // saat menggunakan data dummy dibawah
    // const selectedTodo = todoList[index];
    const formatedDate = Moment(selectedTodo.date).format("Y-MM-DD");
    inputTodoRef.current.value = selectedTodo.name;
    inputDateRef.current.value = formatedDate;
    setTodoIndex(() => index);
  }

  function handleCancel(e){
    setTodoIndex(()=>null);
    inputTodoRef.current.value = null;
    inputDateRef.current.value = null;
  }
  

  return (
    <div className="w-1/2 m-auto space-y-5 pt-3">
      <h1>Todo App</h1>
      <Link to="/about">
      <button className="bg-yellow-300 w-100 p-1 text-white rounded-sm">Goto About Page</button>
      </Link>
      
      <div className="space-x-2 flex flex-row justify-between">
        
          <input //onChange={handleInputText} untuk uji coba
          ref={inputTodoRef}
          type="text"
          name = ""
          placeholder="Add your new todo"
          className="border-2 border-gray-300 p-1 text-xs w-full" />
          <input //onChange={handleInputDate} untuk uji coba menggunakan array
          ref={inputDateRef}
          type="date"
          placeholder="Add your date"
          className="border-2 border-gray-300 p-1 text-xs w-full" />
        
        <button onClick={handleAddButton} 
        className={
          (todoIndex == null ? "bg-cyan-300" : "bg-blue-300") +
        " w-[100px] text-white rounded-sm "}
        > {todoIndex == null ? "Add" :"Edit"} </button>
        <button onClick={handleCancel}
      className="bg-red-300 w-[100px] text-white rounded-sm"
      >
        Cancel
      </button>
      </div>
      

      <div className="space-y-1">
        {todoList.map((todo,key) => (
          <Todo 
          onDelete = {handleDeleteList}
          date = {todo.date} 
          name = {todo.name}
          onEdit = {handleEdit}
          onChange = {handleRadioOnChecked} 
          isDone = {todo.isDone}
          index = {todo.id}
          // index = {key} // saat menggunakan data dummy
          key = {key}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between">
          <p>
            You have {todoList.reduce((total, todo) => {
              if(todo.isDone) return total;
              return (total += 1 );
            }, 0 )} pending task </p>
          <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={handleClearAll}
          >Clear All</button>
      </div>
    </div>
  );
}

export default Todolist;