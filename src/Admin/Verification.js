import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";

export const Verification = () => {
  const [id, setId] = useState();
  const [code, setCode] = useState();
  const [loader, setLoader] = useState(true)
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await axios
        .get("https://sparkstoideas.daddy11.in/vender/allVenders")
        .then((res) => {
          setData(res.data.result);
          setLoader(false)
        })
        .catch((err) => console.log(err));
    })();
  }, [loader]);

  useEffect(() => {
    if (data) {
      const arr = [];
      data.reverse().map((e, i) => {
        if (e.verification == "Pending") {
          arr.push(e);
        }
      });
      setFilterData(arr);
      setFilteredData(arr);
    }
  }, [data]);

  useEffect(() => {
    const result = filterData.filter((e) => {
      return e.phno.toLowerCase().match(search.toLowerCase());
    });
    setFilteredData(result);
  }, [search]);

  useEffect(() => {
    if (id) {
        (async () => {
          setLoader(true)
          await axios
            .post(`https://sparkstoideas.daddy11.in/vender/documentApproved/${id}`, { code: code })
            .then((res) => {
              console.log(res);
              if (res.data.success == 1) {
                toast.success(res.data.message);
              }
            })
            .catch((err) => console.log(err));
        })();
    }
  }, [id]);

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
          className="bg-red-500 rounded-md font-semibold p-2"
          onClick={() => {
            setCode(0);
            setId(e._id);
          }}
        >
          Rejected
        </button>
      ),
    },
    {
      name: "Action",
      cell: (e) => (
        <button
          className="bg-green-500 rounded-md font-semibold p-2"
          onClick={() => {
            setCode(1);
            setId(e._id);
          }}
        >
          Approved
        </button>
      ),
    },
    {
      name: "Action",
      cell: (e) => (
        <button
          onClick={() =>
            navigate("/admin/details", { state: { Id: e._id, type: "vendor" } })
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
          className="bg-black"
          title="Document verification List"
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
          data={filteredData}
          pagination
        />
      </div>
    </>
  );
};
