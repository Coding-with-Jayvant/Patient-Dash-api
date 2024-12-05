import React from 'react';
import profilePic from './asstes/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png';
import logo from './asstes/TestLogo.jpg';
const Header = () => {
    return (
        <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
                <nav className="hidden md:flex gap-6 text-sm">
                    <a href="#" aria-label="Overview" className="hover:text-blue-500">Overview</a>
                    <a href="#" aria-label="Patients" className="hover:block text-black pl-2 pr-2 rounded-lg mx-auto"  style={{ backgroundColor: "#01F0D0" }}>Patients</a>
               
                           
                    <a href="#" aria-label="Schedule" className="hover:text-blue-500 ">Schedule</a>
                    <a href="#" aria-label="Message" className="hover:text-blue-500">Message</a>
                    <a href="#" aria-label="Transaction" className="hover:text-blue-500">Transaction</a>
                </nav>
                <button className="block md:hidden">Menu</button>
            </div>
            {/* <img
                src={profilePic}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
            /> */}
            <div className="flex items-center gap-4">
                <img
                    src={profilePic}
                    alt="Patient Profile"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold">Dr. Jose Simmons</p>
                    <p className="text-sm text-gray-500">
                        General Practitioner
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
