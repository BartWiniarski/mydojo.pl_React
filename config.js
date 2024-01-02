
const dev = {
    API_URL: "http://localhost:8080/v1"
};

const prod = {
    API_URL: "https://api.mydojo.pl/v1"
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
