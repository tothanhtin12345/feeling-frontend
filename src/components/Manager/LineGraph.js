import { Line } from "@ant-design/charts";
import styled from "styled-components";
import { Select, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
//code của mình
import { MediumTitleStyled } from "../Styled/Text";
import {
  getGraphLineData,
  getGraphLineLoading,
} from "../../store/modules/LineGraph/selectors";
import { fetchGraphLineSaga, reset } from "../../store/modules/LineGraph/slice";

const { Option } = Select;

const LineGraphStyled = styled.div`
  background-color: #ffffff;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 20px;
  .title {
    text-align: center;
  }

  .graph {
    margin-top: 10px;
  }
  .year-selection {
    width: 100%;
    text-align: end;
  }
`;

const LineGraph = ({ type }) => {
  const dispatch = useDispatch();
  const data = useSelector(getGraphLineData);
  const loading = useSelector(getGraphLineLoading);

  const [year, setYear] = useState(`${new Date().getFullYear()}`);

  //   const data = [
  //     { year: "1991", value: 0 },
  //     { year: "1992", value: 0 },
  //     { year: "1993", value: 3.5 },
  //     { year: "1994", value: 5 },
  //     { year: "1995", value: 4.9 },
  //     { year: "1996", value: 6 },
  //     { year: "1997", value: 7 },
  //     { year: "1998", value: 9 },
  //     { year: "1999", value: 13 },
  //   ];
  const config = {
    data,
    height: 400,
    xField: "month",
    yField: "value",
    point: {
      size: 5,
      shape: "circule",
    },
  };

  let dataGraphShow = "";
  if (type === "users") {
    dataGraphShow = "Người dùng tham gia";
  } else if (type === "groups") {
    dataGraphShow = "Các nhóm đang hoạt động";
  } else if (type === "posts") {
    dataGraphShow = "Các bài đăng được tạo";
  }

  useEffect(() => {
    dispatch(
      fetchGraphLineSaga({
        type,
        year,
      })
    );
    return () => {};
  }, [year, type]);

  //tạo mảng năm

  const createYears = () => {
    const startYear = 2020;
    const newYear = parseInt(new Date().getFullYear());

    const yearsArr = [];

    for (let i = startYear; i <= newYear; i++) {
      yearsArr.push(i);
    }

    return yearsArr;

   
  };

  return (
    <Spin spinning={loading}>
      <LineGraphStyled>
        <div className="title">
          <MediumTitleStyled>
            Đồ thị hiển thị số lượng {dataGraphShow}
          </MediumTitleStyled>
        </div>
        <div className="year-selection">
          <Select
            defaultValue={`${new Date().getFullYear()}`}
            onChange={(value) => setYear(value)}
          >
            {createYears().map((year) => {
              return <Option key={`line-${year}`} value={`${year}`}>{year}</Option>;
            })}
          </Select>
        </div>
        <div className="graph">
          <Line {...config} />
        </div>
      </LineGraphStyled>
    </Spin>
  );
};

export default LineGraph;
