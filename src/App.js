import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { FadeLoader } from 'react-spinners';

function App() {
  const [asciiImage, setAsciiImage] = useState("");
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState("");
  const [text,setText] = useState("");
  const [isloading, setisLoading] = useState(false);

  const [option,setoptions ] = useState({
    color: false,
    fit:'box',
    width:100,
    height:80
  });
  const DivRef = useRef();
  const handleChange = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0]);
    
  };
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
  const [bgcolor, setbg] = useState("");

  const fetchAsciiImage = async () => {
    try {
      console.log(image);
      console.log(option);
      const formData = new FormData();
      formData.append('uploadFile', image);
      formData.append('options', JSON.stringify(option)); // Append options as a JSON string
      console.log(formData.get('uploadFile'))
      const res = await axios("http://localhost:8000/AcscifywithoutColor",{
        method:'post',
        data:formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.html) {
        console.log(res.data.text)
        setText(res.data.text);
        setbg('white');
       setAsciiImage(res.data.html);
       return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchAsciiColorImage = async () => {
    try {
      console.log(image);
      console.log(option);
      const formData = new FormData();
      formData.append('uploadFile', image);
      formData.append('options', JSON.stringify(option)); // Append options as a JSON string
      console.log(formData.get('uploadFile'))
      const res = await axios("http://localhost:8000/AcscifywithColor",{
        method:'post',
        data:formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data) {
        setbg("black");
       setAsciiImage(res.data.html);
       return;
      }
    } catch (error) {
      console.error(error);
    }
  };

 
  


 

  const handleColorClick = () => {
    setoptions((prev)=>({...prev,color:true}))
    fetchAsciiColorImage();
    
  };
  const handleClick = () => {
    setoptions((prev)=>({...prev,color:false,fit:'height',height:100}));
    fetchAsciiImage();
    
  };
  useEffect(()=>{
  console.log(bgcolor)
  },[bgcolor])
  return (
    <div style={{height:'100vh',width:'100vw'}}>
      <h2>Image to ASCII Generator</h2>
      <input type="file" onChange={handleChange} style={{ marginBottom: 10 }} />
     <div style={{display:'flex',flexDirection:"column",alignItems:'flex-start'}}>
     Convert with Color:<button onClick={handleColorClick}>Convert</button>
     Convert without Color<button onClick={handleClick}>Convert</button>
      </div>
      <FadeLoader loading={isloading} />
      {/* {text && <button 
  onClick={() =>  navigator.clipboard.writeText(text)}
>
  Copy
</button>} */}
    { asciiImage && <button onClick={handleCaptureClick}>Download</button>}
      <div  style={{display:'flex'}}>
        <pre  ref={DivRef} style={{ backgroundColor:'black',color:'white',whiteSpace: 'pre',fontSize:8 }} dangerouslySetInnerHTML={{ __html: asciiImage }} />
      
       
      </div>
    </div>
  );
}

export default App;
