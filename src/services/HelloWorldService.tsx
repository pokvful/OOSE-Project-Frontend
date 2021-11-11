import axios from 'axios';

const loadHelloWorldMessage = async () : Promise<string> => {
    return axios
    .get("http://localhost:8080/helloworld")
    .then(res => res.data)
    .then(json => json.message);
}

export {loadHelloWorldMessage};
