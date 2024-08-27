import { useEffect, useState } from "react";
import { Job } from "../../Model/types";
import { useGetJobsListQuery } from "../AllJobs/jobsApiSlice";
import Card from "../Card/Card";
import SidebarHistory from "../sidebarHistory/sidebarHistory";
import { ClipLoader } from "react-spinners";
interface AllJobsSearchProps {
    searchData: Job[];
    searchTerm: string;
    value:any
}
export default function AllJobsSearch({
    value,
    searchData,
    searchTerm,
}: AllJobsSearchProps) {
    const [dataHistory, setDataHistory] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const storedData = localStorage.getItem("searchHistory");

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setDataHistory(parsedData);
        }
    }, []);
    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500); 
    };
    useEffect(() => {
        if (searchTerm.length > 2) {
            handleSearch();
        }
    }, [searchTerm]);


    const {
        data: allJob
    } = useGetJobsListQuery({
        cursor: 0,
        limit: 32,
    });
    const jobsToDisplay = searchTerm?.length > 2 ? searchData : allJob;


    
    return (
        
        <section className="all-jobs-search">
            <div className="main-container">
                <div className="title-all-jobs">
                    <h2>
                        {searchTerm.length >= 3
                            ? `“${searchTerm}” jobs (${searchData?.length})`
                            : `All Jobs (${allJob ? allJob?.length : 0})`}
                    </h2>
                </div>

                <div className="row">
                    <div className="col-main-job">
                    {loading ? (
                            <div className="spinner-container-main">
                                <ClipLoader color="#000" loading={loading} size={50} />
                            </div>
                        ) : (
                            jobsToDisplay?.length ? (
                                jobsToDisplay.map((job: Job) => (
                                    <div className="col-main" key={job.id}>
                                        <Card job={job} />
                                    </div>
                                ))
                            ) : (
                                <p className="no-job">No jobs available</p>
                            )
                        )}
                    </div>

                    <SidebarHistory
                        histories={dataHistory}
                        baseLink={value}
                        title={"Search history:"}
                    />
                </div>
            </div>
        </section>
    );
}
