import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CashFlowChart = ({ data }) => {
  const [width, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    let handleWidth = () => {
      setInnerWidth((prev) => window.innerWidth);
    };
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);

  console.log(width);
  console.log(data);
  return (
    <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
      <BarChart
        barGap={20}
        barCategoryGap="20%"
        responsive
        data={data}
        margin={{
          top: 50,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          className=" text-on-surface-variant opacity-20"
        />
        <XAxis
          dataKey="label"
          tick={{
            fill: "#bbcabf",
            fontSize: width < 500 ? 6 : 12,
            fontWeight: 500,
          }}
        />
        <YAxis
          width="auto"
          axisLine={false}
          tick={{ fill: "#bbcabf", fontSize: width < 500 ? 6 : 12, }}
          tickFormatter={(value) =>
            value.toString().length >= 3
              ? `$${value.toString().slice(0, 1)}K`
              : value
          }
        />
        <Tooltip />
        <Bar dataKey="outflow" radius={[10, 10, 0, 0]} fill="#ffb2b7" />
        <Bar dataKey="inflow" radius={[10, 10, 0, 0]} fill="#46c18f" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CashFlowChart;
