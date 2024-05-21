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
    const [STREAM,setSTREAM]=useState(null);

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
        const width = 314;
        const height = 314;
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
        if(contextref===null)
            return;
        contextref.clearRect(0, 0, canva.current.width, canva.current.height);
        sethasphoto(false);
    }
    function closevideo() {
        recapture();
        let video = vid.current;
        video.src=''
        if (STREAM!= null) {
            STREAM.getTracks().map(function (val) {
            val.stop();
            });
            }    
    }
    return (
        <div>
            <div className=' my-2 mx-4 flex flex-wrap gap-3 justify-center items-center'>
                <button ref={opencamera} className=' bg-gray-300 py-1 px-3 border-black border-2 border-solid rounded-lg' onClick={getvideo}>Start camera</button>
                <button ref={clickphoto} className=' bg-gray-300 py-1 px-3 border-black border-2 border-solid rounded-lg' onClick={takephoto}>Click photo</button>
                <button ref={closephoto} className=' bg-gray-300 py-1 px-3 border-black border-2 border-solid rounded-lg' onClick={closevideo}>Close</button>
                <button ref={retakeref} className=' bg-gray-300 py-1 px-3 border-black border-2 border-solid rounded-lg' onClick={recapture}>Retake</button>
            </div>
            <div className='mx-4 my-2 border-black gap-4 border-2 border-solid m-auto flex flex-wrap justify-around items-center'>
                <div className='border-2 border-black border-solid m-3 rounded-lg'>
                    <video ref={vid} src="" width={500} className='videoplay'></video>
                </div>
                <div className={'border-2 border-black border-solid m-3 rounded-lg photoarea' + hasphoto ? 'hasPhoto' : ''}>
                    <canvas ref={canva} width={314} height={314} className='photoholder'></canvas>
                </div>
            </div>
        </div>
    )
}

export default Picture