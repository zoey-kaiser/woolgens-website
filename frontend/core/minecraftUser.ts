import {minecraftUserAPI} from "./api";
import landStore from "../stores/LandStore";
import {throwError} from "./error";

async function enrichMinecraftUserWithLand(minecraftUser: MinecraftInitialUser): Promise<MinecraftUser> {
    let landData = undefined
    if (minecraftUser.land !== "") {
        landData = {
            ...await landStore.getLand(minecraftUser.land)
        }
    }
    return {
        ...minecraftUser,
        land: landData
    }
}

export async function getMinecraftUser(uuid: string): Promise<MinecraftUser> {
    try {
        const data = await minecraftUserAPI.get(`/users/${uuid}`)
        return await enrichMinecraftUserWithLand(data.data);
    } catch (error) {
        throwError(`Issue retrieving Minecraft User for uuid "${uuid}" - ${error}`)
        return;
    }
}

export async function getUsersSorted(sorted: string, pageIndex: number, pageSize: number): Promise<MinecraftUser[]> {
    try {
        const data = await minecraftUserAPI.get(`/users?sorted=${sorted}&pageindex=${pageIndex}&pagesize=${pageSize}`)
        return data.data
    } catch (error) {
        throwError(`Issue retrieved user sorted by "${sorted}" from page ${pageIndex} with ${pageSize} entries" - ${error}`)
        return;
    }
}

export async function getUserNames() {
    try {
        const data = await minecraftUserAPI.get(`/users?small=true`)
        return data.data
    } catch (error) {
        throwError(`Issue retrieved all usernames" - ${error}`)
        return;
    }
}

export function getLatestSeasonStats(user: MinecraftUser): MinecraftUserSeason {
    const latestSeason = Object.keys(user.seasons).reverse()[0]
    return user.seasons[latestSeason]
}
