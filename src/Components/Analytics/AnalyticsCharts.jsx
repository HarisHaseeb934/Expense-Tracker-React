import SimpleBarChart from "./SimpleBarChart";

const AnalyticsCharts = () => {
  return (
    <div className="bg-[#1c1b1b] p-5">
      <div className="flex md:items-center justify-between items-start md:flex-row flex-col gap-5">
        <div>
          <h2 className="text-white font-bold text-md sm:text-lg md:text-xl lg:text-xl">
            Cash Inflowvs. Outflow Trajectory <span>Trailing 6 Months</span>
          </h2>
          <p className="text-on-surface-variant text-[11px] md:text-xs lg:text-sm">
            Monthly velocity breakdown comparing income streams against a Wegate
            burn
          </p>
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="flex items-center gap-3 text-[11px] md:text-xs lg:text-sm">
            <div className="flex items-center gap-2">
              <div className="size-3 bg-[#46c18f] rounded-xs"></div>
              <div className="text-on-surface-variant">Inflow</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 bg-[#ffb2b7] rounded-xs"></div>
              <div className="text-on-surface-variant">Outflow</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-[3px] w-3 bg-[#c0c1f6] rounded-xs"></div>
              <div className="text-on-surface-variant">Net Delta</div>
            </div>
          </div>
          <div className="bg-[#201f1f] text-shadow-on-surface-variant flex rounded-sm text-[11px] md:text-xs lg:text-sm">
            <button className="px-4 text-on-surface-variant">Daily</button>
            <button className="px-4 text-on-surface-variant">Weekly</button>
            <button className="px-4 text-on-surface-variant">Monthly</button>
          </div>
        </div>
      </div>
      {/* <SimpleBarChart/> */}
    </div>
  );
};

export default AnalyticsCharts;
