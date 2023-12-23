const putVenue = async (axiosInstanceToken, venue, onSuccess, onError) => {
    console.log("PUT VENUE:")
    console.log(venue.id)
    try {
        await axiosInstanceToken.put(`/admin/venues/${venue.id}`, venue);
        onSuccess('Lokalizacja treningowa zaktualizowana!');
    } catch (error) {
        if (!error?.response) {
            onError("Brak odpowiedzi z serwera");
        } else {
            onError("Aktualizacja lokalizacji treningowej zakończona niepowodzeniem");
        }
    }
};

export default putVenue;
