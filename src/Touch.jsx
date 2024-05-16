import React, { useContext, useEffect, useRef, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse } from '@awesome.me/kit-KIT_CODE/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

// const startpositionx = [], startpositiony = [], endpositionx = [], endpositiony = [];
function Touch() {
    const canva = useRef(null);
    const contextref = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    useEffect(() => {
        const canvas = canva.current;
        canvas.width = (window.innerWidth) * 2;
        canvas.height = (window.innerHeight);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${parseInt(window.innerHeight) / 2}px`;
        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextref.current = context;
    }, [])
    function startsign({ nativeEvent }) {
        // console.log(nativeEvent)
        const { offsetX, offsetY } = nativeEvent
        contextref.current.beginPath();
        contextref.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        // console.log(offsetX)
        // startpositionx.push(offsetX)
        // startpositiony.push(offsetY)
        // console.log(startpositionx)
    }
    function signing({ nativeEvent }) {
        if (!isDrawing)
            return
        const { offsetX, offsetY } = nativeEvent
        contextref.current.lineTo(offsetX, offsetY);
        contextref.current.stroke();
        // startpositionx.push(offsetX)
        // startpositiony.push(offsetY)
        // endpositionx.push(offsetX)
        // endpositiony.push(offsetY)
    }
    function endsign({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(false);
        contextref.current.closePath();
        // endpositionx.push(offsetX);
        // endpositiony.push(offsetY);
    }
    function clear() {
        contextref.current.clearRect(0, 0, canva.current.width, canva.current.height)
    }
    function undo(){
    //     startpositionx.pop();
    //     startpositiony.pop();
    //     endpositionx.pop();
    //     endpositiony.pop();
    //     clear();
    //     console.log(startpositionx);
    //     for(let i=0;i<startpositionx.length;i++)
    //         {
    //             contextref.current.beginPath();
    //             contextref.current.moveTo(startpositionx[i],startpositiony[i]);
    //             contextref.current.lineTo(endpositionx[i],endpositiony[i]);
    //             contextref.current.stroke();
    //             contextref.current.closePath();
    //         }
    }

    return (
        <div className='w-screen overflow-hidden'>
            <div className='flex justify-center mt-2 mx-5 gap-2'>
                <button className='rounded bg-gray-300 w-10 py-1' onClick={clear}>
                    <FontAwesomeIcon icon={faTrash} className='delete' size='lg' />
                </button>
                <button className='rounded bg-gray-300 w-10 py-1' onClick={undo}>
                    <FontAwesomeIcon icon={faRotateLeft} className='delete' size='lg' />
                </button>
            </div>
            <div className='border-2 border-solid border-black mx-4 my-2'>
                <canvas className=' m-auto'
                    ref={canva}
                    onMouseDown={startsign}
                    onMouseUp={endsign}
                    onMouseMove={signing}
                ></canvas >
            </div>
        </div>
    )
}

export default Touch