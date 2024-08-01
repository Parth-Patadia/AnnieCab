import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export const ContactDetails = () => {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("https://sparkstoideas.daddy11.in/contact/getContact")
        .then((res) => {
          console.log(res)
          setFilteredData(res.data.result);
          setData(res.data.result);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  useEffect(() => {
    const result = data.filter((e) => {
      return e.phno.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);

  const columns = [
    { name: "Index", selector: (e, index) => index + 1, sortable: true, width: "100px" },    // { name: "FirstName", selector: (e) => e.firstName },
    // { name: "LastName", selector: (e) => e.lastName },
    { name: "Phone No.", selector: (e) => e.phno, sortable: true, width: "150px" },
    { name: "Email", selector: (e) => e.email, sortable: true, wrap: true },
    // { name: "Address", selector: (e) => e.address },
    {
      name: "Message", 
      selector: (e) => e.message, 
      sortable: true, 
      wrap: true, 
      grow: 2,
      // cell: (e) => (
      //   <button
      //     className="bg-green-600 font-bold text-white rounded-md p-2"
      //   >
      //     Details
      //   </button>
      // ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: '15px', // Change font size
        fontWeight: 'bold', // Make font bold
        fontFamily: 'Arial, sans-serif', // Change font family
      },                     
    },
  };
  console.log(data);
  return (
    // <div className="overflow-y-scroll">
    //   <DataTable
    //     className="bg-black"
    //     title="Contact Details"
    //     fixedHeader
    //     subHeader
    //     subHeaderComponent={
    //       <input
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //         className="border px-4 py-2"
    //         type="text"
    //         placeholder="Search Phone number"
    //       />
    //     }
    //     highlightOnHover
    //     fixedHeaderScrollHeight="440px"
    //     columns={columns}
    //     data={filteredData.reverse()}
    //     pagination
    //   />
    // </div>
    <div className="overflow-x-auto">
      <DataTable
        title="Contact Details"
        fixedHeader
        subHeader
        subHeaderComponent={
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg mb-4"
            type="text"
            placeholder="Search Phone number"
          />
        }
        highlightOnHover
        fixedHeaderScrollHeight="440px"
        columns={columns}
        data={filteredData.reverse()}
        pagination
        paginationRowsPerPageOptions={[4, 10, 15, 20]}

        customStyles={customStyles}
      />
    </div>
  )
}
