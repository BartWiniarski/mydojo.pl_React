const postUser = async (axiosInstanceToken, users, onSuccess, onError) => {

    try {
        await axiosInstanceToken.post("/admin/users", users);
        onSuccess('Nowy użytkownik dodany!');
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Dodwanie nowego użytkownika zakończone niepowodzeniem");
        }
    }
};

export default postUser;
