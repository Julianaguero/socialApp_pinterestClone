import jwt_decoded from 'jwt-decode';
import { client } from '../client';


export const createOrGetUser = async(credentialResponse) => {

    const decoded = jwt_decoded(credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify(decoded))
    
    const { name, picture, sub } = decoded;
    
    const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
    }
    
    client.createIfNotExists(doc)
   
  
    // console.log(localStorage)
  }