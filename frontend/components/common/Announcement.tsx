import React from "react";

interface AnnouncementProps {
    text: string,
    icon: React.ReactNode,
    iconStyles: string,
    rightComponent?: React.ReactNode
}

const Announcement = ({text, iconStyles, rightComponent, icon}: AnnouncementProps) => {
    return (
        <div className="flex justify-between items-center p-3 w-full rounded-xl shadow bg-dark-light/50">
            <div className="flex items-center">
                <div className={`p-3 text-2xl rounded-xl ${iconStyles}`}>
                    {icon}
                </div>
                <p className="pt-1 ml-3 text-lg">
                    {text}
                </p>
            </div>
            {rightComponent}
        </div>
    )
}

export default Announcement
