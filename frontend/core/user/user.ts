import {getMinecraftUser, fetchUserNames} from "./minecraftUser";
import {getWebUser} from "./webUser";
import {getLiveUser} from "./liveUser";
import {getAuctionUserByUUID} from "../auction";

export async function getUserByUUID(uuid: string): Promise<User> {
    const minecraftUser = await getMinecraftUser(uuid);
    const webUser = await getWebUser(uuid);
    const auctionUser = await getAuctionUserByUUID(uuid);
    const liveUser = await getLiveUser(uuid);

    return {
        name: minecraftUser.name,
        uuid: minecraftUser.uuid,
        minecraftUser,
        webUser,
        auctionUser,
        liveUser
    }
}

export async function getUserByUsername(username): Promise<User> {
    const usernames = await fetchUserNames()
    const uuid = usernames[username]
    return await getUserByUUID(uuid);
}

export function isUserInLand(landName: string, user?: User): boolean {
    if (!user) return false;
    if (!user.minecraftUser.land) return false;

    return user.minecraftUser.land.name.toLowerCase() === landName.toLowerCase();
}
