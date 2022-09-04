// promise를 인자로 전달받는 함수
// React의 Suspense 컴포넌트와 함께 사용

export default function wrapPromise(promise) {
  let status = "pending"
  let result;
  let suspender = promise.then(
    (r) => {
      status = "sucess";
      result = r;
    },
    (e) => {
      status = "error"
      result = e;
    }
  )
  // read() 메서드를 가진 객체를 return한다
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status ==="error") {
        throw result;
      } else if (status === "sucess") {
        return result;
      }
    }
  }
}