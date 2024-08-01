import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export const UserList = () => {
  const [search, setSearch] = useState();
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await axios
        .get("https://sparkstoideas.daddy11.in/user/getAlldata")
        .then((res) => {
          setFilteredData(res.data.data);
          setData(res.data.data);
          setLoader(false)
        })
        .catch((err) => console.log(err));
    })();
  }, [loader]);

  useEffect(() => {
    const result = data.filter((e) => {
      return e.phno.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);

  const action = async (id) => {
    setLoader(true)
    await axios
      .get(`https://sparkstoideas.daddy11.in/user/loginstatus/${id}`)
      .then((res) => {
        console.log(res)
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  const del = async (id) => {
    setLoader(true)
    await axios
      .delete(`https://sparkstoideas.daddy11.in/user/delete/${id}`)
      .then((res) => {
        console.table(res);
        if (res.data.success == 1) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    { name: "Index", selector: (e, index) => index + 1 },
    { name: "FirstName", selector: (e) => e.firstName },
    { name: "LastName", selector: (e) => e.lastName },
    // { name: "Email", selector: (e) => e.email },
    { name: "Phone No.", selector: (e) => e.phno },
    // { name: "Address", selector: (e) => e.address },
    {
      name: "Profile",
      selector: (e) =>
        e.profile == null ? (
          <img
            className="w-10 h-10 rounded-full"
            src={require("../asset/user.jpg")}
            alt=""
          />
        ) : (
          <img className="w-10 h-10 rounded-full" src={e.profile} alt="" />
        ),
    },
    {
      name: "Action",
      cell: (e) => (
        <button
          className="bg-red-500 rounded-md p-2"
          onClick={() => del(e._id)}
        >
          Delete
        </button>
      ),
    },
    {
      name: "Action",
      cell: (e) =>
        e.LoginStatus == 0 ? (
          <button
            onClick={() => action(e._id)}
            className="bg-red-600 rounded-md p-2"
          >
            Block
          </button>
        ) : (
          <button
            onClick={() => action(e._id)}
            className="bg-yellow-400 rounded-md p-2"
          >
            Unblock
          </button>
        ),
    },
    {
      name: "Action",
      cell: (e) => (
        <button
          onClick={() =>
            navigate("/admin/details", { state: { Id: e._id, type: "user" } })
          }
          className="bg-green-600 font-bold text-white rounded-md p-2"
        >
          Details
        </button>
      ),
    },
  ];
  console.log(data);
  return (
    <>
      {loader && <Loader />}
      <div className="overflow-y-scroll">
        <DataTable
          className="bg-white"
          title="User List"
          fixedHeader
          subHeader
          subHeaderComponent={
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2"
              type="text"
              placeholder="Search Phone number"
            />
          }
          highlightOnHover
          fixedHeaderScrollHeight="440px"
          columns={columns}
          data={filteredData.reverse()}
          pagination
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};
