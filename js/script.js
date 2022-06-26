// console.log('hello world');

// console.log('hello world') // java script comment aside

/* 주석처리시 
줄바꿈도 가능 */

// java script는 ';' 이 필수는 아니지만 다른 언어에서는 꼭 써야될 수 있기에 써주는 것이 좋음

// #JavaScript Data type

// String (문자)
// Number (숫자)
// Boolean(참, 거짓)
// Undefined (정의되지 않음)
// null (무효)

// String
// var car ='제네시스' //single quotes 
// var car ="제네시스" //double quotes

// var car = "현대자동차 '제네시스'출시" // ok
// var car = '현대자동차 "제네시스"출시' // ok

// Number
// var num = 2022
// var r = 3.14

// Boolean
// var bool = true;
// var bool = false;

// undefined (변수를 선언은 하지만 정의는 하지 않음)
// var cat = undefined;
// console.log(cat)
// var cat;
// console.log(cat)

// null (의도적으로 값을 무효) 
// var cat = null;
// console.log(cat)

// typeof + value : value의 type을 return 한다
// console.log(typeof 'kitty')  // string
// console.log(typeof 3.14)    // number
// console.log(typeof true)    // boolean
// console.log(typeof undefined)   // undefined
// console.log(typeof null)    // object

// var cat;

// console.log(cat) //value
// console.log(typeof cat) //type

// var cat='kitty';

// console.log(cat) //value
// console.log(typeof cat) //type


// # Object(객체) and Array(배열)

//object : {key : value, ...}
// var cat = {
//     //key : value
//     name: 'Kitty',
//     age: 1,
//     color: 'brown',
//     ismale: false,
//     home: null
// };

// // console.log(cat)
// // console.log(typeof cat)

// //원하는 객체만 출력하는 법
// // console.log(object명.key값(속성))
// console.log(cat.name) //cat의 name 속성(property)에 접근\
// console.log(cat['age'])

// // Array : []
// var animals=['bunny','kitty','duck']
// console.log(animals)
// console.log(animals.length) //array의 길이를 알고 싶을때
// console.log(animals[0]) //array에서 value에 접근방법 : 해당 index번호를 적어준다
// console.log(animals[1]) 
// console.log(animals[2]) 

// var nums = [3,6,9]
// console.log(nums)

// var animals = [
//     {name : 'bunny', age:1,color:'brown',},
//     {name : 'kitty', age:3,color:'black',},
//     {name : 'duck', age:2,color:'white',}
// ]
// console.log(animals)
// console.log(animals[1].color)

// var animals = [
//     {name : 'bunny', age:1,color:'brown',},
//     {name : 'kitty', age:3,color:['black', 'white','yellow']},
//     {name : 'duck', age:2,color:'white',}
// ]

// console.log(animals)
// console.log(animals[1].color[2])
// console.log(animals[1].color[1])

// # Method
// String method

// var cat='kitty'

// console.log(cat)
// console.log(cat.toUpperCase()) // 소문자를 대문자로 변환
// console.log(cat.length) // 문자의 길이(갯수)를 출력
// console.log(cat.split('i')) // ()안의 문자열을 기준으로 나눈뒤 array를 return 한다.
// console.log(cat.slice(1,4)) // (시작, 끝) 시작하는 index 부터 끝의 index 앞에까지 잘라서 출력
// console.log(cat.replace('k','K')) //(바꾸려는 문자열, 바꿀 문자열)
// console.log(cat.concat(' ','hello')) // ('사이에 들어갈 내용','삽입하려는 것') 문자열을 합친다.
// console.log(cat.trim()) // trim() 문자 앞뒤의 공백을 제거한다.
// console.log(cat[1])

// 문자열을 숫자로 바꿀때
// var num = "2022"

// console.log(num)
// console.log(typeof num)
// console.log(Number(num))
// console.log(typeof Number(num))

// Number Method

// var num = 2022

// console.log(num)
// console.log(num.toString()) //숫자를 문자로 바꿀때
// console.log(Math.round(2.6)) //Math.round() 반올림
// console.log(Math.ceil(2.4)) //Math.round() 올림
// console.log(Math.floor(2.7)) //Math.round() 내림

// object & array method

// Object method
// var cat = {
//     name : 'kitty',
//     age : 1,
//     isMale : false,
//     home : null
// }
// // Object.keys(object): object의 key를 array로 return 한다.
// var result = Object.keys(cat)
// console.log(result)

// Array method 

// var animals = ['bunny', 'kitty', 'duck', 'bird']
// console.log(animals)

// // array.toString() : array를 ,로 구분된 문자열로 return한다.
// console.log(animals.toString())

// // array의 마지막 item제거
// animals.pop()
// console.log(animals)

// // array의 마지막에 item추가
// animals.push('dog')
// console.log(animals)

// // array의 첫번째 item을 제거
// animals.shift()
// console.log(animals)

// array.unshift(item) : item을 array의 첫번째 index에 추가
// animals.unshift('dog')
// console.log(animals)
// console.log(animals[0])

// array[index] = item : array의 index번호에 존재하는 아이템을 교체 또는 추가
// animals[3]='dog'
// console.log(animals)
// animals[animals.length]='dog'
// console.log(animals)

// delete array[index] : index 번호의 item을 삭제, 삭제한 item대신에 undefined를 반환
// delete animals[0]
// console.log(animals)
// console.log(animals[0])

var animals = ['bunny', 'cat', 'duck', 'bird']
// var newAnimals = ['dog', 'mouse']

// array.concat(newArray) : Array뒤에 newArray를 합친다.
// const result = animals.concat(newAnimals)
// console.log(result)
// animals.concat(newAnimals)
// console.log(animals)

// Array.splice(start, 갯수) : start index부터 갯수를 삭제
// animals.splice(0,2)
// console.log(animals)

// slice(start, end) : start index부터 end index전 까지 잘라낸 array를 return한다.
// var result = animals.slice(0,3)
// console.log(result)

// Array.map(callback)
// Arrat의 length만큼 실행
// animals.map(function (animals) {
//     console.log(animals)
// })

// animals.map(function(animal) {
//     console.log(animal.toUpperCase())
// })
// console.log(animals[0].toUpperCase())
// console.log(animals[1].toUpperCase())
// console.log(animals[2].toUpperCase())
// console.log(animals[3].toUpperCase())

// Array의 item에 개별적으로 method 사용 가능하다.
// animals.forEach(function(animal) {
//     console.log(animal.toUpperCase())
// })

// Array.map(callback):새로운 Array를 return한다.
// var result = animals.map(function(animal) {
//     return animal.toUpperCase()
// })
// console.log(result)


// var nums = [3,6,9,12]

// // Array.filter(callback) : 조건에 맞는 item을 return한다. 새로운 array생성
// var result = nums.filter(function(num){
//     if (num>6) {
//         return num;
//     }
// })
// console.log(result)

// # JavaScript Operator(연산자)

// Arithmetic (수리연산자)
// Assignment (할당연산자)
// Comparison (비교연산자)
// Logical (논리연산자)

// Arithmetic (수리연산자)
// +,-,*,/,**,++,--,%
// console.log(3+4)

// // 덧셈만 String이 됨
// console.log('3'+4)
// console.log(3+'4')
// console.log('3'+'4')

// console.log('3'-4)
// console.log(3-'4')
// console.log('3'-'4')

// console.log('3'*4)
// console.log(3*'4')
// console.log('3'*'4')

// console.log('3'/4)
// console.log(3/'4')
// console.log('3'/'4')

// console.log(3+'bunny')  // string
// console.log(3+true)     // true : 1
// console.log(3+false)    // false : 0
// console.log(3+undefined)    // NaN:Not a number
// console.log(3+null)     //null : 0

// console.log(3-'bunny')  // NaN : Not a number
// console.log(3-true)     // true : 1
// console.log(3-false)    // false : 0
// console.log(3-undefined)    //NaN : Not a number
// console.log(3-null)     //null : 0

// 제곱
// var x=5;
// var z=x**2;
// console.log(z)
// let x=5;
// let z=Math.pow(x,2);
// console.log(z)

// 나머지
// var x=25;
// var z=x%5;
// console.log(z)

// var num = 1
// // 증가
// num++
// console.log(num)

// // 감소
// num--
// console.log(num)

// Assignment (할당연산자)
// =,+=,-=,*=,/=,%=,**=

// = equal
// var cat='kitty'
// console.log(cat)

// var num = 3

// num = num + 4
// num +=4
// console.log(num)

// var num = 3
// num -=5
// console.log(num)

// Comparison (비교연산자)
// ==, ===, !=, !==, >, <, >=, <=, ?

// ==: value가 일치할 때
// console.log(3 == 3)
// console.log(1 == true)
// console.log(0 == false)
// console.log(0 == null)

// === : value와 type이 모두 일치할 때
// console.log(3 === 3)
// console.log(1 === true)
// console.log(0 === false)
// console.log(0 ===null)

// console.log(undefined == null) //true
// console.log(undefined === null) //false 

// var x = {username:'cat'}
// var y = {username:'cat'}

// object끼리는 비교할 수 없다.
// console.log(x==y)
// console.log(x===y)

// var x=[1,2,3]
// var y=[1,2,3]

// array끼리는 비교할 수 없다.
// console.log(x==y)
// console.log(x===y)
 
// !=
// value가 다르다 
// console.log('3'!=3)
// console.log('3'!=4)

// !==
// value 또는 type이 다르다 
// console.log('3'!==3)
// console.log('3'!==4)

// console.log(3>4)
// console.log(3<4)
// console.log(3 >= 3)
// console.log(3 <= 3)

// ? ternary (삼항연산자)
// var age=20
// // condition ? true : false
// var result=age>15 ? '성인' : '청소년 또는 어린이'
// console.log(result)

// Logical (논리연산자)
// &&, ||, !

// && : and
// console.log(3=='3' && undefined==null)
// console.log(3=='3' && undefined===null)

// || : or
// console.log(3=='3' || undefined==null)
// console.log(3==='3' || undefined==null)
// console.log(3==='3' || undefined===null)

// ! : not
// console.log(3>4)
// console.log(!(3>4))
// console.log(true)
// console.log(!(true))
// console.log("")
// console.log(""==false)
// console.log(""===false)
// console.log(!"")


// # var(변수)

// 변수 선언 declare
// var cat;
// console.log(cat) // undefined

// var cat; // declare
// cat='kitty' // define
// console.log(cat)

// var cat ='kitty'
// var cat ='Garfield'
// console.log(cat)

// # Condition (조건)
// if/else, switch

// var age=20
// if (age> 18) {
//     console.log('성인')
// } else {
//     console.log('청소년 또는 아동')
// }
// if (age>=20) {
//     console.log('성인')
// } else if (age>=14) {
//     console.log('청소년')
// } else {
//     console.log('어린이')
// }

// var person;
// var age = 15;

// if (age>=18) {
//     person='성인'
// } else {
//     person='청소년 또는 어린이'
// }
// console.log(person)

// switch condition
// var day;
// console.log(new Date().getDay()) // 0은 일요일
// switch (new Date().getDay()){
//     case 0:
//         day='일요일';
//         break
//     case 1:
//         day='월요일';
//         break
//     case 2:
//         day='화요일';
//         break
//     case 3:
//         day='수요일';
//         break
//     case 4:
//         day='목요일';
//         break
//     case 5:
//         day='금요일';
//         break
//     case 6:
//         day='토요일';
//         break
// }
// console.log('오늘은 '+day+'입니다.')

// var text;
// switch(new Date().getDay()) {
//     case 6:
//         text = '오늘은 토요일입니다.'
//         break;
//     case 0 : 
//         text = '오늘은 일요일입니다.'
//         break;
//     default :
//         text = '주말을 기다리는 중입니다.'
// }
// console.log(text)

// var txt;
// switch(3){
//     // default가 가장 뒤에 있지 않아도 됨
//     default:
//         txt='주말을 기다리는 중입니다.'
//         break;
//     case 6:
//         txt='오늘은 토요일입니다.'
//         break;
//     case 0:
//         txt='오늘은 일요일입니다.'
// }
// console.log(txt)

// var txt;
// switch(0) {
//     // case를 묶을 수도 있다.
//     case 4:
//     case 5:
//         txt ='주말을 기다리는 중입니다.'
//         break;
//     case 0:
//     case 6:
//         txt = '주말'
//         break;
//     default :
//     txt='평일 또는 주말입니다.'
// }
// console.log(txt)

// var num='0'
// var txt;
// switch (num) { //type과 value 모두 일치해야한다(===)
//     case 0:
//         txt='off'
//         break
//     case 1:
//         txt='on'
//         break
//     default:
//         txt='기본값'
// }
// console.log(txt)

// # Loop(반복문)
// for, while

// for (var i=0; i<10; i++) {
//     console.log(i)
// }

// for(var i=1; i<=10; i+=2) {
//     console.log(i)
// }

// var animals=['bunny','cat','duck','bird']
// for(var i=0; i<animals.length; i++) {
//     console.log(animals[i].toUpperCase())
// }

// for(var animal of animals) {
//     console.log(animal.toUpperCase())
// }

// while 
// var txt='';
// let i=0;

// while(i<10) {
//     txt += '숫자 '+i;
//     i++
// }
// console.log(txt)

// var txt='';
// var animals = ['bunny','cat','duck','bird']

// for(var i=0;i<animals.length;i++) {
//     txt+=animals[i]+' '
// }
// console.log(txt)

// var cat= {name:'kitty',age:1,color:'brown'}
// var txt='';
// for (var key in cat) {
//     console.log(key)
//     txt +=cat[key]+" ";
// }
// console.log(txt)


// # Function(함수)

// 함수선언

// 함수표현식 (function expression)
// 함수선언식 (funciton derclaration)

// 함수 선언식
// function f() {          // finction <함수이름> ()
//     console.log('hello')
// }

// // 함수표현식
// // 함수를 변수에 담는다
// var f= function() {     // 익명함수(함수의 이름이 없음) : function ()
//     console.log('hello')
// }

// 함수 정의(함수 선언식, declaration)
// function f() {
//     console.log('hello')
// }

// f()  // invoke(함수호출)

// // 만약 호출과 선언이 반대의 순서로 되어 있다면??

// f()  // invoke(함수호출)

// function f() {                // Hoisting(정의가 호출시점보다 자동으로 올라간다)
//     console.log('hello')      // 따라서, 출력 내용은 같아진다.
// }


// (함수선언식)()
// self-invoking (자기호출) 함수

// (function () {
//     console.log('hello')
// })()

// function add(a,b) { // function <함수이름> (params1,params2,params3,...)
//     // 반환
//     return a+b;
// }
// var r = add(10,4);
// console.log(r)

// function add() {
//     // 변수 정의
//     // 함수 범위에 있는 변수
//     // 지역 변수(local variable)
//     var a=3;
//     var b=4;
//     return a+b
// }
// var r=add();
// console.log(r)

// // 함수 밖에서 함수의 변수에 접근 불가
// console.log(a)
// console.log(b)

// 함수 밖에서 변수의 설정
// var a=3, b=4;
// function add(x,y) {
//     return x+y
// }
// var r=add(a,b)
// console.log(r)
// console.log(add(a,b))

// 사칙연산 함수
// add, substration, division, multiplication

// function add(x,y) {
//     return x+y;
// }
// function substration(x,y) {
//     return x-y;
// }
// function division(x,y) {
//     return x/y;
// }
// function multiplication(x,y) {
//     return x*y;
// }
// console.log(add(3,4))
// console.log(substration(3,4))
// console.log(division(3,4))
// console.log(multiplication(3,4))

// // 전역변수 (Global variable)
// // 어디에서든지 접근 가능
// var greeting='Good morning'
// function f() {
//     return greeting; //전역변수에 접근 가능
// }
// var r = f();
// console.log(r)

