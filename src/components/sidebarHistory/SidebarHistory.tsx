import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

interface SidebarHistoryProps {
    histories?: string[] | null | undefined ; 
    baseLink: string;   
    title: string;      
}

const SidebarHistory: React.FC<SidebarHistoryProps> = ({
    histories=[],
    title,
}) => {
    const navigate = useNavigate();

const historyLink = (value: string)=>{

    navigate({
        pathname: "/jobs/search/",
        search: `?${createSearchParams({
            query:value,
        })}`,
    });    
}

    return (
        <div className="aside-related-jobs">
            <div className="title-aside">
                <h2>{title}</h2>
            </div>
            <div className="lists-related-jobs">
                <ul className="lists">
                    {histories?.map((history, index) => (
                            <li key={index} onClick={()=>{
                                historyLink(history)
                            }}>{history}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SidebarHistory;
