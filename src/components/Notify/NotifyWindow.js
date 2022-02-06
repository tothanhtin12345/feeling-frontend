import Window from "../UI/Window";
import NotifyWindowList from "./NotifyWindowList";

//cửa sổ hiển thị thông báo
const NotifyWindow = ({id, className, expand = true, }) => {
  return (
    <Window
      className={className}
      id={id}
      title="Thông báo"
      path="/notifications"
      expand={expand}
      content={<NotifyWindowList scrollId={id}/>}
    />
  );
};

export default NotifyWindow;
