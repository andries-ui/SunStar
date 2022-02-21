import axios from "axios";
import * as SecureStore from 'expo-secure-store';


    let token = await SecureStore.getItemAsync('token') || 'null';
    
    async function axiosConfige {
      return  ({baseURL: 'https://sunstarapi.herokuapp.com/' ,
headers:{
    Authorization: 'Beara '+token,
}})
    }
export default token