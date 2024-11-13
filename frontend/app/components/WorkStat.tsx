"use client";
// import Image from "next/image";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataSet = [
  {
    id: "01",
    jobTitle: "DevOps Engineer",
    companyName: "FusionTech",
    status: "accepted",
    dateApplied: "2024-08-25",
  },
  {
    id: "02",
    jobTitle: "Backend Developer",
    companyName: "FusionTech",
    status: "rejected",
    dateApplied: "2024-07-18",
  },
  {
    id: "03",
    jobTitle: "Project Manager",
    companyName: "MindForge",
    status: "rejected",
    dateApplied: "2024-06-04",
  },
  {
    id: "04",
    jobTitle: "Systems Analyst",
    companyName: "DesignHut",
    status: "accepted",
    dateApplied: "2024-05-22",
  },
  {
    id: "05",
    jobTitle: "Software Engineer",
    companyName: "UrbanCoders",
    status: "accepted",
    dateApplied: "2024-09-04",
  },
  {
    id: "06",
    jobTitle: "Data Scientist",
    companyName: "UrbanCoders",
    status: "rejected",
    dateApplied: "2024-06-03",
  },
  {
    id: "07",
    jobTitle: "Full Stack Developer",
    companyName: "UrbanCoders",
    status: "pending",
    dateApplied: "2024-05-05",
  },
  {
    id: "08",
    jobTitle: "Mobile Developer",
    companyName: "UrbanCoders",
    status: "rejected",
    dateApplied: "2024-07-26",
  },
  {
    id: "09",
    jobTitle: "Software Engineer",
    companyName: "ByteWorks",
    status: "rejected",
    dateApplied: "2024-07-12",
  },
  {
    id: "10",
    jobTitle: "Project Manager",
    companyName: "MindForge",
    status: "accepted",
    dateApplied: "2024-08-29",
  },
  {
    id: "11",
    jobTitle: "Data Scientist",
    companyName: "Skyline Solutions",
    status: "accepted",
    dateApplied: "2024-03-22",
  },
  {
    id: "12",
    jobTitle: "QA Engineer",
    companyName: "NextGen",
    status: "accepted",
    dateApplied: "2024-01-03",
  },
];

export const data = {
  labels: ["Pending", "Rejected", "Accepted"],
  datasets: [
    {
      label: "Statistics",
      data: [12, 19, 3],
      backgroundColor: ["yellow", "red", "green"],
    },
  ],
};

export default function WorkStat() {
  const filterBy = () => {};

  return (
    <div className="p-28">
      <header className="mb-10 pl-10">
        <select>
          <option value="">Filter by</option>
          <option value="status">Status</option>
          <option value="date">Date</option>
        </select>
      </header>
      <div className="flex  justify-between">
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
            {dataSet.map((val) => (
              <tr key={val.id}>
                <td>{val.jobTitle}</td>
                <td>{val.companyName}</td>
                <td>{val.status}</td>
                <td>{val.dateApplied}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <aside className="text-center">
          <h3>Statistics</h3>
          <Doughnut data={data} />
        </aside>
      </div>
    </div>
  );
}
