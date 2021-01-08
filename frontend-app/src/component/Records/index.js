import React, { useEffect, useState } from "react";
import "./Record.css";

import config from "../../config";

function Index() {
  const [apiData, setApiData] = useState([]);
  const [userInput, setuserInput] = useState("");
  const [sortBy, setSortBy] = useState("percentage_Marks");
  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = () => {
    fetch(`${config.url}/api/getTasks`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log({ resData });
        setApiData(resData.students);
      });
  };

  return (
    <div className="main_container">
      <div class="custom_select">
        <input
          placeholder="Search by name"
          onChange={(e) => setuserInput(e.target.value.toLowerCase())}
        />

        <div>
          <select
            style={{ padding: "10px" }}
            onChange={(e) => setSortBy(e.target.value)}
            defaultValue="percentage_Marks"
          >
            <option value="all">Sort by:</option>
            <option value="math_Marks">Math marks</option>
            <option value="chemistry_Marks">Chemistry marks</option>
            <option value="physics_Marks">Physics marks</option>
            <option value="total_Marks">Total marks</option>
            <option value="percentage_Marks">Percentage</option>
          </select>
        </div>
      </div>
      <section>
        <div className="tbl-header">
          <table>
            <thead>
              <tr>
                <th>Roll No.</th>
                <th>Name</th>
                <th>Math</th>
                <th>Chemistry</th>
                <th>Physics</th>
                <th>Total Marks</th>
                <th>Percentage</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table>
            <tbody>
              {apiData
                .filter((data) => data.name.toLowerCase().includes(userInput))
                .sort((a, b) =>
                  a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0
                )
                .map((data) => (
                  <tr key={data.index}>
                    <td>{data.roll_No}</td>
                    <td>{data.name}</td>
                    <td>{data.math_Marks}</td>
                    <td>{data.chemistry_Marks}</td>
                    <td>{data.physics_Marks}</td>
                    <td>{data.total_Marks}</td>
                    <td>{parseFloat(data.percentage_Marks).toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Index;
