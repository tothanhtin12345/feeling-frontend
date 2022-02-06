import { Spin } from "antd";
//một spin nằm ở giữa (không có position)
const InsideCenterSpin = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Spin spinning={true} />
    </div>
  );
};
export default InsideCenterSpin;
