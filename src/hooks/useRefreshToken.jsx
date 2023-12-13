import {axiosInstance} from "../axios/axios.jsx";
import useAuth from "./useAuth.jsx";


const useRefreshToken = () => {
    const {setAuth, auth} = useAuth();

    //TODO: Zmienić na login do odświeżenia tokenu jak kiedyś będzie w API
    const AUTHENTICATE_URL = "/auth/authenticate";

    //TODO: nie przechowywać hasła w auth i nie używać do odświeżenia tokena
    const credentials = auth ? {
        email: auth.email,
        password: auth.password,
    }: {};

    //TODO: dodać handling w przypadku wygaśnięcia odświeżonego tokena 


    const refresh = async () => {
        try{
            const response = await axiosInstance.post(AUTHENTICATE_URL, credentials,);
            setAuth(prev => {
                return {...prev, token: response.data.token}
            });
            return response.data.token;
        } catch (error) {
            console.log(error)
        }
    }
    return refresh;
};

export default useRefreshToken;