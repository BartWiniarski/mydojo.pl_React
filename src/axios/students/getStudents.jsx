const getStudents = async (axiosInstanceToken, setAvailableStudents) => {

    try {
        const response =
            await axiosInstanceToken.get("/admin/students");
        setAvailableStudents(response.data);
    } catch (error) {
        console.log(error);
    }
};

export default getStudents;
