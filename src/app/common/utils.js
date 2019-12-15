import Storage from './webStorage';

export default{
  isUserAdmin(){
    if(Storage.getCollection('USER_DETAILS').is_admin == 'true'){
      return true;
    } else {
      return false;
    }
  }
}
