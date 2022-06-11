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

var num = 2022

console.log(num)
console.log(num.toString()) //숫자를 문자로 바꿀때
console.log(Math.round(2.6)) //Math.round() 반올림
console.log(Math.ceil(2.4)) //Math.round() 올림
console.log(Math.floor(2.7)) //Math.round() 내림
console.log(num)