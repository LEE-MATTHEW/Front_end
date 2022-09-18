import React from "react";

// 에러 경계
// 하위 컴포넌트의 에러를 처리한다
// 에러 경계가 포착하지 않는 에러: 
// => 이벤트 핸들러, 비동기코드, 에러 경계 자체에서 발생하는 에러
export default class ErrorBoundary extends React.Component {
  // state
  state = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error) {
    // hasError를 true로 업데이트
    return {
      hasError: true,
      error
    }
  }

  // DOM을 return한다
  render() {
    // 에러가 있는 경우 fallback UI를 렌더링한다
    if (this.state.hasError) {
      return <h1>Error!</h1>
    }

    return this.props.children;
  }
}