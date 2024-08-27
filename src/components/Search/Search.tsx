import { useState } from "react";
import SearchInput from "../SearchInput/SearchInput";
import AllJobsSearch from "../AllJobsSearch/AllJobsSearch";
import { Job } from "../../Model/types";
import { Helmet } from "react-helmet";
import { useLocation } from 'react-router-dom';

export default function Search() {
    const [searchData, setSearchData] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearchDataUpdate = (data: Job[], term: string) => {
        setSearchData(data);
        setSearchTerm(term);
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryValue = queryParams.get('query');
    
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Search</title>
            </Helmet>
            <SearchInput setSearchData={handleSearchDataUpdate}  queryValue={queryValue?.toLowerCase()}/>
            <AllJobsSearch searchData={searchData} searchTerm={searchTerm} value={queryValue}/>
        </>
    );
}
