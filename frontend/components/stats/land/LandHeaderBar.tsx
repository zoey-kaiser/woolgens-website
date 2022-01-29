import {FC} from "react";
import Image from "next/image";
import background from "../../../public/background/mine_day.png";
import Bust from "../../common/Bust";

declare interface LandHeaderBarProps {
    land?: Land
}

const LandHeaderBar: FC<LandHeaderBarProps>= ({land}) => {

    if (!land) {
        return (
            <div className="p-4 w-full bg-dark-light rounded-md animate-pulse">
                <div className="w-full bg-dark rounded-lg animate-pulse h-[300px]" />
            </div>
        )
    }

    return (
        <div className="p-4 w-full bg-dark-light rounded-lg select-none">
            <div className="overflow-hidden relative rounded-lg h-[300px]">
                <Image src={background} alt="profile background" />
                <div className="absolute top-0 w-full h-full bg-gradient-to-r from-accent-200/70 via-accent-500/90 to-accent-200/70" />
                <div className="flex absolute top-0 justify-center items-center w-full">
                    <h1 className="mt-2 font-bold leading-none uppercase text-[9rem] text-shadow">
                        {land.name}
                    </h1>
                </div>
                <div className="flex absolute -bottom-2 left-0 gap-2 justify-center items-baseline px-8 w-full">
                    <div className="w-[175px]">
                        {land.orderedMembers[2] && (
                            <Bust uuid={land.orderedMembers[2].uuid} size={175} />
                        )}
                    </div>
                    <div className="w-[190px]">
                        {land.orderedMembers[0] && (
                            <Bust uuid={land.orderedMembers[0].uuid} size={190} />
                        )}
                    </div>
                    <Bust uuid={land.owner.uuid} size={200} facing="forward" />
                    <div className="w-[190px]">
                        {land.orderedMembers[1] && (
                            <Bust uuid={land.orderedMembers[1].uuid} size={190} facing="left" />
                        )}
                    </div>
                    <div className="w-[175px]">
                        {land.orderedMembers[3] && (
                            <Bust uuid={land.orderedMembers[3].uuid} size={175} facing="left" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandHeaderBar