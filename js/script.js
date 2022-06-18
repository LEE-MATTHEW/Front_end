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
function fetchData(callback) {  
    setTimeout(function() {
        var user= {username:'changno'}
        callback(user)
    },0)
}
// 자료를 보여주는 함수
function displayData(data) {
    console.log(data)
}

console.log(1)
// 이미지를 가져와서 보여주는 작업은 동기적으로 작동해야 한다.
fetchData(displayData)
console.log(3)
console.log(4)