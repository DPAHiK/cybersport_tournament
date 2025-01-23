
export const checkRole = (role) => {

    const curRole = sessionStorage.getItem('role');
  
    if(curRole == 'ROLE_ADMIN' || role && curRole == role) return true
  
    return false
  };

    