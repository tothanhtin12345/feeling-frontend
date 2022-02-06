import {useEffect} from 'react';

//một hook bắt sự kiện khi click bên ngoài một element có gắn ref
const useClickOutside = ({ref,handleOutside}) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      //nếu người dùng nhấn vào trang web mà ref không chứa sự kiện nhấn => không nhấn vào nó ==> nhấn bên ngoài
      if (ref.current && !ref.current.contains(event.target)) {
        
        handleOutside();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutside;
