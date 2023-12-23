const putUser = async (axiosInstanceToken, user, onSuccess, onError) => {

    try {
        await axiosInstanceToken.put(`/admin/users/${user.id}`, user);
        onSuccess('Aktualizacja profilu zakończona sukcesem!');
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else if (error.response?.status === 409) {
            onError('Użytkownik o podanym e-mail już istnieje!');
        } else {
            onError("Aktualizacja profilu zakończona niepowodzeniem")
        }
    }
};
export default putUser;
