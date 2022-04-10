import { useState } from "react";
import Axios from "axios";
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const [newWage, setNewWage] = useState(0);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("success");
      setEmployeeList(
        employeeList.concat({ name, age, country, position, wage })
      );

      //
      setAge("");
      setCountry("");
      setName("");
      setPosition("");
      setWage("");
    });
  };

  const getEmployee = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployee = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  return (
    <div className=" ">
      <div className="flex justify-evenly">
        {/*  */}
        <div className="flex flex-col items-center">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className=" w-80 h-12 text-xl p-3 mt-2 border-2 border-black "
          />

          <label>Age:</label>
          <input
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className="w-80 h-12 text-xl p-3 mt-2 border-2 border-black "
          />

          <label>Country:</label>
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            className="w-80 h-12 text-xl p-3 mt-2  border-2 border-black "
          />

          <label>Position:</label>
          <input
            type="text"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
            className=" w-80 h-12  text-xl p-3 mt-2 border-2 border-black "
          />

          <label>Wage (year):</label>
          <input
            type="Number"
            onChange={(e) => setWage(e.target.value)}
            value={wage}
            className="w-80 h-12 text-xl p-3 mt-2 border-2 border-black "
          />

          <button
            onClick={addEmployee}
            className="bg-blue-400 w-80 h-12 mt-4 hover:cursor-pointer"
          >
            Add Employee
          </button>

          <div className="relative w-[50%] mx-auto flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">
              <button
                onClick={getEmployee}
                className="bg-green-400 text-black px-3 py-2 rounded-lg"
              >
                Show Employees
              </button>
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="max-w-2xl mx-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Wage
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit / Delet
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((val, key) => {
                  return (
                    <tr
                      key={key}
                      className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{val.name}</td>
                      <td className="px-6 py-4">{val.age}</td>
                      <td className="px-6 py-4">{val.country}</td>
                      <td className="px-6 py-4">{val.position}</td>
                      <td className="px-6 py-4">{val.wage}</td>
                      <td className=" px-6 py-4  flex space-x-6">
                        {/*  */}
                        <div>
                          <div className="bg-blue-600 px-2 rounded-md hover:cursor-pointer ">
                            <input
                              type="text"
                              className="w-20"
                              placeholder="wage"
                              onChange={(e) => setNewWage(e.target.value)}
                            />
                          </div>
                          <button
                            onClick={updateEmployee.bind(this, val.id)}
                            className="bg-red-600 px-2 rounded-md cursor-pointer"
                          >
                            update:{val.id}
                          </button>
                        </div>
                        {/*  */}
                        <div>
                          <button
                            className="bg-red-600 px-2 rounded-md cursor-pointer"
                            onClick={() => {
                              deleteEmployee(val.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        {/*  */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
}

export default App;