// var greeting = 'Good Morning'
// function f() {
//     var greeting='좋은 아침'
//     return greeting  //전역변수와 지역변수가 같은 경우 지역변수가 우선된다.
// }
// var r=f()
// console.log(r)

// var greeting = 'Good Morning' //변수 선언, 변수 정의
// function f() {

//     greeting='좋은 아침' //변수 정의

//     return greeting  //전역변수와 지역변수가 같은 경우 지역변수가 우선된다.
// }
// var r=f()
// console.log(r)

// # Method(메서드)
// Method는 Object에 소속되어있다.
// Sound는 cat의 Method이다.
// var cat = {
//     name:'kitty',   // name : property(속성), Kitty : value(값)
//     age:1,       // age : property(속성),  1: value(값)
//     sound : function() {  //sound: method - value가 함수일 때
//         return 'meow'
//     }
// }
// var r=cat.sound()
// console.log(r)
// console.log(cat.sound())

// var cat = {
//     name : 'kitty',
//     age : 1,
//     greeting: function() {
//         return 'Hi, I am '+this.name; // this : 메서드의 소유 객체(cat)
//     } 
// }
// var r=cat.greeting()
// console.log(r)

// var cat = {
//     name : 'kitty',
//     age : 1,
//     sound : function() {  
//         return 'meow'
//     },
//     greeting: function(date) {
//         return 'Good morning at'+date; // 메서드에도 인자가 들어 갈수 있으며, 여러개 함수생성가능
//     } 
// }
// var r=cat.greeting(new Date().toLocaleTimeString())
// console.log(r)


// # Callback
// 다른 함수의 인자가 되는 함수

// function first(callback) {
//     console.log('First')
//     callback()
// }
// function second() {
//     console.log('Second')
// }
// first(second)  // first(second()) : error

// function first(callback) {
//     console.log(1)
//     callback()
// }
// function second(callback) {
//     console.log(2)
//     callback()
// }
// function third(callback){
//     console.log(3)
// }
// first(function() {  // first(second(third)) : error [이 같은 형태는 함수를 호출하는 형태이기에 익명함수를 써 callback하는 방법을 쓴다]
//     second(third)
// })

// function first(callback) {
//     console.log(1)
//     callback()
// }
// function second(callback) {
//     console.log(2)
//     callback()
// }
// function third(callback) {
//     console.log(3)
//     callback()
// }
// function fourth(callback) {
//     console.log(4)
//     callback()
// }
// function fifth() {
//     console.log(5)
// }
// first(function(){
//     second(function(){
//         third(function(){
//             fourth(fifth)  
//         })
//     })
// })

// # Asynchronous(비동기 함수) <=> Synchronous(동기 함수)
// 비동기 : 빠른 것부터 처리한다 (많이사용)
// 동기 : 순서대로 처리한다

// Synchronous(동기적)
// 일반적 함수, 자바스크립트 동작방식
// console.log(1)
// console.log(2)
// console.log(3)
// console.log(4)
// console.log(5)

// function first() {
//     console.log(1)
// }
// function second() {
//     console.log(2)
// }
// function third() {
//     console.log(3)
// }
// // 호출순서대로 실행
// first()
// second()
// third()

// // 대표적 Asynchronous(비동기)
// // setTimeout(callback, milliseconds)
// // milliseconds 후에 callback 실행
// setTimeout(function () {
//     console.log('Good Morning')
// },5000) //1s=1000ms

// function myFunction(callback, data) {
//     console.log(data)
//     callback()
// }
// myFunction(function(){
//     console.log('good morning')
// },1000)

// function first(callback) {
//     console.log(1)
//     callback()
// }
// function second() {
//     console.log(2)
// }

// console.log(second) // 함수 정의
// first(second)  // second : callback 함수

// function first(callback){
//     console.log(1)
//     callback()
// }
// first(function () {  //callback함수로 익명함수 사용
//     console.log(2)      // 함수 또느 메서드 실행
// })

// console.log(1)
// setTimeout(() => {  //비동기 함수(가장 마지막에 실행)
//     console.log(2)
// },1500)
// console.log(3)

// function f(callback,ms) {
//     callback()
// }
// console.log(1)
// f(function(){
//     console.log(2)
// },1000)
// console.log(3)

// function f() {      // setTime함수를 활용해서 f를 비동기 함수로 만든다.
//     setTimeout(function () {
//         console.log(2)
//     },0)
// }
// console.log(1)
// f()
// console.log(3)


// setTimeout(function () {
//     console.log(1)
// },1000)
// setTimeout(function () {
//     console.log(2)
// },500)
// setTimeout(function () {
//     console.log(3)
// },0)

// setTimeout(function () {
//     console.log(1)
//     setTimeout(function () {
//         console.log(2)
//         setTimeout(function () {
//             console.log(3)
//         }, 0)
//     }, 500)
// }, 1000)

// console.log(1)
// // 메인이미지
// // 용량이커서 가져오는데 오래 걸린다.
// setTimeout(function (){
//     console.log('이미지를 가져오기 완료')
//     console.log('이미지를 화면에 나타내는 중')
// },1000)
// console.log(3)
// console.log(4)
// console.log(5)

// console.log(1)
// // 이미지를 가져오는 함수
// setTimeout(function (){
//     console.log('이미지를 가져오기 완료')
//     // 이미지를 나타내는 함수 (이미지를 가져오는 함수 밖에 있으면 이미지를 가져오지 않았어도 완료가 되버리기에 문제가 생김)
//     console.log('이미지를 화면에 나타내는 중')
// },1000)
// console.log(3)
// console.log(4)
// console.log(5)

