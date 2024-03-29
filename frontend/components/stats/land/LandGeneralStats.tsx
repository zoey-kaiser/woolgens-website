import StatsCard from "../StatsCard";
import CardWithHeader from "../../common/cards/CardWithHeader";
import {formatMoney} from "../../../core/formatters";

const LandGeneralStats = ({land}: {land: Land}) => {
    if (!land) {
        return <div className="h-44 rounded-md shadow animate-pulse bg-dark-light/50" />
    }

    return (
        <CardWithHeader title="General Stats">
            <div className="flex flex-col gap-4">
                <StatsCard title="Balance" value={formatMoney(land.bank.balance)} label="$" />
                <StatsCard title="Members" value={land.members.length + 1} label="Members" />
                <StatsCard title="Created" value={new Date(land.registered).toDateString()} />
            </div>
        </CardWithHeader>
    )
}

export default LandGeneralStats
