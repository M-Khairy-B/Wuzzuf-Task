import React from "react";
import { Link } from "react-router-dom";

interface Job {
    id: string;
    attributes: {
        title: string;
    };
}

interface RelatedSkillsCardProps {
    jobRelated: Job;
}

const RelatedJobsSkill: React.FC<RelatedSkillsCardProps> = ({ jobRelated }) => {
    
    return (
        <div className="related-card">
            <div className="title-related">
                <Link to={`/job/${jobRelated?.id}`}>
                    <h4>{jobRelated?.attributes?.title}</h4>
                </Link>
            </div>
            <div className="skill-level">
                <span className="level">
                    Importance: 
                    <span className="skill"> 3.7</span>
                </span>
                <span className="level">
                    Level: 
                    <span className="skill"> 2.3</span>
                </span>
            </div>
        </div>
    );
};

export default RelatedJobsSkill;