// function fetchUser() {
//     setTimeout(function() {
//         return { username:'changno'}
//     },1000)
// }
// var user = fetchUser()
// console.log(user)

// function fetchUser() {
//     setTimeout(function() {
//         var user = { username:'changno'}
//         console.log(user)
//     },0)
// }
// console.log(1)
// fetchUser()
// console.log(3)

// function first(callback) {
//     var num=1;
//     callback(num) // callback으로 인자를 넘겨준다
// }
// function second(data) {
//     console.log(data+2)
// }

// first(function (d) {
//     second(d)
// })

// first(second)

// function first(callback) {
//     var num=1;
//     callback(num)
// }
// function second(data,callback) {
//     callback(data)
// }
// function third (data) {
//     console.log(data)
// }
// first(function (n) {
//     second(n,third)
// })

// first(function(n){
//     second(n,function(n){
//         third(n)
//     })
// })

// function first (){
//     setTimeout(()=>{
//         console.log(1)
//     },500)
// }
// function second (){
//     setTimeout(()=>{
//         console.log(2)
//     },0)
// }
// function third (){
//     setTimeout(()=>{
//         console.log(3)
//     },1000)
// }

// first()
// second()
// third()

// setTimeout(function () {
//     console.log(1)
//     setTimeout(function () {
//         console.log(2)
//         setTimeout(function () {
//             console.log(3)
//         }, 500)
//     }, 0)
// }, 1000)


// function first (callback){
//     setTimeout(()=>{
//         console.log(1)
//         callback()
//     },500)
// }
// function second (callback){
//     setTimeout(()=>{
//         console.log(2)
//         callback()
//     },0)
// }
// function third (){
//     setTimeout(()=>{
//         console.log(3)
//     },1000)
// }

// first(function(){
//     second(third)
// })

// // 자료를 가져오는 함수
// function fetchData() {  //비동기함수
//     setTimeout(function() {
//         return {username:'changno'}
//     },0)
// }
// // 자료를 보여주는 함수
// function displayData(data) {
//     console.log(data)
// }
// var user = fetchData();
// displayData(user)

// 자료를 가져오는 함수
// function fetchData(callback) {  
//     setTimeout(function() {
//         var user= {username:'changno'}
//         callback(user)
//     },0)
// }
// // 자료를 보여주는 함수
// function displayData(data) {
//     console.log(data)
// }

// console.log(1)
// // 이미지를 가져와서 보여주는 작업은 동기적으로 작동해야 한다.
// fetchData(displayData)
// console.log(3)
// console.log(4)

// # Class, Object constructor
// 객체를 생성하기위한 템플릿
// Javascript - Object constructor 기반 언어
// 기타언어 - Class기반 언어

// ES2015에 class문법 추가

// class 언어
// class className {  //클래스 이름
//     // 생성자
//     constructor() { ... }
// }

// class Car {
//     constructor(name,year) {
//         this.name = name;
//         this.year = year;
//     }
// }
// var myCar = new Car('제네시스',2014);

// console.log(myCar)
// console.log(myCar.name)
// console.log(myCar.year)

// class Car {
//     // 생성자(메서드)
//     constructor(name,year) {
//         this.name=name  //this : class의 인스턴스
//         this.year=year
//     }
//     // 메서드
//     age() {
//         let date = new Date();
//         return date.getFullYear() - this.year + '년';
//     }
// }
// // Car 클래스의 instance
// var staria = new Car("스타리아", 2020)
// console.log(staria)
// console.log(staria.age())
// var avante = new Car("아반떼", 2009)
// console.log(avante)
// console.log(avante.age())
// var casper = new Car("캐스퍼", 2021)
// console.log(casper)
// console.log(casper.age())

// class Car {
//     // 생성자(메서드)
//     constructor(name,year) {
//         this.name=name  //this : class의 인스턴스
//         this.year=year;
//     }
//     // 메서드
//     age(x) {
//         return x - this.year + '년';
//     }
// }
// var date = new Date();
// var year = date.getFullYear();

// // Car 클래스의 인스턴스 생성
// var staria = new Car("스타리아",2020)
// var r = staria.age(year)
// console.log(r)

// # Class inheritance(상속)
// class Brand {
//     constructor(brand){
//         this.brand=brand;
//     }
//     // Car클래스의 메서드
//     showBrand() {
//         return "내 자동차의 브랜드는 " + this.brand + '이며';
//     }
// }
// // class Model은 Car클래스를 상속했다.
// class Model extends Brand {       // extends 상속받을 클래스의 이름
//     constructor(brand, model) {
//         // super() : 상속받은 클래스는 Super() Constructor를 호출해야 한다.
//         super(brand);       //부모 클래스의 생성자로 인자를 넘긴다.
//         this.model=model;     // Model클래스의 인스턴스
//     }
//     showModel() {
//         return '내 자동차의 모델은 '+ this.model
//     }
//     // show() : Model클래스의 메서드
//     showBrandModel() {
//         // 상속받은 클래스는 부모 클래스의 method를 사용할 수 있다.
//         // return this.showBrand() + ', '+this.model
//         return `${this.showBrand()}, ${this.model} 입니다.`  // 이렇게 하면 밑에와 같이 복잡한 형식으로 안써도 됨 ~ 있는 키임!!
//         // '내 자동차 브랜드는 '+ this.showBrand+ '내 자동차의 모델명은 '+this.model+'입니다.'
//     }
// }
// var hyundai = new Brand("현대");
// console.log(hyundai)
// console.log(hyundai.showBrand())

