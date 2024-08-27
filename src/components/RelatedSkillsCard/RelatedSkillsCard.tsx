import React from "react";
import { Link } from "react-router-dom";
import { useGetSkillByIdQuery } from "../Skill/skillApiSlice";

interface RelatedSkillsCardProps {
    allSkills: string | undefined;
}

const RelatedSkillsCard: React.FC<RelatedSkillsCardProps> = ({ allSkills }) => {
    const { data } = useGetSkillByIdQuery(allSkills);

    return (
        <div className="related-card" >
            <div className="title-related">
                <Link to={`/skill/${data?.id}`}>
                    <h4>{data?.attributes?.name}</h4>
                </Link>
            </div>

            <div className="skill-level">
                <span className="level">
                    Type: 
                    <span className="skill"> { data?.attributes?.type}</span>
                </span>
                <span className="level">
                    Importance:
                    <span className="skill"> {data?.attributes?.importance}</span>
                </span>
                <span className="level">
                    Level:
                    <span className="skill"> {data?.attributes?.level}</span>
                </span>
            </div>
        </div>
    );
};

export default RelatedSkillsCard;
