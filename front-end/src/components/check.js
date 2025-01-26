
export const checkRole = (role) => {

    const curRole = sessionStorage.getItem('role');
  
    if(curRole == 'ROLE_ADMIN' || role && curRole == role) return true
  
    return false
  };

  export const formatDate = (date) => {
    const classDate = new Date(date)

    return `${classDate.getDate()}.${classDate.getMonth()+1 >= 10 ? classDate.getMonth()+1 : '0' + (classDate.getMonth() + 1)}.${classDate.getFullYear()}`
  }
    