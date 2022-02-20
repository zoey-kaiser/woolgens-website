import {FC} from "react";
import Image from "next/image"
import background from "../../public/background/mine_inside.jpeg"
import Bust from "../common/Bust";
import SkillsBadge from "./skills/SkillsBadge";
import {getHighestSkill, getLevelProgressPercentage, SKILL_TITLES} from "../../core/skills";
import {BsPatchCheckFill} from "react-icons/bs"
import Tooltip from "react-simple-tooltip"

declare interface ProfileUserBoxProps {
    user: User
    seasonNumber: string
}

const ProfileUserBox: FC<ProfileUserBoxProps> = ({user, seasonNumber}) => {

    if (!user) {
        return (
            <div className="p-4 w-full bg-dark-light rounded-md animate-pulse">
                <div className="w-full h-52 bg-dark rounded-lg animate-pulse" />
            </div>
        )
    }

    const highestSkill = getHighestSkill(user.minecraftUser.seasons[seasonNumber].skills)

    return (
        <div className="p-4 w-full bg-dark-light rounded-lg">
            <div className="overflow-hidden relative rounded-lg h-[200px]">
                <Image className="invisible lg:visible" src={background} alt="profile background" />
                <div className="absolute top-0 w-full h-full bg-gradient-to-l to-gray-500/60 from-green-900/50" />
                <div className="absolute top-1/2 right-1 md:right-10 mt-1 -translate-y-1/2">
                    <SkillsBadge skill={highestSkill} />
                </div>
                <div className="md:hidden absolute top-0 w-full h-full bg-gradient-to-r to-accent-200/70 from-accent-500/50" />
                <div className="flex absolute bottom-0 lg:-bottom-2 2xl:bottom-0 left-0 items-center px-8 pt-4 w-full h-full">
                    <div className="hidden lg:block">
                        <Bust uuid={user.minecraftUser.uuid} size={225} />
                    </div>
                    <div className="w-full">
                        <span className="text-md">
                            {user.webUser?.group.name || SKILL_TITLES[highestSkill]}
                        </span>
                        <h1 className="flex items-center text-3xl sm:text-5xl font-bold">
                            {user.minecraftUser.name}
                            {user.webUser?.group.isStaff  && (
                                <span className="ml-3 text-sm font-light text-green-600">
                                    <Tooltip
                                        content="Staff"
                                        radius="7"
                                        padding="8"
                                        background="#24262d"
                                        border="#24262d"
                                    >
                                        <span className="absolute top-1/3 left-1/3 w-2 h-2 bg-white" />
                                        <BsPatchCheckFill className="relative text-2xl" />
                                    </Tooltip>
                                </span>
                            )}
                        </h1>
                        <div className="overflow-hidden relative mt-2 w-full sm:w-80 rounded-full bg-dark-light/50">
                            <div className="absolute py-0.5 pl-4 w-full h-full text-sm leading-none text-gray-100 bg-green-500 rounded-l-full"
                                style={{width: `${getLevelProgressPercentage(user.minecraftUser.seasons[seasonNumber].level, user.minecraftUser.seasons[seasonNumber].exp)}%`}} />
                            <p className="relative z-10 pt-1 pb-0.5 ml-2 leading-none">
                                Level {user.minecraftUser.seasons[seasonNumber].level}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserBox
