//lấy path theo vị trí range (ví dụ từ index 0 đến index 2)
export const getPathNameWithRange = ({ pathname, from, to }) => {
  //xử lý pathName
  let pathNameArray = pathname.split("/");
  //to+1 để tăng vị trí lấy - vì slice sẽ ngưng trước khi đến vị trí end
  pathNameArray = pathNameArray.slice(from,to+1);
  let result="";
  pathNameArray.forEach((value)=>{
    if(value!==""){
      result+=("/"+value)
    }
  })
  return result;
  
};

//lấy currentPath (một phần của pathname) dựa trên pathname và vị trí muốn lấy
export const getPathByIndex = (index) => {
  const pathname = window.location.pathname;
  const pathNameArr = pathname.split("/");
  if(index >= pathNameArr.length) {
    return "over_length";
  }
  return pathNameArr[index];
}

//lấy params trên pathName theo vị trí chỉ định
export const getParamsOnPathName = (index, pathname) => {

 
  let pathNameArrs=pathname.split("/");
  return pathNameArrs[index];
}