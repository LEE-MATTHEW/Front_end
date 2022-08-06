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
  const taskList =tasks.filter(FILTER_MAP[filter]).map((task, index) => (
    <Todo
      key={task.id}
      task={task}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
    />
  ))

  const listHeading = useRef(null);
  const prevTaskLength = useRef(null);

  console.log("prevTaskLength",prevTaskLength)

  // DOM에 접근하기 위해서 비동기로 작성한다
  useEffect(()=> {
    // 이전 렌더링의 prevTaskLength 값을 활용한다
    if (tasks.length-prevTaskLength.current===-1) {
      listHeading.current.focus()
    }
    // current 값을 업데이트 한다
    prevTaskLength.current=tasks.length;
  })

  return (
    <div className='px-2'>
      <Form addTask={addTask} />
      <div className='flex flex-equal mb-2'>
      {FILTER_NAMES.map((name, index) => (
        <FilterButton 
          key={name} 
          name={name} 
          setFilter={setFilter} 
        />
       ))}
      </div>
      <h2
        tabIndex="-1" 
        className=''
        ref={listHeading}
      >
        {tasks.length} task(s) remaining
      </h2>
      <ul>
        {taskList}
      </ul>
    </div>
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
      
      <form onSubmit={handleSubmit} className="mb-2">
        <h1>할일 목록</h1>
        <input 
          type="text" 
          name='' 
          className='w-full mb-2'
          value={name} 
          onChange={handleChange} 
        />
        <button 
          type="submit"
          className='btn btn-secondary w-full'
        >Add</button>
      </form>
    </>
  )
}
function FilterButton(props) {
  return(
    <button 
      type='button' 
      className='btn btn-light'
      onClick={()=> props.setFilter(props.name)}
    >
      {props.name}
    </button>
  ) 
}
function Todo(props) {
  console.log("Todo Loaded", props.task)
  
  const [isEditing, setIsEditing] =useState(false);
  const [newName, setNewName] =useState("");
  const inputEl = useRef(null);
  const editButton = useRef(null);
  const wasEditing = useRef(null);

  console.log("isEditing", isEditing)
  console.log("wasEditing", wasEditing)
  // useRef를 사용해 edit버튼을 눌렀을경우 input으로 커서가 가게하는 법
  // editingTemplate에서 input에 focus효과를 준다
  useEffect(()=>{
    if (isEditing) {
      inputEl.current.focus()
    }
    // wasEditing값에 따라 input에 focus를 결정한다
    if(wasEditing.current) {
      editButton.current.focus();
    }
    // current 값을 변경한다
    // 다시 랜더링을 호출하지는 않는다
    wasEditing.current = isEditing;
  })

  function handleSubmit(e) {
    e.preventDefault();
    
    if(!newName.trim()) { // 빈 String은 조건에서 false이다
      return;
    }
    props.editTask(props.task.id, newName)
    // 수정이 완료되면 해당 Todo를 다시 viewTemplate으로 변경한다
    // 이 기능은 없으면 초기 상태로 다시 돌아가는 것이 아니라 그상태가 유지되어 초기화면으로 돌아가지지 않는다
    setIsEditing(false);
    setNewName("");
  }
  function handleChange(e) {
    setNewName(e.target.value);
    
  }

  const viewTemplate = (
    <>
      <div className='flex items-center' style={{height:"75px"}}>
        <input type="checkbox"
          defaultChecked={props.task.completed}
          onChange={() => props.toggleTaskCompleted(props.task.id)}
        />
        <label htmlFor='' className='ml-2'>
          {props.task.name}
        </label>
      </div>
      <div className='flex flex-equal'>
        <button 
          className='btn btn-light'
          onClick={()=> setIsEditing(true)}
          ref={editButton}
        >
          Edit
        </button>
        <button 
          className='btn btn-danger'
          onClick={() => props.deleteTask(props.task.id)}
        >
          Delete
        </button>

      </div>
    </>
  )

  // button type
  // submit : form을 제출
  // button : form내에서 button의 역할(기능을 주어야함)
  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      {/* form group */}
      <div className='flex items-center' style={{height:"75px"}}>
        <div className='w-full'>
          <label htmlFor=''>New name for {props.task.name}</label>
          <input 
            type="text"
            className='w-full' 
            onChange={handleChange} 
            ref={inputEl}
          />
        </div>
      </div>
      
      {/* button group */}
      <div className='flex flex-equal'>
        <button 
          type="button"
          className='btn btn-light' 
          onClick={()=>{
            setIsEditing(false);
            setNewName("");
          }}
        >
          Cancel
        </button>
        <button 
          type="submit"
          className='btn btn-secondary'
          >
          Save
        </button>
      </div>
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