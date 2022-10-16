import { useEffect, useState, useRef } from "react";

export default function ModalWindow({ children }) {
  const [active, setActive] = useState(false);

  // 모달 Window
  const modal = (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-10">
      <div className="h-full flex justify-center items-center">
        <ul className="bg-white w-60 rounded">
          {children}
          <li>
            <button
              type="button"
              className="p-1 text-center w-full"
              onClick={() => setActive(false)}
            >
              Close
            </button>
          </li>
        </ul>
      </div>
    </div>
  )

  return (
    <>
      {/* active가 true일때 modal 창을 보이게 한다 */}
      {active && modal}

      {/* 더보기 버튼 */}
      <button
        className=""
        onClick={() => setActive(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={4}>
          <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" />
        </svg>
      </button>
    </>

  )
}