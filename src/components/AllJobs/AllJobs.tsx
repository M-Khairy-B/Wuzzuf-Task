import Card from "../Card/Card";
import { useGetJobsListQuery } from "./jobsApiSlice";
import { Job } from "../../Model/types";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
export default function AllJobs() {
    const [limit, setLimit] = useState(12);
    
    const { data, isLoading, isFetching, isSuccess } =
        useGetJobsListQuery({
            cursor: 0,
            limit: limit,
            
        });
const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && !isFetching) {
        setLimit((prevPage) => prevPage + 12);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);


  if (isLoading ) {
    return (
        <div className="spinner-container-main">
            <ClipLoader
                color="#3498db"
                loading={isLoading}
                size={50}
            />
        </div>
    );
}

    return (
        <section className="all-jobs">
            <div className="main-container">
                <div className="title-all-jobs">
                    <h2>All Jobs ({data?.length})</h2>
                </div>

                <div className="row">
                {isSuccess && data?.length ? (
                        data.map((job: Job) => (
                            <div className="col-main" key={job.id}>
                                <Card job={job} />
                            </div>
                        ))
                    ) : (
                        <p className="no-job">No jobs available</p>
                    )}
                </div>
            </div>
        </section>
    );
}
