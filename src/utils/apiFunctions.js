//LIBRARIES
import axios from 'axios';
import convert from 'xml-js';

//CONSTANTS
import API from '../constants/server.constants';

/**
 * Get all the songs. If parameter is specified, get songs for that specific user.
 * @param { email } email of the user
 * @param { pass } password of the user
 * @return { Object } all the songs
 */
export const getAllSongs = async (email, pass) => {
    try {
      const allSongsXML = (email && pass) ? await axios.get(`${API.ALL_SONGS}?email=${email}&password=${pass}`) : await axios.get(API.ALL_SONGS);
      const allSongs = await convertToJson(allSongsXML.data);
      return allSongs;
    } catch (err) {
      return err;
    }
};

/**
 * Create a new user.
 * @param { name } name of the user
 * @param { email } email of the user
 * @param { pass } password of the user
 * @return { Object } response from creating a user
 */
export const createUser = async (name, email, pass) => {
    try {
      const createUserUrl = `${API.CREATE_USER}name=${name}&email=${email}&password=${pass}`;
      const userInfo = { name, email, pass };
      const createUser = await axios.post(createUserUrl, userInfo);
      const response = await convertToJson(createUser.data);
      return response;
    } catch (err) {
      return err;
    }
};

/**
 * Get all the songs. If parameter is specified, get songs for that specific user.
 * @param { string } email of the user
 * @param { string } password of the user
 * @param { string } songId of a specific song
 * @return { Object } data of the downloaded song
 */
export const getSong = async (email, pass, songId) => {
    try {
      const getSongUrl = `${API.GET_SONG}email=${email}&password=${pass}&songid=${songId}`;
      const userInfo = { email, pass, songId };
      const getSong = await axios.post(getSongUrl, userInfo);
      const response = await convertToJson(getSong.data);
      return response;
    } catch (err) {
      return err;
    }
};

/**
 * Convert xml to Json
 * @param { string } xml
 * @return { Object } JSON
 */
const convertToJson = (xml) => {
  return JSON.parse(convert.xml2json(xml, {compact: true, spaces: 2}));
}