// var staria = new Model("현대", "스타리아")
// console.log(staria)
// console.log(staria.showBrandModel())
// console.log(staria.showBrand()) //부모클래스의 메서드를 가져다 사용했기에 가능!
// console.log(staria.showModel())


// Static method

// class Car {
//     constructor(name) {
//         this.name=name;
//     }
//     // static method 
//     static sound() {
//         return '부릉';
//     }
// } 

// var staria = new Car("스타리아");
// // static method는 인스턴스에서 호출 불가
// // console.log(staria.sound()) //error
// // 클래스에서 직접 호출만 가능
// console.log(Car.sound())  //possible

// class Car {
//     constructor(name){
//         this.name=name;
//     }
//     static sound(data) {
//         return data;
//     }
// }
// var casper = new Car("캐스퍼")
// // casper.sound('부릉') : static method가 아닌경우
// // Car.sound('부릉') : static method인 경우
// console.log(Car.sound('부릉'))



// class 는 Hoisting이 적용되지 않는다.
// var r=Rectangle();   //error
// class Rectangle {
//     constructor(height, width) {
//         this.height=height;
//         this.width=width;
//     }
// }

// Getter
// class Rectangle {
//     constructor (height,width) {
//         this.height=height;
//         this.width=width;
//     }
//     // getter
//     get area() {
//         return this.calcArea();
//     }
//     calcArea() {
//         return this.height * this.width;
//     }
// }
// const square = new Rectangle(10,10)
// console.log(square)

// // getter문법을 사용함으로 문법적으로 단순 & 간편
// // calcArea()를 비공개로 할 수 있다(보안적인 측면)
// console.log(square.area) //getter 호출

// class Rectangle {
//     #height;    // private 필드(속성)선언
//     #width;     // private선언시 자바와는 다르게 #을 붙인다.
//     constructor (height, width){
//         this.#height=height;
//         this.#width=width;
//     }
//     getArea() {
//         return this.#height*this.#width;
//     }
// }
// var square = new Rectangle(10,10)
// console.log(square)
// // console.log(square.#width)  //private필드는 클래스 안에서만 접근 가능
// console.log(square.getArea())

// # Object constructor
// 자바스크립트에서의 클래스

// Object constructor는 앞글자가 대문자
// 자바스크립트에서 class는 syntax sugar(문법적인 조미료)
// class Person {
//     constructor(first, last, age, eye) {
//         this.firstName = first;
//         this.lastName = last;
//         this.age = age;
//         this.eyeColor = eye;
//         this.greeting=function () {
//             return "Hello I'm "+this.firstName
//         }
//     }
// }

// var person = new Person('Doe','john',42,'blue');

// console.log(person)
// console.log(person.greeting())

// String
// console.log(String)

// // String 클래스의 인스턴스 생성
// var user = new String('channo')
// // var user = 'changno'  //literal 방식 : value만 할당하는 방식
// console.log(user)
// console.log(user.toUpperCase())   //toUpperCase() //일반 메서드 
// console.log(String.prototype)

// var cat ={
//     name : 'Kitty',
//     age : 1,
//     color : 'brown'
// }

// Object의 Static Method 'keys'
// var r = Object.keys(cat)
// console.log(Object.prototype)
// console.log(r)

// Static이냐 아니냐에 따라 사용법이 달라짐으로 주의!

// Object
// String
// 내장클래스(Object constructor, 객체 생성자)
// console.log(Object)

// // Object 클래스를 상속받은 클래스
// console.log(String)
// console.log(Number)
// console.log(Boolean)
// console.log(Date)
// console.log(Array)

// // date 클래스의 instance생성
// console.log(new Date())
// console.log(new Date().getFullYear())

// var cat = 'Kitty'
// var cat = new String('Kitty')
// console.log(cat instanceof String)

// var cat = "Kitty"
// cat의 프로토타입 객체
// 프로토타입 객체로부터 상속 받는다.
// console.log(cat.__proto__)

// # Error handling, try/catch

// 자바스크립트의 에러 종류 (Object)
// EvalError
// RangeError
// ReferenceError
// syntaxError
// TypeError
// URIError

// Error object properties(속성)
// 1 name
// 2 message
// 3 stack(optional)

// console.log(cat)
// Uncaught ReferenceError: cat is not defined at ...
// Uncaught : 잡히지 않는 에러
// ReferenceError : error의 name
// cat is not defined at ... : error의 message

// var error = new Error("에러발생!")

// console.log(error)

// var error = new SyntaxError("문법오류!")
// console.log(error)

// throw error; // 에러를 발생시킨다

// try/catch
// try {  //코드를 작성
//     console.log(x)

//     // catch block에서 에러를 처리한다.
// } catch(error){  // Uncaught
//     console.error(error)
// }

// Custom Error와 try/catch
// function fetchUser() {
//     return null;
// }
// class UserException extends Error {
//     constructor(message) {
//         super(message)
//         this.name='UserException'
//     }
// }
// try {
//     var user = fetchUser();
//     if (!user) {
//         throw new UserException('일치하는 회원이 존재하지 않습니다.')
//     }
//     // throw 밑에 코드는 실행되지 않는다.
//     console.log(user)
// } catch(error) {  // error : new UserException("...")
//     console.error(error)
// }


