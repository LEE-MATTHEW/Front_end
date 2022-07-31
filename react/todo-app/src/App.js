import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


// filter의 조건들을 가지고 있는 Object
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

// filter의 이름으로 구성된 String array
console.log(FILTER_NAMES)

console.log(FILTER_MAP['All'])
// console.log(FILTER_MAP.All) 위와 같은 코드


export default function App(props) {
  console.log("App loaded")

  // tasks state의 초기값을 props.tasks로 한다
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  // tasks를 추적한다
  console.log(tasks)

  // 새로운 Tasks를 추가하는 함수
  function addTask(name) {
    const newTask = { id: Math.random(), name: name, completed: false }
    setTasks([...tasks, newTask]);
  }

  // task를 삭제하는 함수
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id)
    setTasks(remainingTasks)
  }

  // task의 completed를 변경하는 함수
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // task의 completed를 현재의 반대로 변경한다
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      // task를 그대로 return 한다
      return task;
    })
    // console.log(updatedTasks)
    setTasks(updatedTasks)
  }

  function editTask(id,newName) {
    // id가 일치하는 task의 이름을 새로운 이름으로 편집한다
    const editedTaskList = tasks.map(task => {
      if (task.id===id) {
        return {...task,name:newName}
      }
      // 나머지 task는 그대로 return한다
      return task;
    })
    setTasks(editedTaskList)
  }
  return (
    <>
      <Form addTask={addTask} />
      {FILTER_NAMES.map((name, index) => (
        <button
          key={index}
          onClick={() => setFilter(name)}
        >{name}</button>
      ))}
      <ul>
        {tasks.filter(FILTER_MAP[filter]).map((task, index) => (
          <Todo
            key={index}
            task={task}
            deleteTask={deleteTask}
            toggleTaskCompleted={toggleTaskCompleted}
            editTask={editTask}
          />
        ))}
      </ul>
    </>
  );
}
function Form(props) {
  console.log("Form loaded")
  // name이 업데이트 되면 해당 state가 선언된 컴포넌트가 다시 호출된다.
  const [name, setName] = useState("")
  function handleSubmit(e) {
    // CSR에서 form을 제출하는 방식
    // form의 default : 서버에 요청을 보낸다
    e.preventDefault();

    // trim() 문자열의 앞, 뒤 공백을 제거한다
    if(!name.trim()) { // 빈 String은 조건에서 false이다
      return;
    }

    props.addTask(name);
    // 빈 String으로 다시 만드는 과정
    setName("")
  }


  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <>
      <h1>할일 목록</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name='' value={name} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

function Todo(props) {
  console.log("Todo Loaded", props.task)
  
  const [isEditing, setIsEditing] =useState(false);
  const [newName, setNewName] =useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.task.id, newName)
    // 수정이 완료되면 해당 Todo를 다시 viewTemplate으로 변경한다
    // 이 기능은 없으면 초기 상태로 다시 돌아가는 것이 아니라 그상태가 유지되어 초기화면으로 돌아가지지 않는다
    setIsEditing(false);
  }
  function handleChange(e) {
    setNewName(e.target.value);
  }

  const viewTemplate = (
    <div>
      <input type="checkbox"
        defaultChecked={props.task.completed}
        onChange={() => props.toggleTaskCompleted(props.task.id)}
      />
      {props.task.name}
      <br />
      <button onClick={()=> setIsEditing(true)}>Edit</button>
      <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
    </div>
  )

  // button type
  // submit : form을 제출
  // button : form내에서 button의 역할(기능을 주어야함)
  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange}/>
      <br/>
      <button type="submit">Save</button>
      <button type="button" onClick={()=>setIsEditing(false)}>Cancel</button>
    </form>
  )
  return (
    <>
      <li>
        {isEditing ? editingTemplate : viewTemplate}
      </li>
    </>
  )
}