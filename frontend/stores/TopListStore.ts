import {makeAutoObservable, runInAction} from "mobx";
import {fetchUsersSorted} from "../core/user/minecraftUser";

class TopListStore {

    simpleTopLists: Record<string, MinecraftUser[]> = {}
    fullTopLists: Record<string, MinecraftUser[]> = {}

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async getSimpleTopList(key: string, sorted: string) {
        if (this.simpleTopLists[key]) {
            return this.simpleTopLists[key]
        }

        const topList = await fetchUsersSorted(sorted, 0, 5)
        runInAction(() => {
            this.simpleTopLists[key] = topList
        })
        return topList
    }

    async getFullTopList(key: string, sorted: string) {
        return await fetchUsersSorted(sorted, 0, 100)
    }
}

const topListStore = new TopListStore()
export default topListStore
