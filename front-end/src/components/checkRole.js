
const checkRole = (curRole, role) => {

  curRole = sessionStorage.getItem('role');

  if(curRole == 'ROLE_ADMIN' || role && curRole == role) return true

  return false
};
  
  export default checkRole;