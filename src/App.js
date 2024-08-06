
import { useRef, useState } from 'react';import html2canvas from 'html2canvas';
import { FadeLoader } from 'react-spinners';
import Convert from 'image-convert-ascii';


function App() {
  const [imageURL, setImageURL] = useState("");
  const [isloading, setisLoading] = useState(false);
  const [sizeX, setsizeX] = useState(100);
  const [sizeY, setsizeY] = useState(100);
  // const [sizeY, setsizeY] = useState(100);
  const DivRef = useRef();
  const [bgcolor, setbg] = useState("white");
  const [fgcolor, setfg] = useState("");
  const [showButton,setshowButton] = useState(false);
  const handleChange = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };
  const handleInvert = function(val){
    console.log(val);
    if(val === "white"){
     setbg("white")
     setfg("black")
    }else{
      setbg("black")
      setfg("white")
    }
  }
  const handleCaptureClick = async () => {
    setisLoading(true);
    if (DivRef.current) {
     
 
      const canvas = await html2canvas(DivRef.current, {
        backgroundColor: null 
      });
  
      const dataURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'Image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setisLoading(false);
  
     

    }
  };
  const handle = () => {
  new Convert('img','pre',sizeX,sizeY);
  setshowButton(true);
  };

 

  // useEffect(()=>{
  // console.log(bgcolor)
  // },[bgcolor])
  return (
    <div style={{height:'100vh',width:'100vw'}}>
      <h2>Image to ASCII Generator</h2>
      <input type="file" onChange={handleChange} style={{ marginBottom: 10 }} />
      Width:<input defaultValue={sizeX} type='number' onChange={(e)=>{setsizeX(Number(e.target.value))}}></input>
      Height<input defaultValue={sizeY} type='number' onChange={(e)=>{setsizeY(Number(e.target.value))}}></input>
      Invert Colors : <select defaultValue={bgcolor} onChange={(e)=>handleInvert(e.target.value)}>
        <option value='black'>Black</option>
        <option value='white'>White</option>
      </select>
     <div style={{display:'flex',flexDirection:"column",alignItems:'flex-start'}}>
     <button onClick={()=>handle()}>Convert</button>
      </div>
      <FadeLoader loading={isloading} />
      {/* {text && <button 
  onClick={() =>  navigator.clipboard.writeText(text)}
>
  Copy
</button>} */}
    {showButton && <button onClick={handleCaptureClick}>Download Image </button>}
      <div  style={{display:'flex'}}>
      <pre ref={DivRef} id='pre' style={{backgroundColor:bgcolor,color:fgcolor}}></pre>
      </div>
     <img  id='img' alt=""src={imageURL}></img>
    </div>
  );
}

export default App;
