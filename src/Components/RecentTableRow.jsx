const RecentTableRow = ({
  title,
  date,
  amount,
  category,
  transactionType,
  type,
  text,
  bg,
}) => {
  return (
    <tr className="font-normal ">
      <td className="py-3 ">{date}</td>
      <td className="py-3 text-white flex items-center md:gap-3">
        <span
          className={`text-md md:text-lg ${text} ${bg} flex items-center justify-center size-4 md:size-7 rounded-full`}
        >
          {title.slice(0, 1).toUpperCase()}
        </span>
        <span>{title.toUpperCase()}</span>
      </td>
      <td className={`py-3`}>
        <span className={`${bg} ${text} py-1 px-2 rounded-2xl`}>
          {category}
        </span>
      </td>
      <td className="py-3 ">{transactionType}</td>
      <td className={`py-3 text-right font-semibold ${text}`}>
        {type === "expense" ? `-$${amount}` : `+$${amount}`}
      </td>
    </tr>
  );
};

export default RecentTableRow;
