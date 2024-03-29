import {useEffect, useState} from "react";
import {RiArrowRightSLine} from "react-icons/ri"
import Link from "next/link"

interface BreadCrumbsProps {
    pathName: string,
}

const isNumber = (string) => {
    return !/\D/.test(string);
}

const BreadCrumbs = ({pathName}: BreadCrumbsProps) => {
    const [paths, setPaths] = useState([])

    useEffect(() => {
        setPaths((pathName.substr(1, pathName.length)).split('/'))
    }, [pathName])

    const getLink = (end: number) => {
        let url = "/"
        for (let i = 0; i < end; i++) {
            url += `${paths[i]}/`
        }

        return url
    }

    if (paths[0] == "") {
        return (
            <></>
        )
    }

    return (
        <nav className="text-sm font-poppins">
            <ol className="flex items-center list-reset">
                <li className="flex items-center">
                    <Link href="/" passHref={true}>
                        <a className="capitalize">Home</a>
                    </Link>
                </li>
                {(paths.map((path, key: number) => (
                    <li key={key} className="flex items-center">
                            <span className="px-1">
                                <RiArrowRightSLine size="1.3rem"/>
                            </span>
                        <span>
                                {(key + 1 === paths.length) ? (
                                    <a className="text-gray-400 capitalize">{isNumber(path) && "#"}{path}</a>
                                ) : (
                                    <Link href={getLink(key + 1)} passHref={true}>
                                        <a className="capitalize">{path.match(/^[0-9]+$/ && "#")}{path}</a>
                                    </Link>
                                )}
                            </span>
                    </li>
                )))}
            </ol>
        </nav>
    )
}

export default BreadCrumbs
