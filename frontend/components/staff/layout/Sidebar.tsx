import SidebarLink from "./SidebarLink";
import {HiHome, HiDatabase, HiX, HiUserGroup, HiCloud, HiBan, HiCalendar} from "react-icons/hi"
import React from "react";

const Sidebar = ({extended = false, pathName = ""}) => {

    return (
        <div
            className={`fixed flex flex-col lg:static z-40 h-screen w-72 bg-dark transition-transform lg:transition-none ease-in-out duration-700 transform lg:transform-none ${!extended ? "-translate-x-80" : "translate-x-0"}`}>
            <div className="flex-grow">
                <div className="flex items-center px-6 h-20">
                    <a className="flex-grow text-2xl font-bold font-poppins">
                        Woolgens
                    </a>
                    <div className="lg:hidden">
                        <HiX size="2rem"/>
                    </div>
                </div>

                <ul className="flex flex-col space-y-2">
                    <SidebarLink
                        icon={<HiHome size="1.2rem"/>}
                        title="Dashboard"
                        pathName={pathName}
                        link="/"
                    />
                    <SidebarLink
                        icon={<HiCalendar size="1.2rem"/>}
                        title="Timetable"
                        pathName={pathName}
                        link="/time-table"
                    />
                    <SidebarLink
                        icon={<HiBan size="1.2rem"/>}
                        title="Punishments"
                        pathName={pathName}
                        link="/punishments"
                    />
                    <SidebarLink
                        icon={<HiDatabase size="1.2rem"/>}
                        title="Services"
                        pathName={pathName}
                        link="/services"
                    />
                    <SidebarLink
                        icon={<HiCloud size="1.2rem"/>}
                        title="Cloud"
                        pathName={pathName}
                        link="/cloud"
                    />
                    <SidebarLink
                        icon={<HiUserGroup size="1.2rem"/>}
                        title="Team"
                        pathName={pathName}
                        link="/team"
                    />
                </ul>
            </div>
            <p className="p-6 font-bold text-gray-500">
                Version 0.1.0
            </p>
        </div>
    )
}

export default Sidebar
