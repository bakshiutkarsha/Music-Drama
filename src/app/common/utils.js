import Storage from './webStorage';

export default{
  isUserAdmin(){
    let userDetails = Storage.getCollection('USER_DETAILS');
    if(userDetails != null && userDetails.is_admin == 'true'){
      return true;
    } else {
      return false;
    }
  },

  sanitizeString(unsafe) {
      return unsafe
           .replace(/&<>"=\/'./g, "")
           .replace(/</g, "")
           .replace(/>/g, "")
           .replace(/"/g, "")
           .replace(/=/g, "")
           .replace(/\//ig,"")
           .replace(/'/g, "");
   }
}
