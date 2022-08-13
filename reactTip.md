1. Tag에 class를 주고 싶으면 html과 달리 className='클래스명'

2. 굳이 왜 html을 안쓰고 리엑트를 씀?
    - 데이터 바인딩 때문에
    - 기존 JS에서 HTML에 데이터 입력시 document.getElementByID().innerHTML의 문법을 사용하였지만, 리엑트에서는 변수선언 후 변수명을 입력하면 끝임
    # ex) <h4>{변수명,함수명 등}</h4>

3. JSX에 style속성을 집어 넣을 때 style = {object자료형으로 만든 스타일}
    - style도 변수로 만들어 삽입 가능
    - CSS에서 -은 react에서는 (-)뺄셈으로 인식하여 이 경우 붙여써주고 뒷 단어의 경우 첫 스펠링은 대문자로 써주어야 한다!!
    # ex) style = { {color = "blue", fontSize: "20px"} }

4. react의 데이터 보관법
    - 변수에 넣는다
    - state에 넣는다
        state란? 
        (1) 변수 대신 쓰는 데이터 저장공간
        (2) useState()를 이용해 만들어야 함
      # (3) 정해진 형식이 있음.
            ex) 제일 위 
                import React, {useState} from 'react';
                변수 선언 할 곳에
                let [글제목, 글제목변경] = useState ('남자코트추천'); 
        (4) 문자, 숫자, array, object 다 저장 가능!!
        (5) 변수 대신 state를 쓰는 이유 : 
            웹이 App처럼 동작하게 만들고 싶어서
            그리고 데이터가 바뀔 경우 HTML은 전체 새로고침이 되지만, 
            state로 만들어 변경되는 경우 새로고침 없이 스무스하게 바뀐다
            but, 변경이 없는 것들은 변수 또는 하드코딩으로 작성해도 된다.
            주로 변경이 잦은 변수들을 state로 쓴다 
        (6) state는 변경 방법이 따로 있다
         # ex) <spun onClick={()=>{따봉변경(따봉+1)}}>👍</spun>{따봉}</h3>
            변경 시, state의 array 전체가 변경되어야함 
         # ex) <button onClick={()=>{글제목변경(['여자 코트 추천', '송도 맛집', '남자 신발 추천', '인천 데이트코스 추천'])}}>변경</button>

        (7) 그러나 위 수정법보단 수정된 새로운 [데이터]를 만든다.
            하지만 state를 deep copy해서 수정해야된다.
        # 순서 (중요 꼭 외워야 함)
            1. 기존 state의 카피본 만든다
            2. 카피본에 수정사항 반영
            3. 변경함수()에 집어넣기

            이유 : 리엑트의 대원칙 immutable data
                모든 state데이터는 직접 수정이 되면 안된다는 규칙이 있음
                state는 직접 건들지 말자!!
            ex)  let [글제목, 글제목변경] = useState(['남자 코트 추천', '송도 맛집', '남자 신발 추천', '인천 데이트코스 추천']);
        
            function 제목변경() {
            var newArray = [...글제목];
            newArray[0] = '여자 코트 추천';
            글제목변경(newArray); }

5. 터미널창에 노란색 글씨는 문법상의 오류는 아니지만 react자체에서 잘못된 습관을 잡아주는 경고 문구이다.
이러한 경고 문구를 없애주고 싶으면 제일 위에
# /* eslint-disable */
를 입력해주면 완료

6. tag의 어떤 기능을 실행 할때
    # 함수를 이미 선언 한 경우
    - onClick={클릭시 실행할 함수}
    # 함수를 선언하지 않은 경우
    - onClick={()=>{실행할 내용}} 

7. return 안에는 처음 시작하는 태그와 끝나는 태그가 같아야함
    ex) return(
        <div>

        </div>
    )

8. react에서는 HTML을 한단어로 중여서 쓸수 있는 방법이 있다.
# Component 문법
    (1) 함수 만들고 이름(이름은 항상 대문자로 시작) 짓고
    (2) 축약을 원하는 HTML에 넣고
    (3) 원하는 곳에서 <함수명/>
    * 주의점 : return()안에 있는건 하나의 태그로 묶어야함
              만약, return()내부에 의미없는 div를 쓰기 싫으면 <></>(프레그먼트)를 쓸수 있음
    
    * Component의 좋은점
        - 관리가 쉬워진다.

    * Component로 만들면 좋은 것들
        - 반복출현하는 HTML 덩어리들
        - 자주 변경되는 HTML UI들
        - 다른 페이지 만들 때도 컴포넌트로 만듦
    
    * Component의 단점
        - state 쓸때 복잡해짐
        - 상위 Component에서 만든 state 쓰려면 props 문법이용해야 함