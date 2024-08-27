import { useGetSkillQuery } from "./SkillDetailsApi";
import { useParams } from "react-router-dom";
import { useGetJobsListQuery } from "../AllJobs/jobsApiSlice";
import RelatedJobsSkill from "../RelatedJobsSkill/RelatedJobsSkill";
import Sidebar from "../Sidebar/Sidebar";
import { ClipLoader } from "react-spinners";
export default function SkillDetails() {
    const { id } = useParams();
    const { data: skillData, isLoading: isSkillLoading } = useGetSkillQuery(id);
    const { data: allJob, isLoading: isAllJobLoading } = useGetJobsListQuery({
        cursor: 0,
        limit: 32,
    });
    // console.log("skillData" , skillData);
    const relatedJobs = Array.isArray(allJob)
        ? allJob.filter((job) =>
              job.relationships.skills.find(
                  (skill: { id: string | undefined }) => skill.id === id
              )
          )
        : [];
    const skills = skillData?.relationships?.skills || [];
    // console.log(skills);

    if (isSkillLoading || isAllJobLoading) {
        return (
            <div className="spinner-container-main">
                <ClipLoader
                    color="#3498db"
                    loading={isSkillLoading || isAllJobLoading}
                    size={50}
                />
            </div>
        );
    }
    return (
        <>
            <section className="skill-details">
                <div className="skill-title">
                    <h2>{skillData?.attributes?.name}</h2>
                </div>
                <div className="skill-description">
                    <div className="description">
                        <div className="title-description">
                            <h3>Description:</h3>
                            <p>
                                knowledge of principles and methods for moving
                                people or goods by air, rail, sea, or road,
                                <br /> including the relative costs and
                                benefits.
                            </p>
                        </div>
                        <div className="related-jobs-main">
                            <h4>Related Jobs:</h4>
                        </div>
                        {relatedJobs.map((jobRealted) => (
                            <RelatedJobsSkill
                                jobRelated={jobRealted}
                                key={jobRealted.id}
                            />
                        ))}
                    </div>
                    <div className="aside-related-jobs">
                        <div className="title-aside">
                            <h2>Related Skills:</h2>
                        </div>
                        <div className="lists-related-jobs">
                            {skills.length > 0 ? (
                                skills.map((skill: any) => (
                                    <Sidebar
                                        allSkillsId={skill.id}
                                        key={skill.id}
                                    />
                                ))
                            ) : (
                                <p>No related skills found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
