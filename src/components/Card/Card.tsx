import { Link } from "react-router-dom";
import { Job } from "../../Model/types";
import SkillTag from "../Skill/SkillTag";


type Iprops = {
    job: Job;
}

const Card: React.FC<Iprops> = ({job}) => {
        return (
            <div className="main-card">
                <div className="card">
                    <div className="title-card">
                        <h3>{job.attributes.title}</h3>
                    </div>
                    <div className="related-skills">
                        <h4>Related Skills:</h4>
                        <div className="related-skills-main">
                            {job.relationships.skills.map((skill: any) => (
                                <SkillTag key={skill.id} skillId={skill.id} />
                            ))}
                        </div>
                    </div>
                    <div className="view-details">
                        <Link to={`/job/${job.id}`} className="view-details-link">
                            View Job details
                        </Link>
                    </div>
                </div>
            </div>
        );
};

export default Card;

