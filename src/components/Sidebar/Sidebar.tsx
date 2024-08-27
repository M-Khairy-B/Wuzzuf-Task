import React from "react";
import { Link } from "react-router-dom";
import { useGetSkillByIdQuery } from "../Skill/skillApiSlice";

const Sidebar: React.FC<{ allSkillsId: string }> = ({ allSkillsId }) => {
    
    const { data } = useGetSkillByIdQuery(allSkillsId);
    
        
    return (
                <ul className="lists">
                        <Link to={`/skill/${data?.id}`} key={data?.id}>
                            <li>{data?.attributes?.name}</li>
                        </Link>
                </ul>
    );
};

export default Sidebar;
