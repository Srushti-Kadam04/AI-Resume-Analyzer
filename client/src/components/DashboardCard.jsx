import { Link } from "react-router-dom";
const DashboardCard = ({
  title,
  description,
  icon,
  to,
  span = "lg:col-span-4",
}) => {
  return (
    <Link
      to={to}
      className={`
        col-span-12
        ${span}
        bg-[#171F2E]
        border border-[#2A3441]
        rounded-[30px]
        p-8
        transition-all
        duration-300
        hover:border-blue-500
        hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]
        hover:-translate-y-1
        group
      `}
    >
      <div className="flex justify-between items-start">

        <div>

          <div className="text-blue-400 text-4xl">
            {icon}
          </div>

          <h2 className="text-white text-2xl font-bold mt-6">
            {title}
          </h2>

          <p className="text-gray-400 mt-3 leading-7">
            {description}
          </p>

        </div>

      </div>
    </Link>
  );
};
export default DashboardCard;