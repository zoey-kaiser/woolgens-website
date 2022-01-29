import {observer} from "mobx-react-lite";
import NavbarLayout from "../../layout/NavbarLayout";
import React, {useEffect, useState} from "react";
import StatsUserSearchBar from "../../components/stats/searchbar/StatsUserSearchBar";
import TopList from "../../components/stats/TopList";
import Announcement from "../../components/common/Announcement";
import {BaseButton} from "../../components/common/BaseButton";
import {IoMdTrophy} from "react-icons/io"
import {AiOutlineArrowRight} from "react-icons/ai"
import topListStore from "../../stores/TopListStore";
import TopListRow from "../../components/stats/TopListRow";
import LoadingTopList from "../../components/stats/LoadingTopList";

const demoUserNames = [{
    id: 0,
    name: "tsuuukiii",
    type: "player",
}, {
    id: 1,
    name: "ReaperMaga",
    type: "player"
}, {
    id: 3,
    name: "MyLand",
    type: "land"
}]

const StatsIndexPage = observer(() => {
    const [levelTopList, setLevelTopList] = useState(undefined)
    const [balanceTopList, setBalanceTopList] = useState(undefined)
    const [playTimeTopList, setPlayTimeTopList] = useState(undefined)
    const [autocompleteList, setAutocompleteList] = useState(undefined)

    useEffect(() => {
        topListStore.getSimpleTopList("level", `seasons.1.level`).then((result) => {
            setLevelTopList(result)
        })
        topListStore.getSimpleTopList("balance", `seasons.1.balance`).then((result) => {
            setBalanceTopList(result)
        })
        topListStore.getSimpleTopList("playTime", `stats.playtime`).then((result) => {
            setPlayTimeTopList(result)
        })
    }, [])

    return (
        <NavbarLayout>
            <div className="my-8 text-center">
                <div className="py-4">
                    <h1 className="text-4xl font-bold">
                        Player and Land Stats
                    </h1>
                </div>
                <StatsUserSearchBar items={demoUserNames}/>
            </div>
            <div className="hidden lg:block">
                <Announcement
                    icon={<IoMdTrophy/>}
                    text="You are currently viewing the player Top Lists! Check out our land Top Lists!"
                    rightComponent={
                        <BaseButton type="primary">
                        <span className="flex items-center">
                            To the Land Top Lists
                            <AiOutlineArrowRight className="ml-2"/>
                        </span>
                        </BaseButton>
                    }
                    iconStyles="bg-blue-500 text-white"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-6">
                <TopList title="Level" background={"bg-gradient-to-r from-green-500/80 to-green-900/80"}>
                    {levelTopList ? (
                        <div>
                            {levelTopList.map((user, index) =>
                                <TopListRow
                                    key={index}
                                    minecraftUser={user}
                                    value={user.seasons["1"].level}
                                    place={index + 1}
                                />
                            )}
                        </div>
                    ) : <LoadingTopList />}
                </TopList>
                <TopList title="Money" background={"bg-gradient-to-l from-amber-400/80 to-yellow-700/80"}>
                    {balanceTopList ? (
                        <div>
                            {balanceTopList.map((user, index) =>
                                <TopListRow
                                    key={index}
                                    minecraftUser={user}
                                    value={user.seasons["1"].balance}
                                    label="$"
                                    place={index + 1}
                                />
                            )}
                        </div>
                    ) : <LoadingTopList />}
                </TopList>
                <TopList title="Playtime" background={"bg-gradient-to-l from-purple-400/80 to-purple-700/80"}>
                    {playTimeTopList ? (
                        <div>
                            {playTimeTopList.map((user: MinecraftUser, index) =>
                                <TopListRow
                                    key={index}
                                    minecraftUser={user}
                                    value={(user.stats.playtime / 1000 / 60 / 60).toFixed(1)}
                                    label="Hours"
                                    place={index + 1}
                                />
                            )}
                        </div>
                    ) : <LoadingTopList />}
                </TopList>
            </div>
        </NavbarLayout>
    )
})

export default StatsIndexPage