// try {
//     var age = 15;

//     if (age>=18) {
//         console.log('성인입니다.')
//     } else {
//         throw "청소년 및 어린이는 이용 할 수 없습니다."
//     }
    
// } catch(error) {  //error : "청소년.." (String)
//     console.error(error)//에러창과 문구 동시 표시
//     console.log(error)//문구만 표시
// }

// try {
//     // 런타임 에러 (실행가능한 코드에서 발생한 에러)
//     // try/catch에서 처리가능
//     // console.log(x)
    
//     // parse-time error
//     // 자바스크립트엔진이 코드를 읽다가 발생한 에러
//     // try/catch 에서 처리 않됨 
//     // console.log(x

// } catch(error) {
//     console.error(error)
// }

// ES6
// 2015년 추가된 문법
// 변수 let, const
// 함수: Arrow function
// for/of
// Class(자바스크립트는 prototype기반 언어이다)
// Promise(비동기 작업)
// Destructiong/ spread operator(Object, Array의 표시 방법)
// Ternary(삼항연산자)
// Array.from(), Array.keys(), Array.find(), Boject.entries()

// #변수 : var, let, const
// 1. 기본적인 차이점
// 2. 변수의 범위에서의 차이점

// var cat;  // declare(선언)
// console.log(cat)  // undefined

// var cat='Kitty';  // declare, assignment(할당)=define
// = : 할당연산자
// cat=kitty : literal 방식 (value만 할당)
// var cat= new String('kitty')   // String의 클래스의 instance생성
// instance의 커스텀 method
// instance의 커스텀 method를 추가할 수 있다
// cat.sound=function(){
//     return '야옹'
// }
// instance를 만들고 property를 추가할 수 있다
// cat.home = null;
// console.log(typeof cat)  //object
// console.log(cat instanceof String)
// console.log(cat.toUpperCase())
// String.prototype을 통해 String이 사용가능한 method를 볼수 있다.

// var cat = 'kitty'
// var cat = 'Alfredo'  //redeclare, define

// console.log(cat)

// let cat; //declare
// console.log(cat)  //undefined

// let cat; //declare
// cat = 'kitty'; //define
// console.log(cat)

// let cat='kitty';
// let cat='alfredo';  //재선언 안됨
// console.log(cat);

// const cat; //declare, define(intializer : 초기화를 반드시 해야함)

// //초기화 : 선언과 값을 할당하는 것
// console.log(cat)

// const cat = 'kitty';  //const초기화
// cat = 'alfredo';  //const에는 할당 불가
// console.log(cat)

// const cat = "Kitty";  // 선언
// const cat = "Alfredo"; // 재선언 불가

// Uncaught SyntaxError가 발생한 이유와 에러를 catch하는 방법
// try {
//     const cat; //문법적 오류는 try/catch로 못잡음
//     console.log(cat)
// } catch (error) {
//     console.error(cat)
// }

// 변수의 범위 (scope)
// var, let, const
// global scope(전역범위)
// local scope(지역범위)
// block scope(블록범위)

// let cat='Kitty'  //Global(전역변수)
// // 어디든 접근 가능
// // 함수 내부, block 등
// function f() {
//     console.log(cat);
// }
// f()

// function f() {
//     // 함수의 내부는 local scope(지역범위)
//     let cat='Kitty' //local variable(지역변수)
// }
// console.log(cat); //error(not define, 정의되지 않음)
// // 함수의 외부에서 cat(지역변수)에 접근 할 수 없음
// f()

// let cat = 'kitty'  //전역변수
// function f() {
//     cat = 'alfredo'  //지역변수
//     console.log(cat)
// }
// f()

// let cat='kitty'
// function f() {
//     let cat = 'alfredo'
//     // 변수의 비교는 지역범위 안에서만 한다.
//     console.log(cat)
// }
// f()

// const cat = 'Kitty';
// function f() {
//     console.log(cat)
// }
// f()

// const cat = 'Kitty'
// function f(){
//     const cat = 'alfredo'
//     console.log(cat)
// }
// f()

// function f() {
//     // 지역변수
//     // 지역변수는 지역범위(함수범위)를 갖는다
//     const cat = 'kitty'
// }
// f()
// console.log(cat)

// Block (블록 범위)
// {} (brace, 중괄호)
// {
//     var cat = 'kitty'  // var은 블록 외부에서 접근 가능
// }
// console.log(cat)

// {
//     let cat = 'kitty'  // let은 블록 내부에서만 사용 가능
// }
// console.log(cat)

// {
//     const cat = 'kitty'  // const은 블록 내부에서만 사용 가능
// }
// console.log(cat)









// --------------------------------------------

// ES6 Promise
// 정의 : Promise 객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그결과 값을 나타낸다
// Promise - 비동기 작업의 가독성을 향상시키기 위해 나온 문법
// Async/Await Promise- Promise의 문법을 더 쉽게 표현할 수 있다

// Promise객체는 두개의 property: state/result
// Promise가 Pending일때, result: undefined
// Promise가 fullfilled일때, result: undefined
// Promise가 reject일때, result: undefined

// Promise클래스의 인스턴스 생성
// let promise = new Promise(function (resolve,reject) {
//     // 대기중일때
//     // pending
//     // 성공했을때
//     // resolve() - fullfilled
//     // 실패했을때
//     // reject() - rejected
// })

