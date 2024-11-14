"use client";
// import Image from "next/image";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  status: string;
  dateApplied: string;
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
      const data = await res.json();

      setDataSet(data);
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
    <div className="p-28">
      <header className="mb-10 pl-10 lg:max-w-[400px] flex flex-wrap gap-6 justify-between">
        <select onChange={(e) => filterBy(e.target.value)}>
          <option value="">Filter by</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        <select onChange={(e) => toggleDateSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="ascending">Latest</option>
          <option value="descending">Oldest</option>
        </select>
      </header>

      <div className="flex  justify-between">
        {isLoading && <p className="text-xl">is loading ...</p>}
        {!isLoading && (
          <table className="text-center">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Status</th>
                <th>Date Applied</th>
              </tr>
            </thead>

            <tbody>
              {!filteredSet &&
                dataSet &&
                dataSet.map((val) => (
                  <tr key={val.id}>
                    <td>{val.jobTitle}</td>
                    <td>{val.companyName}</td>
                    <td>{val.status}</td>
                    <td>{val.dateApplied}</td>
                  </tr>
                ))}

              {filteredSet &&
                filteredSet.map((val) => (
                  <tr key={val.id}>
                    <td>{val.jobTitle}</td>
                    <td>{val.companyName}</td>
                    <td>{val.status}</td>
                    <td>{val.dateApplied}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        <aside className="text-center">
          <h3>Statistics</h3>
          <Doughnut data={dataStats} />
        </aside>
      </div>
    </div>
  );
}
