import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTable.use(DT);

function DayTable({ day, daynumber }) {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    // Dummy Data
    const dummyData = [
      { id: 1, value1: 10, value2: 20, value3: 30 },
      { id: 2, value1: 15, value2: 25, value3: 35 },
      { id: 3, value1: 20, value2: 30, value3: 40 },
    ];
    setData(dummyData);

    // Calculate summary
    const summaryData = {
      value1: dummyData.reduce((sum, row) => sum + row.value1, 0),
      value2: dummyData.reduce((sum, row) => sum + row.value2, 0),
      value3: dummyData.reduce((sum, row) => sum + row.value3, 0),
    };
    setSummary(summaryData);
  }, []);

  return (
    <div className="container mt-5">
      <h2>
        Day {daynumber}: {day}
      </h2>
      <DataTable
        data={data}
        className="table table-stripped table-hover"
        columns={[
          { title: "ID", data: "id" },
          { title: "Value 1", data: "value1" },
          { title: "Value 2", data: "value2" },
          { title: "Value 3", data: "value3" },
        ]}
        options={{
          paging: true,
          searching: true,
          ordering: true,
          info: true,
        }}
      />
      <div className="mt-3">
        <h4>Summary</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Column</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Value 1</td>
              <td>{summary.value1}</td>
            </tr>
            <tr>
              <td>Value 2</td>
              <td>{summary.value2}</td>
            </tr>
            <tr>
              <td>Value 3</td>
              <td>{summary.value3}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DayTable;
