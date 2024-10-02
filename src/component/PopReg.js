import { useState } from "react";
import img from './mte2.PNG'
import upload from './upload.PNG'
import success from './success.PNG'
import del from './delete.PNG' 
import html2canvas from "html2canvas";
import React from "react";

let val='';

const PopReg = () => {

    const ToCaptureRef = React.useRef()
    
    const [file, setFile] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [check, setCheck] = useState({display : "none"});
    const [start, setStart] = useState({display: "block"})
    const [active, setActive] = useState(true)
    const [complete, setComplete] = useState({display:"none"});
    const [restart, setRestart] = useState({display:"none"});
    const [load, setLoad] = useState({display:"block"})



    function handleImage(e) {
         val = e.target.files[0];
        if (val) {
          const url = URL.createObjectURL(val);
        setFile(URL.createObjectURL(val));
        setImageUrl(url);
        setCheck({display: "block"});
        setStart({display: "none"})
        setActive(false)

        }
    }
    
    const download = () => {
        if (file) {
          var canvasPromise = html2canvas(ToCaptureRef.current, {
            useCORS: true
          });
          canvasPromise.then((canvas)=> {
            var dataURL = canvas.toDataURL("image/png");
            var img = new Image();
            img.src = dataURL;
            img.download = dataURL;
          const link = document.createElement('a');
          link.href = img.src;
          link.download = img.download;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
          setComplete({display:"block"})
          setCheck({display: "none"})
          setRestart({display:"block"})
          setLoad({display:"none"})
        }
      };
    
   const handleDelete = () => {
        setCheck({display: "none"})
        setStart({display: "block"})
        setFile();
        setActive(true)

    }
    
    const create = () => {
        setCheck({display: "none"})
        setStart({display: "block"})
        setFile();
        setActive(true)
        setLoad({display:"block"})
        setComplete({display:"none"})
        setRestart({display:"none"})

    }
    

    
    return ( 
        <div className="message">
                        

            <div > 
                <img src={img} alt="logo" className="logo"/>
            </div>
            <p>
                <h2 className="text">Create Personalized Flier</h2>
            </p>
            Upload your preferred image, downlaod and share with your loved ones.

               <div ref={ToCaptureRef} className="body">
                     <img src={file} className="file"/>
              </div>
              <div className="upload" style={start}>
                <span><img src={upload} alt=""/></span>
                <label htmlFor="image" className="choose" style={{marginTop:"-50px", marginLeft:""}}>Select File</label>
                    <input className="image" id="image" type="file" onChange={handleImage} style={{position:"absolute", opacity:"0", width:"20px", padding:"0px", marginLeft:"290px", marginTop:"-10px"}}/>
              </div>

              <div className="upload" style={check}>
                <span><img src={success} alt=""/></span>
                <h4>Upload Successfully <p>{val.name}|{val.size}</p></h4>
                <button className="del" onClick={handleDelete}><img src={del} /></button>
              </div>
            <div style={complete}>
              <h1>Download Complete! </h1>

                <p style={{marginTop:"-20px", color:"grey"}}>You can view the image in your gallery and don't forget to share. </p>
            </div>
        <div className="upload" style={load}>
        <input className="custom" type="submit" value="Download"   onClick={e => download(e)} disabled={active}/>
        </div>

        <div className="upload" style={restart}>
        <input className="custom" type="submit" value="Create Another"   onClick={create} />
        </div>
        </div>
     );



}

export default PopReg;