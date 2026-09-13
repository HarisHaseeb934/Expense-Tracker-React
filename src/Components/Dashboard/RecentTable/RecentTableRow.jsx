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
          className={`text-md md:text-lg ${text} ${bg} hidden sm:flex sm:items-center sm:justify-center size-4 md:size-7 rounded-full`}
        >
          {title.slice(0, 1).toUpperCase()}
        </span>
        <span>{title.toUpperCase()}</span>
      </td>
      <td className={`py-3`}>
        <span className={`sm:${bg} ${text} sm:py-1 sm:px-2 rounded-2xl`}>
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
