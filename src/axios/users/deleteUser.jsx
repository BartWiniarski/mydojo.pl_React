const deleteUser = async (axiosInstanceToken, user, onSuccess, onError) => {
    try {
        await axiosInstanceToken.delete(`/admin/users/${user.id}`);
        onSuccess("Użytkownik usunięty");
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Usunięcie użytkownika zakończone niepowodzeniem");
        }
    }
};

export default deleteUser;
