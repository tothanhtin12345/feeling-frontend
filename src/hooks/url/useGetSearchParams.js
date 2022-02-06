import { useLocation } from "react-router";

const useGetSearchParams = () => {
  const location = useLocation();
  const search = location.search;
  const searchParams = new URLSearchParams(search);
  let params = {};
  searchParams.forEach((value,key)=>{
    params[key] = value;
  })
  return params;
}
export default useGetSearchParams;