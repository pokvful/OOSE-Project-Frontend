import NetworkAdapter from "./NetworkAdapter";
import AxiosNetwerkAdapter from "./AxiosNetworkAdapter";

const networkAdapter: NetworkAdapter = new AxiosNetwerkAdapter();

export default networkAdapter;