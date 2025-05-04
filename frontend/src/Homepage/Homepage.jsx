import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
//import "datatables.net-dt/css/jquery.dataTables.min.css"; // Import styles for DataTables
import DT from "datatables.net-bs5";

DataTable.use(DT);
export default function Homepage() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    // Dummy Data for the first table
    setData1([
      { id: 1, name: "John Doe", age: 28, job: "Developer" },
      { id: 2, name: "Jane Smith", age: 34, job: "Designer" },
      { id: 3, name: "Sam Brown", age: 23, job: "Manager" },
    ]);

    // Dummy Data for the second table
    setData2([
      { id: 1, product: "Laptop", price: 1200, stock: 15 },
      { id: 2, product: "Phone", price: 800, stock: 50 },
      { id: 3, product: "Tablet", price: 600, stock: 25 },
    ]);
  }, []);

  return (
    <div className="container mt-5">
      <h2>DataTable 1: Users</h2>
      <DataTable
        data={data1}
        className="table table-stripped table-hover"
        columns={[
          { title: "ID", data: "id" },
          { title: "Name", data: "name" },
          { title: "Age", data: "age" },
          { title: "Job", data: "job" },
        ]}
        options={{
          paging: true,
          searching: true,
          ordering: true,
          info: true,
        }}
      />

      <h2 className="mt-5">DataTable 2: Products</h2>
      <DataTable
        data={data2}
         className="table table-stripped table-hover"
        columns={[
          { title: "ID", data: "id" },
          { title: "Product", data: "product" },
          { title: "Price", data: "price" },
          { title: "Stock", data: "stock" },
        ]}
        options={{
          paging: true,
          searching: true,
          ordering: true,
          info: true,
        }}
      />
    </div>
  );
}
