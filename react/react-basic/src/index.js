// 패키지를 가져오기
import React, {useState,useEffect,useRef,useContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<script src="https://kit.fontawesome.com/767f5ec4ff.js" crossorigin="anonymous"></script>
// JSX 문법
// JavaScript Object를 HTML tag를 쓰는 것 같이 만들 수 있다
// Babel을 통해 일반 JavaScript Object로 변환된다
// const list = (
//   <div>
//     <h1>현대자동차</h1>
//     <ul>
//       <li>제네시스</li>
//       <li>스타리아</li>
//       <li>아이오닉</li>
//       <li>캐스퍼</li>
//     </ul>
//   </div>
// )

// JSX를 사용하지 않는 경우
// const element = React.createElement(
//   'h1',
//   {className: 'greeting'},
//   'Hello, world!'
// );

// html 문서로 element를 append한다

// 리엑트의 컴포넌트
// 함수 컴포넌트
// View를 설계하기 위한 부품이다
// function App() {
//   console.log("App Loaded!")
//   return(
//     <>
//       <h1>App</h1>
//       {/* self-closing 엘리먼트에서는 / 를 추가해야한다 */}
//       <hr/>
//       {/* App 컴포넌트에서 List컴포넌트를 호출 */}
//       <List/>
//     </>
//   ) 
// }

// function List() {
//   console.log("List Loaded!")

//   // JSX에서는 같은 열림태그와 닫힘태그가 엘리먼트를 감싸야(wrap) 한다
//   // return() : 괄호 안에 엔터를 쳐서 입력을 해도 가능하다. 괄호가 없으면 엔터친 코드는 인식을 못함
//   // <></> : react Fragment => html에 전달되지 않는 열림태그와 닫힘태그를 만들 수 있다 
//   return (
//     <>
//     <h1>현대자동차</h1>
//     <ul>
//       <li>제네시스</li>
//       <li>스타리아</li>
//       <li>아이오닉</li>
//       <li>캐스퍼</li>
//     </ul>
    
//     </>
//   )
// }

// // JSX에서 반복적인 데이터 출력할 경우!!!
// const cars = ["제네시스", "스타리아", "아이오닉", "캐스퍼"]

// // props(properties) : 함수컴포넌트에 통과되는 인자(parameter) , 항상 Object의 형태를 하고 있다
// function App(props) {

//   const cars = props.cars;
//   console.log(props.cars);
//   // props.cars.map(car=> {
//   //   console.log(car)
//   // })
//   // const list = cars.map(car => (
//   //   <li>{car}</li>
//   // ))

//   const list = cars.map((car , index) => {
//     return <li key={index}>{car}</li>
//   })
//   console.log(list)
//   return (
//     <>
//       <h1>현대자동차</h1>
//       <ul>
//         {/* JSX value 로 구성된 Array를 출력한다 */}
//         {list}
//       </ul>
//     </>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />); : App 함수 컴포넌트르 호출한다
// root.render(<App cars={cars} />);



// function App(props) {
//   console.log(props)

//   return (
//     <>
//       {/* 문자열 (String) 안에서 JavaScript 변수를 출력한다 {} */}
//       <p>foo: {props.foo}, bar: {props.bar}</p>
//     </>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />); : App 함수 컴포넌트르 호출한다
// // <컴포넌트의 이름  key=value />
// root.render(<App foo="Foo" bar="Bar"/>);


// const DATA = [
//   {name : "Cat", color : "Mixed"},
//   {name : "Bunny", color : "Beige"},
//   {name : "Duck", color : "White"},
// ]

// function App(props) {
//   const animals = props.animals;
//   console.log(animals);
//   return (
//     <>
//       <h1>Animals</h1>
//       <ul>
//         {animals.map((animal,index) => (
//           <li key={index}>{animal.name}, {animal.color}</li>
//         ))}
//       </ul>
//     </>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />); : App 함수 컴포넌트르 호출한다
// // <컴포넌트의 이름  key=value />
// root.render(<App animals={DATA}/>);


// Quiz. 과일 리스트 출력
// 방법1
// const DATA = [
//   {name:"Apple", color:"Red"},
//   {name:"Banana", color:"Yellow"},
//   {name:"Watermelon", color:"Green&Red"}
// ]

// function App(props) {
//   const fruits = props.fruits;
//   return (
//     <>
//       <h1>Fruits</h1>
//       <ul>
//         {fruits.map((fruit,index)=>(
//           <li key={index}>{furit.name},{fruit.color}</li>
//         ))}
//       </ul>
//     </>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />); : App 함수 컴포넌트르 호출한다
// // <컴포넌트의 이름  key=value />
// root.render(<App fruits={DATA}/>);

// 방법2
// const DATA = [
//   {name:"Apple", color:"Red"},
//   {name:"Banana", color:"Yellow"},
//   {name:"Watermelon", color:"Green&Red"}
// ]

// function App({fruits}) {
//   const list = fruits.map((fruit,index)=>(
//     <li key={index}>{fruit.name}, {fruit.color}</li>
//   ));
//   return (
//     <>
//       <h1>Furits</h1>
//       <ul>
//         {list}
//       </ul>
//     </>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />); : App 함수 컴포넌트르 호출한다
// // <컴포넌트의 이름  key=value />
// root.render(<App fruits={DATA}/>);



// // 컴포넌트의 재사용 및 결합
// const DATA = [
//   {model : "제네시스", color : ["Silver","Black","Gray"], cost : 100},
//   {model : "스타리아", color : ["White","Black","Gray"], cost : 80},
//   {model : "아이오닉", color : ["Ivory","Black","Gray"], cost : 90},
//   {model : "캐스퍼", color : ["Green","Black","Red"], cost : 50}
// ]
// function App({cars}) {
//   const list = cars.map((car,index)=> {
//     // map 메서드에서 Car컴포넌트를 return 한다
//     return <Car key={index} car = {car}/>
//   })
//   return (
//     <>
//       <h1>현대자동차</h1>
//       {list}
//     </>
//   )
// }

// function Car({car}) {

//   return (
//     <div>
//       <h3>{car.model}</h3>
//       <p>컬러 : {car.color.length}color</p>
//       <p>가격 : {car.cost}</p>
      
//     </div>
//   )

// }
// const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />); : App 함수 컴포넌트르 호출한다
// // <컴포넌트의 이름  key=value />
// root.render(<App cars={DATA}/>);


// # Error Handling in React
// function App() {
//   // 1. Compile 하는 도중 발생하는 Error
//   // => 문법적으로 잘못된 경우
//   // => Compile: 컴퓨터가 이해하는 언어로 변환하는 과정

//   // 2. 기타 Error
//   // Error handler 를 설정해야 한다
//   // 예)
//   // Objects are not valid as a React child 
//   // => JSX에서 object를 출력할 때 발생하는 Error
//   // => ex> car를 JSX에서 출력할 경우
//   const car = {model:"제네시스"}
//   return (
//     <>
//       <h1>{car.model}</h1>
//     </>
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />); : App 함수 컴포넌트르 호출한다
// // <컴포넌트의 이름  key=value />
// root.render(<App/>);


