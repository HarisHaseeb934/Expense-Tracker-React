const RecentTableRow = ({ date, title, category, type, amount }) => {
  return (
    <tr className="font-normal ">
      <td className="py-2 ">{date}</td>
      <td className="py-2 text-white">{title}</td>
      <td className="py-2 ">{category}</td>
      <td className="py-2 ">{type}</td>
      <td className={`py-2 text-right font-semibold ${amount > 0 ? "text-primary-container" : "text-[#ff8493]"}`}>{amount > 0 ? `+$${amount}` : `-$${Math.abs(amount)}`}</td>
    </tr>
  );
};

export default RecentTableRow;
