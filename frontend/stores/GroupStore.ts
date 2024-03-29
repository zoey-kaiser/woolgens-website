import {makeAutoObservable, runInAction} from "mobx";
import {fetchAllGroups} from "../core/user/group";

class GroupStore {

    groups: Record<string, Group> = {}

    constructor() {
        makeAutoObservable(this)
    }

    async getGroup(groupName: string) {
        if (Object.keys(this.groups).length === 0) {
            await this.fetchGroups()
        }

        if (this.groups[groupName]) {
            return this.groups[groupName]
        }
        return undefined
    }

    async fetchGroups(): Promise<Record<string, Group>> {
        const groups = await fetchAllGroups()
        runInAction(() => {
            this.groups = groups
        })
        return groups
    }
}

const groupStore = new GroupStore()
export default groupStore
