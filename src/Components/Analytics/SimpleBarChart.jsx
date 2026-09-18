import { BarChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CashFlowChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <XAxis dataKey="label" stroke="#888" tick={{ fontSize: 10, fill: '#888888' }}/>
      <YAxis stroke="#888" tickFormatter={(v) => `$${v / 1000}k`} tick={{ fontSize: 10, fill: '#888888' }}/>
      <Tooltip />
      <Bar dataKey="inflow" fill="#44c08c" radius={[4, 4, 0, 0]} name="Inflow" />
      <Bar dataKey="outflow" fill="#ac787c" radius={[4, 4, 0, 0]} name="Outflow" />
    </BarChart>
  </ResponsiveContainer>
);

export default CashFlowChart