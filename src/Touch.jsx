import React, { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faRotateLeft ,faRotateRight } from '@fortawesome/free-solid-svg-icons'

let startpositionx = [], startpositiony = [], endpositionx = [], endpositiony = [];
let singlestroke = [];
let remvedstroke=[];
function Touch() {
    const canva = useRef(null);
    const contextref = useRef(null);
    const download=useRef(null);
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
        // context.globalCompositeOperation='destination-over';
        // context.fillStyle='White';
        // context.fillRect(0,0,canvas.width,canvas.height);
    }, [])
    function startsign({ nativeEvent }) {
        remvedstroke=[];
        const { offsetX, offsetY } = nativeEvent
        contextref.current.beginPath();
        contextref.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        startpositionx.push(offsetX)
        startpositiony.push(offsetY)
    }
    function signing({ nativeEvent }) {
        if (!isDrawing)
            return
        const { offsetX, offsetY } = nativeEvent
        contextref.current.lineTo(offsetX, offsetY);
        contextref.current.stroke();
        startpositionx.push(offsetX)
        startpositiony.push(offsetY)
        endpositionx.push(offsetX)
        endpositiony.push(offsetY)
    }
    function endsign({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(false);
        contextref.current.closePath();
        endpositionx.push(offsetX);
        endpositiony.push(offsetY);
        singlestroke.push({
            startx: startpositionx,
            starty: startpositiony,
            endx: endpositionx,
            endy: endpositiony
        })
        startpositionx = [];
        startpositiony = [];
        endpositionx = [];
        endpositiony = [];
        // console.log(singlestroke)
    }
    function clear() {
        singlestroke=[];
        remvedstroke=[];
        contextref.current.clearRect(0, 0, canva.current.width, canva.current.height)
    }
    function undo() {
        if(singlestroke.length==0)
            return;
        remvedstroke.push(singlestroke[singlestroke.length-1]);
        singlestroke.pop();
        contextref.current.clearRect(0, 0, canva.current.width, canva.current.height)
        console.log(singlestroke)
       let v=singlestroke.length-1;
            while(singlestroke[v].startx.length==1)
                {
                    singlestroke.pop();
                    v--;
                }
        for (let i = 0; i < singlestroke.length; i++) {
            const sx = singlestroke[i].startx;
            const sy = singlestroke[i].starty;
            const ex = singlestroke[i].endx;
            const ey = singlestroke[i].endy;
            contextref.current.beginPath();
            contextref.current.moveTo(sx[0], sy[0]);
            for (let j = 1; j < sx.length; j++) {
                contextref.current.lineTo(ex[j], ey[j]);
                contextref.current.stroke();
            }

            contextref.current.closePath();
        }
    }
    function redo(){
        if(remvedstroke.length==0)
            return;
        let arr=remvedstroke[remvedstroke.length-1];
        singlestroke.push(arr);
        let a=arr.startx;
        let b=arr.starty;
        let c=arr.endx;
        let d=arr.endy;
        contextref.current.beginPath();
        contextref.current.moveTo(a[0],b[0]);
        for(let i=1;i<c.length;i++)
            {
                contextref.current.lineTo(c[i],d[i]);
                contextref.current.stroke();
            }
            contextref.current.closePath();
        remvedstroke.pop();
        
    }
    function downloadsignaturewithbg()
    {
        const d=download.current;
        contextref.current.globalCompositeOperation='destination-over';
        contextref.current.fillStyle='White';
        contextref.current.fillRect(0,0,canva.current.width,canva.current.height);
        const url=canva.current.toDataURL("image/png");
        // console.log(url);
        // console.log(d);
        d.href=url
    }

    return (
        <div className='w-screen overflow-hidden'>
            <div className='flex justify-center mt-2 mx-5 gap-2 flex-wrap'>
                <button className='rounded bg-gray-300 w-10 py-1' onClick={clear}>
                    <FontAwesomeIcon icon={faTrash} className='delete' size='lg' />
                </button>
                <button className='rounded bg-gray-300 w-10 py-1' onClick={undo}>
                    <FontAwesomeIcon icon={faRotateLeft} className='delete' size='lg' />
                </button>
                <button className='rounded bg-gray-300 w-10 py-1' onClick={redo}>
                <FontAwesomeIcon icon={faRotateRight} className='delete' size='lg' />
                </button>
                <button className='rounded bg-gray-300  py-1'>
                     <a href="#" ref={download} onClick={downloadsignaturewithbg} className='text-black p-1 border-2 border-black border-solid rounded-lg' download="Your signature">Download sign</a>
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