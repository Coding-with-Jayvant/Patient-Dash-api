import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import heart from "./asstes/HeartBPM.svg"
import temperature from "./asstes/temperature.svg"
import respiratory from "./asstes/respiratory rate.svg"
import arr from "./asstes/download_FILL0_wght300_GRAD0_opsz24 (1).svg"
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);


const Dashboard = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);

    // Fetch patient data from the API
    useEffect(() => {
        const fetchPatient = async () => {
            const url = "https://fedskillstest.coalitiontechnologies.workers.dev";
            const username = "coalition";
            const password = "skills-test";
            const authKey = btoa(`${username}:${password}`); // Encode credentials in Base64

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
                if (data.length > 0) {
                    setSelectedPatient(data[3]); // Use the first patient only
                }
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        fetchPatient();
    }, []);

    if (!selectedPatient) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    const heartRate = selectedPatient?.heart_rate;
    const systolic = selectedPatient.diagnosis_history[0].blood_pressure.systolic.value;
    const diastolic = selectedPatient.diagnosis_history[0].blood_pressure.diastolic.value;

    const data = {
        labels: ["Systolic", "Diastolic"], // X-axis labels
        datasets: [
            {
                label: "Blood Pressure (mmHg)",
                data: [systolic, diastolic], // Systolic and diastolic values
                borderColor: "#FF6F61", // Line color
                backgroundColor: "transparent", // No fill under the line
                pointBackgroundColor: "#FF6F61", // Point color
                pointBorderColor: "#FF6F61", // Point border color
                borderWidth: 2,
                tension: 0.4, // Tension for zigzag curve
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw} mmHg`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: false, // Adjust if necessary
            },
        },
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <Header />

                {/* Patient Dashboard */}
                <div className="grid grid-cols-3 gap-6">

                    {/* Diagnosis Charts */}
                    <div className="col-span-2">
                        {/* top chart */}
                        <div className="bg-white shadow rounded-lg p-4 mb-10 h-64">
                            <h3 className="font-bold mb-2">Diagnosis History</h3>
                            <div className="h-full rounded-lg bg-[#F4F0FE] p-4">
                                <p className="font-semibold text-lg">Blood Pressure</p>
                                <div className="flex">
                                    <div className="w-1/2">
                                        <Line data={data} options={options} />
                                    </div>
                                    <div className="w-1/2 pl-4">
                                        <div className="mb-2">
                                            <p className="font-semibold">Systolic</p>
                                            <p>{systolic} mmHg</p>
                                            <p className="text-sm text-gray-500">{selectedPatient.diagnosis_history[0].blood_pressure.systolic.levels}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Diastolic</p>
                                            <p>{diastolic} mmHg</p>
                                            <p className="text-sm text-gray-500">{selectedPatient.diagnosis_history[0].blood_pressure.diastolic.levels}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="grid grid-cols-3 gap-4">

                            <div className=" shadow rounded-lg p-4 h-40" style={{ backgroundColor: '#E0F3FA' }}>
                                <div className="h-full rounded-lg">
                                    <img src={respiratory} className=" w-auto " style={{ height: 60 }} />
                                    <p className="">Respiratory Rate</p>
                                    <p className="font-semibold text-lg">{selectedPatient.diagnosis_history[0].respiratory_rate.value} BPM</p>
                                    <p className="text-sm text-gray-500">{selectedPatient.diagnosis_history[0].respiratory_rate.levels}</p>
                                </div>
                            </div>

                            <div className=" shadow rounded-lg p-4 h-40" style={{ backgroundColor: '#FFE6E9' }}>
                                <div className="h-full rounded-lg">
                                    <img src={temperature} className=" w-auto " style={{ height: 60 }} />
                                    <p className="">Temperature</p>
                                    <p className="font-semibold text-lg">{selectedPatient.diagnosis_history[0].temperature.value} F</p>
                                    <p className="text-sm text-gray-500">{selectedPatient.diagnosis_history[0].temperature.levels}</p>
                                </div>
                            </div>

                            <div className=" shadow rounded-lg p-4 h-40" style={{ backgroundColor: '#FFE6F1' }}>
                                <div className="h-full rounded-lg">
                                    <img src={heart} className=" w-auto " style={{ height: 60 }} />
                                    <p className="">Heart Rate</p>
                                    <p className="font-semibold text-lg">{selectedPatient.diagnosis_history[0].heart_rate.value} BPM</p>
                                    <p className="text-sm text-gray-500">{selectedPatient.diagnosis_history[0].heart_rate.levels}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Patient Profile */}
                    <div className="bg-white shadow rounded-lg p-4">
                        <img
                            src={selectedPatient.profile_picture}
                            alt={selectedPatient.name}
                            className="w-20 h-20 rounded-full mx-auto"
                        />
                        <h3 className="text-center font-bold mt-2">{selectedPatient.name}</h3>
                        <ul>
                            <li>
                                <div className="flex items-center gap-4 mt-5">
                                    <img
                                        src={selectedPatient.profile_picture}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">Date Of Birth</p>
                                        <p className="font-semibold">{selectedPatient.date_of_birth}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-4 mt-5">
                                    <img
                                        src={selectedPatient.profile_picture}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-semibold">{selectedPatient.gender}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-4 mt-5">
                                    <img
                                        src={selectedPatient.profile_picture}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">Contact Information</p>
                                        <p className="font-semibold">{selectedPatient.phone_number}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-4 mt-5">
                                    <img
                                        src={selectedPatient.profile_picture}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">Emergency Contacts</p>
                                        <p className="font-semibold">{selectedPatient.emergency_contact}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-4 mt-5">
                                    <img
                                        src={selectedPatient.profile_picture}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-500">Insurance Provider</p>
                                        <p className="font-semibold">{selectedPatient.insurance_type}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button
                            className="block text-white px-4 py-2 mt-4 rounded-lg mx-auto"
                            style={{ backgroundColor: "#01F0D0" }}
                        >
                            Show All Information
                        </button>

                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Diagnostic List */}
                    <div className="mt-0 bg-white shadow rounded-lg p-4 col-span-2">
                        <h3 className="font-bold">Diagnostic List</h3>
                        <div className="overflow-x-auto bg-white shadow rounded-lg p-4 mt-6">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-300 text-left">Problem/Diagnosis</th>
                                        <th className="px-4 py-2 border border-gray-300 text-left">Description</th>
                                        <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedPatient.diagnostic_list.map((diagnosis, index) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                        >
                                            <td className="px-4 py-2 border border-gray-300">{diagnosis.name}</td>
                                            <td className="px-4 py-2 border border-gray-300">{diagnosis.description}</td>
                                            <td className="px-4 py-2 border border-gray-300">{diagnosis.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    {/* <div className="mt-6 bg-white shadow rounded-lg p-4">
                        <div className="mt-4">
                            <h4 className="font-bold">Lab Results</h4>
                            <ul className="list-disc list-inside">
                                {selectedPatient.lab_results.map((result, index) => (
                                    <li key={index} className="text-sm text-gray-700">
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div> */}
                    <div className="mt-6 bg-white shadow rounded-lg p-4">
                        <div className="mt-4">
                            <h4 className="font-bold">Lab Results</h4>
                            <ul className="list-none p-0">
                                {selectedPatient.lab_results.map((result, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center p-2 border-b last:border-none"
                                    >
                                        <span className="text-sm text-gray-700">{result}</span>
                                        <button className="flex items-center text-gray-500 hover:text-blue-500">
                                        <img src={arr} className=" w-auto " style={{ height: 15 }} />

                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