// promise.then(
//     // 성공했을 때
//     function (value) {/*성공했을때 코드*/},
//     function (error) {/*실패했을때 코드*/}
// )

// 데이터를 가져오는 함수
// 비동기 함수
// function fetchData(callback) {
//     // setTimeout의 콜백은 동기적으로 작동한다
//     setTimeout(() => {
//         callback({message: '데이터 가져오기 성공'})
//     },0)
// }

// // 데이터를 출력하는 함수 
// function displayData(data) {
//     console.log(data)
// }
// fetchData(displayData)
// console.log(2)
// console.log(3)

// setTimeout(callback,ms) : ms후에 callback실행
// setTimeout(()=> {
//     console.log(1)
// },1000)
// console.log(2)
// console.log(3)

// function displayData(data) {
//     console.log(data)
// }
// let promise = new Promise(function (res,rej){
//     let x=0;
//     if (x===0) {
//         // resolve
//         // fullfilled
//         res({message:'ok'})
//     }else {
//         // reject
//         // rejected
//         rej({message:'error'})
//     }
// })

// // promise.then (성공했을 때 실행되는 콜백, 실패했을 때 실행되는 콜백)
// promise.then(function (value) {
//     displayData(value)
// },function(error) {
//     displayData(error)
// })


// function displayData(data) {
//     console.log(data)
// }

// // 거부되었을 때 생략가능 
// let promise=new Promise(res => {
//     // 성공했을때
//     res({message:'ok'})
// })
// // console.log(promise)

// // 콜백을 사용한 비동기 데이터처리
// // promise(displayData)

// // Promise를 사용한 비동기 데이터 처리
// promise.then(displayData)

// function displayData(data) {
//     console.log(data)
// }
// function fetchData() {
//     return new Promise((res,rej)=>{
//         res({message:'ok'})
       
//     })
// }
// fetchData().then(displayData)

// Promise chain
// function first() {
//     return new Promise(res => {
//         console.log(1)
//         res()
//     })
// }
// function second() {
//     return new Promise(res=> {
//         console.log(2)
//         res()
//     })
// }
// function third() {
//     console.log(3)
// }
// // callback chain
// first(()=>second(third))

// // promise chain
// first().then(second).then(third)

// Async function
// async function fetchData() {
//     // promise를 return 한다
//     return {message:'ok'}
// }
// fetchData().then(value => console.log(value))

// async function f() {}
// // state : fullfilled
// // result : undefined
// console.log(f())

// function fetchData() {
//     return new Promise(res => {
//         res({message:'ok'})
//     })
// }
// async function f() {
//     // fetchData().then(value=>console.log(value))

//     // await
//     // async 함수 안에서만 사용할 수 있다
//     // promise가 결과값을 return할 때까지 async함수를 중지한다
//     // 가독성이 향상시킨다
//     let r = await fetchData();
//     console.log(r)
//     console.log('데이터 가져오기 및 출력 완료')
// }
// f()

// function first() {
//     return new Promise(res => {
//         res(1)
//     })
// }
// function second() {
//     return new Promise(res=> {
//         res(2)
//     })
// }
// function third() {
//     return new Promise(res=> {
//         res(3)
//     })
// }
// f()
// async function f() {
//     let r1=await first()
//     console.log(r1) 
//     let r2=await first().then(second)
//     console.log(r2) 
//     let r3=await first().then(second).then(third)
//     console.log(r3) 
//     console.log('숫자 출력 완료')
// }


// Promise Chain의 Error handling
// function first() {
//     return new Promise(res => {
//         console.log(1)
//         res(1)
//     })
// }
// function second() {
//     return new Promise(res=> {
//         console.log(2)
//         res(2)
//     })
// }
// function third() {
//     return new Promise(res=> {
//         console.log(3)
//     })
// }

// // first().then(second).then(third)

// let promise=new Promise(res => {
//     console.log('..')
// })
// // constuctor 안에 method는 instance를 만들면 바로 실행
// setTimeout(()=> {
//     console.log('..')
// },0)

// class User {
//     constructor(username) {
//         this.username=username;
//         this.sound=function () {
//             console.log('..')
//         }
//     }
// }
// User.prototype.sound = function () {
//     console.log('당근')
// }
// let user = new User('changno')
// console.log(user)


// function first() {
//     return new Promise(res => {
//         console.log(1)
//         res(1)
//     })
// }
// function second() {
//     return new Promise((res,rej)=> {
//         console.log(2)
//         rej(2)
//     })
// }
// function third() {
//     return new Promise(res=> {
//         console.log(3)
//     })
// }
// first().then(second).then(third).catch(console.error(error))

// function fetchData() {
//     return new Promise((res,rej) => {
//         rej({message:'error'})
//     })
// }
// fetchData().then(value=>console.log(value)).catch(error => console.error(error))

// function first() {
//     return new Promise(res => {
//         res(1)
//     })
// }
// function second() {
//     return new Promise((res,rej) => {
//         res(2)
//     })
// }
// function third() {
//     return new Promise(res => {
//         res(3)
//     })
// }
// f()
// async function f() {
//     try {
//         console.log(await first())
//         console.log(await second())
//         console.log(await third())

//     } catch (error) {
//         // await Promise 에서 발생한 에러를 처리한다.
//         console.error(error)
//     }
// }