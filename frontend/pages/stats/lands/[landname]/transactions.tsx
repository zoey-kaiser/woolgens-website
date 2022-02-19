import NavbarLayout from "../../../../layout/NavbarLayout";
import SEO from "../../../../components/SEO";
import {GetServerSideProps} from "next";
import BasicCard from "../../../../components/common/cards/BasicCard";
import BreadCrumbs from "../../../../components/common/BreadCrumbs";
import LandHeaderBar from "../../../../components/stats/land/LandHeaderBar";
import LandGeneralStats from "../../../../components/stats/land/LandGeneralStats";
import {useRouter} from "next/router";
import landStore from "../../../../stores/LandStore";
import Tab from "../../../../components/common/Tab";
import LandTransactions from "../../../../components/stats/land/transactions/LandTransactions";
import authStore from "../../../../stores/AuthStore";
import userStore from "../../../../stores/UserStore";
import {observer} from "mobx-react-lite";

const LandProfile: NextPageWithLayout = observer(({ landname, land }) => {
    const router = useRouter()

    return (
        <div>
            <SEO seo={{
                title: `${landname}`,
                description: "Land",
                imageSRC: `/api/previews/land/${landname}.jpg`}} />
            <div>
                <BasicCard>
                    <BreadCrumbs pathName={router ? router.asPath : ""}/>
                </BasicCard>
                <div className="flex flex-col gap-4 mt-4">
                    <LandHeaderBar land={land}/>
                    <main className="grid grid-cols-1 2xl:grid-cols-4 2xl:gap-x-4 gap-y-4 items-start">
                        <LandGeneralStats land={land}/>
                        <div className="col-span-3">
                            <ul className="flex flex-wrap">
                                <Tab title="Members" link={`/stats/lands/${landname}`} />
                                <Tab title="Transactions" active={true} />
                                {userStore.isUserInLand(landname, authStore.user) && <Tab title="Settings" disabled={true} />}
                            </ul>
                            <LandTransactions transactions={land.bank.transactions} />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
})

export const getServerSideProps: GetServerSideProps = async (context) => {
    const landname = context.params['landname']
    const land = await landStore.getLand(landname);

    return {
        props: {
            landname: landname,
            land: land || null,
        },
        notFound: !land
    }
}

LandProfile.getLayout = function getLayout(page) {
    return (
        <NavbarLayout>
            {page}
        </NavbarLayout>
    )
}

export default LandProfile