import React from "react";
import {RiCoinsLine, RiHome2Line, RiSettings2Line, RiAddCircleLine} from "react-icons/ri";
import {Transition} from "@headlessui/react"
import {MdArrowBackIos} from "react-icons/md"
import Link from "next/link"
import DropdownItem from "../../../../common/dropdown/DropdownItem";

interface UserDropdownLandPage {
    selectedPage: string,
    changePage: (page: string) => void,
    user: User
}

const UserDropdownLandPage = ({selectedPage, changePage, user}: UserDropdownLandPage) => {
    return (
        <Transition
            show={selectedPage === "land"}
            enter="transition-opacity duration-200 delay-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=""
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="w-full shrink-0"
        >

            <DropdownItem onClick={() => changePage("start")} title="Back"
                          icon={<MdArrowBackIos className="opacity-50" size="1rem"/>}/>
            <hr className="my-2 border-gray-700"/>
            {user.minecraftUser.land ? (
                <>
                    <Link href={`/stats/lands/${user.minecraftUser.land.id}`} passHref={true}>
                        <a>
                            <DropdownItem title="Land Profile" icon={<RiHome2Line size="1.5rem"/>}/>
                        </a>
                    </Link>
                    <DropdownItem title="Settings" icon={<RiSettings2Line size="1.5rem"/>} disabled={true} />
                    <Link href={`/stats/lands/${user.minecraftUser.land.id}/transactions`} passHref={true}>
                        <a>
                            <DropdownItem title="Transactions" icon={<RiCoinsLine size="1.5rem"/>}/>
                        </a>
                    </Link>
                </>
            ): (
                <>
                    <Link href={`/stats/lands/`} passHref={true}>
                        <a>
                            <DropdownItem title="Top lands" icon={<RiHome2Line size="1.5rem"/>}/>
                        </a>
                    </Link>
                    <DropdownItem title="Create Land" icon={<RiAddCircleLine size="1.5rem"/>} />
                </>
            )}
        </Transition>
    )
}

export default UserDropdownLandPage
