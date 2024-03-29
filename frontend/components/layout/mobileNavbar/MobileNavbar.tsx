import {GiCompass} from "react-icons/gi";
import MobileNavbarLink from "./MobileNavbarLink";
import React, {FC} from "react";
import Modal from "../../common/Modal";

declare interface MobileNavbarProps {
    isOpen: boolean
    toggleMobileNavbar: () => void,
}

const MobileNavbar: FC<MobileNavbarProps> = ({isOpen, toggleMobileNavbar}) => {
    if (!isOpen) {
        return <div/>
    }
    return (
        <Modal isOpen={isOpen} toggleModal={toggleMobileNavbar} maxWidth="container">
            <div className="flex flex-col justify-center items-center mx-auto h-full">
                <div className="relative z-20 p-4 w-full bg-dark rounded-2xl">
                    <h1 className="flex justify-center items-center my-5 text-2xl">
                        <GiCompass size="2rem" className="mr-3"/>
                        <span className="font-bold">
                            WoolGens
                        </span>
                    </h1>
                    <ul className="grid grid-cols-2 gap-4">
                        <MobileNavbarLink title="Home" link="/" toggleModal={toggleMobileNavbar} />
                        <MobileNavbarLink title="Stats" link="/stats" toggleModal={toggleMobileNavbar} />
                        <MobileNavbarLink title="Lands" link="/stats/lands" toggleModal={toggleMobileNavbar} />
                        <MobileNavbarLink title="Vote" link="/vote" toggleModal={toggleMobileNavbar} />
                    </ul>
                </div>
            </div>
        </Modal>
    )
}

export default MobileNavbar
