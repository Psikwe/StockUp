import React from "react";
import ApexCharts from "apexcharts";
import { dashboardPieOptions, options, overviewData } from "../../data";

interface Props {}

const Overview = (props: Props) => {
  React.useEffect(() => {
    let chart = new ApexCharts(document.getElementById("chart"), options);
    chart.render();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  React.useEffect(() => {
    let pie = new ApexCharts(
      document.getElementById("pie"),
      dashboardPieOptions
    );
    pie.render();

    return () => {
      if (pie) {
        pie.destroy();
      }
    };
  }, []);
  return (
    <>
      <h3 className="text-3xl">Overview</h3>
      <div className="grid grid-cols-3 gap-3 mt-6">
        {overviewData.map((item, idx) => (
          <>
            <div key={idx} className="p-8 bg-[#ffffff]">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-4xl">{item.figure}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="w-12 ml-20">
                  <item.icon size={34} color={item.iconColor} />
                </div>
              </div>
              <hr className={`border-t-4 ${item.hrColor}`} />
            </div>
          </>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-2 bg-white mt-14" id="chart"></div>
        <div className="p-2 bg-white mt-14" id="pie"></div>
      </div>
    </>
  );
};

export default Overview;
