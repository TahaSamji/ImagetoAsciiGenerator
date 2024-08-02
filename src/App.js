import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [asciiImage, setAsciiImage] = useState("");

  const fetchAsciiImage = async () => {
    try {
      const res = await axios.get("http://localhost:8000");
      if (res.data) {
        console.log(res.data);
        setAsciiImage(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAsciiImage();
  }, []);

  return (
    <div >
      <div style={{backgroundColor:"bisque"}}>
        <pre style={{ whiteSpace: 'pre', color: 'black' }} dangerouslySetInnerHTML={{ __html: asciiImage }} />
      </div>
    </div>
  );
}

export default App;
