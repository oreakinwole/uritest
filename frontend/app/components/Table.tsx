"use client";

import { Application } from "./Dashboard";

interface TableProps {
  filterBy: (type: string) => void;
  toggleDateSort: (direction: string) => void;
  isLoading: boolean;
  dataSet: undefined | Application[];
  filteredSet: undefined | Application[];
  children?: unknown;
}

export default function Table(props: TableProps) {
  return (
    <>
      <div className="max-w-[450px]">
        <header className="mb-10 pl-10  flex flex-wrap gap-6 justify-between">
          <select onChange={(e) => props.filterBy(e.target.value)}>
            <option value="">Filter by</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          <select onChange={(e) => props.toggleDateSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="ascending">Latest</option>
            <option value="descending">Oldest</option>
          </select>
        </header>

        {props.isLoading && <p className="text-xl">is loading ...</p>}
        {!props.isLoading && (
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
              {!props.filteredSet &&
                props.dataSet &&
                props.dataSet.map((val) => (
                  <tr key={val.id}>
                    <td>{val.jobTitle}</td>
                    <td>{val.companyName}</td>
                    <td>{val.status}</td>
                    <td>{val.dateApplied}</td>
                  </tr>
                ))}

              {props.filteredSet &&
                props.filteredSet.map((val) => (
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
      </div>
    </>
  );
}
