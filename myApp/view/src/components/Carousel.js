import { useState, useEffect, useRef } from "react";

export default function Carousel({ photos }) {
    const [index, setIndex] = useState(0);

    // element를 선택한다
    let items = [];
    let indicators = [];

    const prevBtn = useRef(null);
    const nextBtn = useRef(null);

    function setItem(item) {
        items = [...items, item];
    }
    function setIndicator(indicator) {
        indicators = [...indicators, indicator];
    }
    // index가 업데이트 될때마자 navigatoTo 실행
    useEffect(() => navigateTo(index));
    
    
    
    function navigateTo(index) {
        // 이미지 이동(첫번째 이미지의 margin left를 이용)
        items[0].style.marginLeft = `-${index * 100}%`;
        
        // Buttons
        nextBtn.current.classList.remove("hidden");
        prevBtn.current.classList.remove("hidden");
        
        if (index===0) {
            prevBtn.current.classList.add("hidden");
        }
        if (index===items.length-1) {
            nextBtn.current.classList.add("hidden");
        }
        
        // indicator
        indicators.map(indicator => {
            indicator.classList.add("bg-gray-200");
            indicator.classList.remove("bg-gray-400");
        })
        
        indicators[index].classList.remove("bg-gray-200");
        indicators[index].classList.add("bg-gray-400");
    }
    
   

    return (
        <div className="">
            {/* 이미지 버튼 */}
            <div className="relative">
                {/* 이미지 */}
                <div className="flex overflow-hidden h-96">
                    {photos.map((photo, index) => (
                        <div
                            key={index}
                            className="w-full shrink-0 transition-all"
                            ref={setItem}
                        >
                            <img
                                src={`http://localhost:3000/articles/${photo}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                {/* 이전 버튼 */}
                <div className="absolute top-0 left-0 bottom-0 flex items-center">
                    <button
                        className="p-1 bg-white"
                        onClick={() => setIndex(index - 1)}
                        ref={prevBtn}
                    >
                        &#10094;
                    </button>
                </div>
                {/* 다음 버튼 */}
                <div className="absolute top-0 right-0 bottom-0 flex items-center">
                    <button
                        className="p-1 bg-white"
                        onClick={() => setIndex(index + 1)}
                        ref={nextBtn}
                    >
                        &#10095;
                    </button>
                </div>
            </div>
            {/* Indicator */}
            <div className="flex justify-center gap-1 py-2">
                {photos.map((photo, index) => (
                    <span
                        key={index}
                        className="w-2 h-2 rounded-full"
                        ref={setIndicator}>

                    </span>
                ))}
            </div>

        </div>
    )
}