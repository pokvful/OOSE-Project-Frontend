import { useEffect, useState } from 'react';
import './Home.css';
import {loadHelloWorldMessage} from '../../services/HelloWorldService'

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadHelloWorldMessage()
    .then(
      (result:string) => {
        setIsLoaded(true);
        setMessage(result);
      }
    )
  }, [])

  if(!isLoaded) {
    return (
      <div className="Home">
        <h1>Home</h1>
        <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <div className="Home">
        <h1>Home</h1>
        <p>{message}</p>
      </div>
    );
  }
}

export default Home;
