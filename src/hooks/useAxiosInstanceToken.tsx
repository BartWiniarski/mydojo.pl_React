import {axiosInstanceToken} from "../axios/axios.tsx";
import {useEffect} from "react";
import useRefreshToken from "./useRefreshToken.tsx";
import useAuth from "./useAuth.tsx";

const useAxiosInstanceToken = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {

        const requestIntercept = axiosInstanceToken.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosInstanceToken.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosInstanceToken(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstanceToken.interceptors.request.eject(requestIntercept);
            axiosInstanceToken.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosInstanceToken;
}

export default useAxiosInstanceToken;