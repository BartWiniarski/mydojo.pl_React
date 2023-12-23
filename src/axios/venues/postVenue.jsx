const postVenue = async (axiosInstanceToken, venue, onSuccess, onError) => {

    try {
        await axiosInstanceToken.post("/admin/venues", venue);
        onSuccess('Nowa lokalizacja treningowa dodana!');
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Dodwanie nowej lokalizacji treningowej zakończone niepowodzeniem");
        }
    }
};

export default postVenue;
