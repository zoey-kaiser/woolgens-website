import React, {FC} from "react";
import Link from "next/link"

declare interface StatsCardProps {
    title: string,
    value: string | number,
    label?: string,
    link?: string,
}

const StatsCard: FC<StatsCardProps> = ({title, value, label, link}) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-xl text-gray-200">
                    {title}:
                </h1>
                {link ? (
                    <Link href={link} passHref={true}>
                        <a className="text-gray-400 hover:text-accent-300">
                            {value} {label}
                        </a>
                    </Link>
                ): (
                    <h2 className="text-gray-400">
                        {value} {label}
                    </h2>
                )}
            </div>
        </div>
    )
}

export default StatsCard