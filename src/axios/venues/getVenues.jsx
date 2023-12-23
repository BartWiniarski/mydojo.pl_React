const getVenues = async (axiosInstanceToken, setVenues) => {

    try {
        const response =
            await axiosInstanceToken.get("/admin/venues");
        setVenues(response.data);
    } catch (error) {
        console.log(error);
    }
};

export default getVenues;