// # Component에서 조건(condition) 사용
// function App() {
//   const number = 0

//   // 삼항연산자(Ternary)를 사용하여 조건 실행
//   return <p>{number>0 ? "Number는 0보다 크다" : "Number는 0보다 작거나 같다  "}</p>
// } 

// function App() {
//   const bool = true;
//   // &&(and) : 앞의 조건이 참이면 실행 아니면 실행하지 않는다
//   return <p>{bool && "조건은 참이다"}</p>
// }

// function App() {
  // const bool=undefined;
  // ||(or) : undefined로 되어있어 뒤에가 실행됨
  // return <p>{bool || "조건은 정의되지 않았다"}</p>

  // const text = "Text";
  // 앞에가 참이기에 뒤에까지 실행되지 않는다
  // return <p>{text || "다른 조건이 false인 경우 출력"}</p>

  // const bool = false;
  // 둘다 false이기에 실행되지 않는다
  // 빈문자는 false다
  // return <p>{bool || ""}</p>
// }
// const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />); : App 함수 컴포넌트르 호출한다
// // <컴포넌트의 이름  key=value />
// root.render(<App/>);

// #State
// 컴포넌트 안에서 관리되는 변수(지역변수)
// 컴포넌트 안에서만 접근 가능

// function App() {
//   // count : state
//   const [count,setCount] = useState(0);

//   return <h1>{count}</h1>
// }


// # React Hook
// 리엑트에서 제공하는 특별한 메서드
// Hook은 여러가지 규칙이 존재
// 기본 Hook : useState, useEffect, useRef, useContext
// 추가 Hook : useReducer, useMemo, useCallback, ...

// # useState Hook
// 상태 유지값과 그 값을 갱신하는 함수를 반환한다
// function App() {
//   console.log("App Loaded!!")
//   // [state, state를 갱신하는 함수] = useState(State의 초기값)
//   // state가 업데이트되면 컴포넌트는 다시 호출된다
//   const [count,setCount] = useState(0)

//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count+1)}>+</button>
//     </>
//   )
// }

// function App() {
//   const [fruit, setFruit]= useState("Apple");
//   return (
//     <>
//       <h1>{fruit}</h1>
//       <button onClick={()=> setFruit("Tomato")}>Click</button>
//     </>
//   )
// }

// 시계만들기
// function App() {
//   const [clock,setClock]=useState(new Date().toLocaleTimeString())
//   // 컴포넌트가 호출될때마다 setTimeout을 호출한다
//   setTimeout(()=>{
//     setClock(new Date().toLocaleTimeString())
//   },1000)
//   return (
//   <>
//     <h1>현재시간</h1>
//     <h3>{clock}</h3>
//   </>
//   )
// }

// function App() {
//   // 두개의 State를 사용하는 경우
//   const [car1,setCar1]= useState("제네시스 G80");
//   const [car2,setCar2]= useState("아이오닉 5");

//   return ( 
//     <>
//       <h1>현대자동차</h1>
//       <ul>
//         <li>{car1}</li>
//         <li>{car2}</li>
//       </ul>
//       {/* onClick 안에는 함수의 정의가 들어가야함 */}
//       <button onClick={()=>setCar1("제네시스 G90")}>업데이트 제네시스</button>
//       <button onClick={()=>setCar2("아이오닉 6")}>업데이트 아이오닉</button>
//     </>
//   )
// }

// function App() {
//   const [count,setCount] = useState(0);

//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={()=>setCount(count+1)}>+</button>
//       <button onClick={()=>setCount(count-1)}>-</button>
      
//     </>
//   )
// }

function App() {
  const [isCount,setIsCount] = useState(false);

  function handleCount() {
    setIsCount(!isCount)
  }

  return (
    <>
      <h1>좋아요 {isCount}</h1>
      <button onClick={handleCount}>{isCount ? "좋아요 취소" : "좋아요"}</button>
    </>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />); : App 함수 컴포넌트르 호출한다
// <컴포넌트의 이름  key=value />
root.render(<App/>);