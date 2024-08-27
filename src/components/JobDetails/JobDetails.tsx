import RelatedSkillsCard from "../RelatedSkillsCard/RelatedSkillsCard";
import { useGetJobByIdQuery } from "./JobDetailsApi";
import { useParams } from "react-router-dom";
import AsideRelated from "../AsideRelatedJobs/AsideRelated";
import { useGetJobsListQuery } from "../AllJobs/jobsApiSlice";
import ClipLoader from "react-spinners/ClipLoader"; 
import { Helmet } from "react-helmet";

export default function JobDetails() {
    const { id } = useParams();
    const { data: jobData, isLoading: isJobLoading } = useGetJobByIdQuery(id);
    const { data: allJob, isLoading: isAllJobLoading } = useGetJobsListQuery({
        cursor: 0,
        limit: 32,
    });

    const skills = jobData?.relationships?.skills || [];

    if (isJobLoading || isAllJobLoading) {
        return (
            <div className="spinner-container-main">
                <ClipLoader color="#3498db" loading={isJobLoading || isAllJobLoading} size={50} />
            </div>
        );
    }

    return (<>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Job</title>
            </Helmet>
        <section className="job-details">
            <div className="job-title">
                <h2>{jobData?.attributes.title}</h2>
            </div>
            <div className="job-description">
                <div className="description">
                    <h3>Related Skills:</h3>
                    {skills.length > 0 ? (
                        skills.map((skill: any) => (
                            <RelatedSkillsCard
                                key={skill.id}
                                allSkills={skill?.id || ""}
                            />
                        ))
                    ) : (
                        <p>No related skills found.</p>
                    )}
                </div>
                <AsideRelated jobs={allJob} baseLink="/job" title={"Related Jobs:"} itemName={"title"}/>
            </div>
        </section>
        </>

    );
}
