import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fetch patient data from API
  useEffect(() => {
    const fetchPatients = async () => {
      const url = "https://fedskillstest.coalitiontechnologies.workers.dev";
      const username = "coalition";
      const password = "skills-test";
      const authKey = btoa(`${username}:${password}`); // Base64 encode auth credentials

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Basic ${authKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPatients(data);
        setSelectedPatient(data[0]); // Default to the first patient
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="w-1/4 bg-white shadow-md p-4 h-screen overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Patients</h2>
      <ul className="space-y-2">
        {patients.map((patient, index) => (
          <li
            key={index}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer border ${
              selectedPatient?.name === patient.name ? "bg-blue-100 border-blue-300" : "bg-gray-50 border-gray-200"
            } hover:shadow transition duration-150`}
            onClick={() => setSelectedPatient(patient)}
          >
            <img
              src={patient.profile_picture}
              alt={`${patient.name}'s Profile`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{patient.name}</p>
              <p className="text-sm text-gray-500">{patient.gender}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
