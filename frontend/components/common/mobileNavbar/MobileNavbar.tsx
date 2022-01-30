import {GiCompass} from "react-icons/gi";
import MobileNavbarLink from "./MobileNavbarLink";
import React, {FC} from "react";
import { Transition } from '@headlessui/react'

declare interface MobileNavbarProps {
    isOpen: boolean
    toggleMobileNavbar: () => void,
}

const MobileNavbar: FC<MobileNavbarProps> = ({isOpen, toggleMobileNavbar}) => {

    return (
        <Transition
            show={isOpen}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="absolute top-0 left-0 w-full h-screen">
                <div className="absolute top-0 left-0 z-10 w-full h-full bg-dark-light/80" onClick={toggleMobileNavbar} />
                <div className="container flex flex-col justify-center items-center mx-auto h-full">
                    <div className="relative z-20 p-4 w-full bg-dark rounded-2xl">
                        <h1 className="flex justify-center items-center my-5 text-2xl">
                            <GiCompass size="2rem" className="mr-3" />
                            <span className="font-bold">
                                Navigation
                            </span>
                        </h1>
                        <ul className="grid grid-cols-2 gap-4">
                            <MobileNavbarLink title="Home" link="/" />
                            <MobileNavbarLink title="News" link="/changelogs" />
                            <MobileNavbarLink title="Stats" link="/stats" />
                            <MobileNavbarLink title="Vote" link="/vote" />
                        </ul>
                    </div>
                </div>
            </div>
        </Transition>
    )
}

export default MobileNavbar