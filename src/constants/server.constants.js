//BASE
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE = `https://kepler.space/frontend2019/${API_KEY}/`;

//FUNCTION URLS
const API = {
    //GET
    ALL_SONGS: `${BASE}listSongs`,
    //POST
    CREATE_USER: `${BASE}createUser?`,
    //GET
    GET_SONG: `${BASE}getSong?`
};

export default API;
