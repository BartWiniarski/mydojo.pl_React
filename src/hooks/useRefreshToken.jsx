import {axiosInstance} from "../axios/axios.jsx";
import useAuth from "./useAuth.jsx";


const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();

    const REFRESH_URL = "/auth/refresh";

    const refresh = async () => {
        try{
            const response = await axiosInstance.post(REFRESH_URL,
                {}, {
                headers: {
                    'Authorization': `Bearer ${auth.refreshToken}`
                }
            });
            setAuth(prev => {
                return {...prev, accessToken: response.data.accessToken}
            });
            return response.data.accessToken;
        } catch (error) {
            console.log(error)
        }
    }
    return refresh;
};

export default useRefreshToken;