"use client";
// import Image from "next/image";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Table from "./Table";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  status: string;
  dateApplied: string;
}

interface Stats {
  totalApplicants: number;
  countByStatus: {
    statusName: "pending" | "accepted" | "rejected";
    count: number;
  }[];
}

export default function Dashboard() {
  const [filteredSet, setFilteredSet] = useState<undefined | Application[]>(
    undefined
  );
  const [dataSet, setDataSet] = useState<undefined | Application[]>(undefined);

  const [isLoading, setIsLoading] = useState(true);

  const [dataStats, setDataStats] = useState({
    labels: ["Pending", "Rejected", "Accepted"],
    datasets: [
      {
        label: "Statistics",

        // Initial dummy data
        data: [12, 19, 3],
        backgroundColor: ["yellow", "red", "green"],
      },
    ],
  });

  useEffect(() => {
    const getApplications = async () => {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/applications");
      const dataApplications: Application[] = await res.json();
      setDataSet(dataApplications);

      const resStats = await fetch("http://localhost:3000/applications/stats");
      const statsData: Stats = await resStats.json();

      const formatData: number[] = [];

      // Set the appropriate status to its position in the array
      statsData.countByStatus.forEach((val) => {
        if (val.statusName === "pending") formatData[0] = val.count;
        if (val.statusName === "rejected") formatData[1] = val.count;
        if (val.statusName === "accepted") formatData[2] = val.count;
      });

      console.log({
        ...dataStats,
        datasets: [{ ...dataStats.datasets[0], data: formatData }],
      });
      // update the Data array used by Chart.js
      setDataStats({
        ...dataStats,
        datasets: [{ ...dataStats.datasets[0], data: formatData }],
      });
      setIsLoading(false);
    };

    getApplications();
  }, []);

  const filterBy = (type: string) => {
    if (type === "") setFilteredSet(undefined);
    else if (dataSet) {
      const sett = dataSet.filter((val) => val.status === type);
      setFilteredSet(sett);
    }
  };

  const toggleDateSort = (direction: string) => {
    if (dataSet) {
      const copyArr = [...dataSet];

      if (direction === "" || direction === "ascending") {
        copyArr.sort(
          (a, b) =>
            new Date(b.dateApplied).valueOf() -
            new Date(a.dateApplied).valueOf()
        );
      }

      if (direction === "descending") {
        copyArr.sort(
          (a, b) =>
            new Date(a.dateApplied).valueOf() -
            new Date(b.dateApplied).valueOf()
        );
      }

      setDataSet(copyArr);
    }
  };

  return (
    <div className="p-28 max-w-[1200px] mx-auto flex flex-wrap-reverse gap-20 justify-center">
      <Table
        filterBy={filterBy}
        toggleDateSort={toggleDateSort}
        isLoading={isLoading}
        dataSet={dataSet}
        filteredSet={filteredSet}
      />


        <aside className="text-center max-w-[600px]">
          <h3>Statistics</h3>
          <Doughnut data={dataStats} />
        </aside>

    </div>
  );
}
