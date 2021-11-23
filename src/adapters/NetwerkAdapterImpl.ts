import axios from "axios";
import NetwerkAdapter from "./NetwerkAdapter";

class NetwerkAdapterImpl implements NetwerkAdapter {
    private url: String = "http://localhost:8080";
    private stripSlash = (path: String) => path.charAt(0) == "/" ? path.slice(1) : path;
    private callAxios = (axios: (url: string, data?: any | undefined) => Promise<any>, path: String, body: any): Promise<any> => axios(`${this.url}/${this.stripSlash(path)}`, body);

    public post   = (path: String, body?: any | undefined): Promise<any> => this.callAxios(axios.post   , path, body);
    public get    = (path: String, body?: any | undefined): Promise<any> => this.callAxios(axios.get    , path, body);
    public put    = (path: String, body?: any | undefined): Promise<any> => this.callAxios(axios.put    , path, body);
    public delete = (path: String, body?: any | undefined): Promise<any> => this.callAxios(axios.delete , path, body);
}

export default NetwerkAdapterImpl;