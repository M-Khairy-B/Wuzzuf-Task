import React from "react";
import { Link } from "react-router-dom";

interface Job {
    id: React.Key;
    attributes: {
        title: string;
        name:string
    };
}

interface RelatedJobsProps {
    jobs: Job[];
    baseLink: string;
    title: string;
    itemName: keyof Job["attributes"];
}

const AsideRelated: React.FC<RelatedJobsProps> = ({
    jobs,
    baseLink,
    title,
    itemName,
}) => {
    return (
        <div className="aside-related-jobs">
            <div className="title-aside">
                <h2>{title}</h2>
            </div>
            <div className="lists-related-jobs">
                <ul className="lists">
                    {jobs?.map((job) => (
                        <Link to={`${baseLink}/${job?.id}`} key={job?.id}>
                            <li>{job?.attributes[itemName]}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AsideRelated;
