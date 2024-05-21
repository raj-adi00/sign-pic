import { faL } from '@fortawesome/free-solid-svg-icons';
import { func } from 'prop-types';
import React, { useRef, useEffect, useState } from 'react'

function Picture() {
    const opencamera = useRef(null);
    const clickphoto = useRef(null);
    const canva = useRef(null);
    const vid = useRef(null);
    const closephoto = useRef(null);
    const [hasphoto, sethasphoto] = useState(false);
    const retakeref = useRef(null);
    const [contextref, setcontextref] = useState(null);
    const [STREAM, setSTREAM] = useState(null);
    const download = useRef(null)
    const [size, setsize] = useState(314);
    const sizechange = useRef(null);
    const [videoscreensize, setvideoscreensize] = useState(500);
    const vidsize = useRef(null);
    useEffect(() => {
     vid.current.style.width=`${videoscreensize}px`;
     vid.current.style.height=`${videoscreensize/2}px;`
    }, [videoscreensize])
    const getvideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1920, height: 1080
            }
        })
            .then(stream => {
                setSTREAM(stream)
                let video = vid.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.log(err);
            })
    }
    const takephoto = () => {
        const width = size;
        const height = size;
        let video = vid.current;
        let photo = canva.current;
        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        sethasphoto(true);
        setcontextref(ctx);
    }
    function recapture() {
        if (contextref === null)
            return;
        contextref.clearRect(0, 0, canva.current.width, canva.current.height);
        sethasphoto(false);
    }
    function closevideo() {
        recapture();
        let video = vid.current;
        video.src = ''
        if (STREAM != null) {
            STREAM.getTracks().map(function (val) {
                val.stop();
            });
        }
    }
    function downloadsignaturewithbg() {
        if (hasphoto == false)
            return;
        const d = download.current;
        contextref.globalCompositeOperation = 'destination-over';
        contextref.fillStyle = 'White';
        contextref.fillRect(0, 0, canva.current.width, canva.current.height);
        const url = canva.current.toDataURL("image/png");
        d.href = url
    }
    function changesize() {
        setsize(sizechange.current.value)
    }
    function changevideosize() {
        setvideoscreensize(vidsize.current.value)
    }
    let picdim = [];
    let viddim = [];
    for (let i = 300; i <= 500; i += 5) {
        picdim.push(i);
        viddim.push(i + 200);
    }
    return (
        <div>
            <div className=' my-2 mx-4 flex flex-wrap gap-3 justify-center items-center'>
                <button ref={opencamera} className=' bg-gray-300 py-1 px-3 border-black border-2 border-solid rounded-lg' onClick={getvideo}>Start camera</button>
                <button ref={clickphoto} className=' bg-gray-300 py-1 px-3 border-black border-2 border-solid rounded-lg' onClick={takephoto}>Click photo</button>
                <button ref={closephoto} className=' bg-gray-300 py-1 px-3 border-black border-2 border-solid rounded-lg' onClick={closevideo}>Close</button>
                <button ref={retakeref} className=' bg-gray-300 py-1 px-3 border-black border-2 border-solid rounded-lg' onClick={recapture}>Retake</button>
                <button className='rounded bg-gray-300  py-1' >
                    <a href="#" ref={download} onClick={downloadsignaturewithbg} className='text-black p-1 border-2 border-black border-solid rounded-lg' download="Your signature">Download Photo</a>
                </button>
                <div>
                    <select name="" id="" className=' border-black border-2 px-2 bg-gray-300' ref={sizechange} onChange={changesize}>
                        <option value="314" key={1}>Photo Size</option>
                        {
                            picdim && picdim.map((val) => { return <option value={val} key={val}>{val}</option> })
                        }
                    </select>
                </div>
                <div>
                    <select name="" id="" className=' border-black border-2 px-2 bg-gray-300' ref={vidsize} onChange={changevideosize}>
                        <option value="500" key={1}>Video size</option>
                        {
                            viddim && viddim.map((val) => { return <option value={val} key={val}>{val}</option> })
                        }
                    </select>
                </div>
            </div>
            <div className='mx-4 my-2 border-black gap-4 border-2 border-solid m-auto flex flex-wrap justify-around items-center'>
                <div className='border-2 border-black border-solid m-3 rounded-lg'>
                    <video ref={vid} src="" width={videoscreensize} className='videoplay'></video>
                </div>
                <div className={'border-2 border-black border-solid m-3 rounded-lg photoarea' + hasphoto ? 'hasPhoto' : ''}>
                    <canvas ref={canva} width={size} height={size} className='photoholder'></canvas>
                </div>
            </div>
        </div>
    )
}

export default Picture