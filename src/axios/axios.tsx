import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: "http://localhost:8080/api/v1"
});
export default axiosInstance;