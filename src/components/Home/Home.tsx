import { useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import AllJobs from "../AllJobs/AllJobs";
import { Job } from "../../Model/types";
import { Helmet } from "react-helmet";

export default function Home() {
    const [, setSearchData] = useState<Job[]>([]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Wuzzuf</title>
            </Helmet>
            <SearchInput setSearchData={setSearchData} />
            <AllJobs />
        </>
    );
}
