import { useState, useEffect, useRef } from "react";

export default function Carousel({photos}) {
    console.log(photos);

    return (
        photos.map((photo, index) => (
            <img 
                src={`http://localhost:3000/articles/${photo}`}
                className=""
                width="200"
            />
        ))
    )
}