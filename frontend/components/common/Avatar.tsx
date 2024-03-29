import Image from "next/image";

declare interface AvatarProps {
    player: string,
    size: number
}

const Avatar = ({player, size}: AvatarProps) => {
    return (
        <div className="overflow-hidden relative rounded" style={{width: size, height: size}}>
            <div className="absolute top-0 w-full h-full bg-dark animate-pulse" />
            <Image height={size} width={size} className="rounded" src={`https://minotar.net/helm/${player}/${size}.png`} alt={`${player}'s avatar`} />
        </div>
    )
}

export default Avatar
