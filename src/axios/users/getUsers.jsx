const getUsers = async (axiosInstanceToken, setUsers) => {

    try {
        const response =
            await axiosInstanceToken.get("/admin/users");
        setUsers(response.data);
    } catch (error) {
        console.log(error);
    }
};

export default getUsers;
