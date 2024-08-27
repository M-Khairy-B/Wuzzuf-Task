import { Link } from "react-router-dom";
import { useGetSkillByIdQuery } from "./skillApiSlice";

type Iprops = {
    skillId: string;
};

const SkillTag: React.FC<Iprops> = ({ skillId }) => {
    const { data, isSuccess } = useGetSkillByIdQuery(skillId);
    // console.log(data);
    return (
        <div>
            <Link to={`/skill/${skillId}`}>
                {isSuccess && data.attributes.name && (
                    <span>{data.attributes.name}</span>
                )}
            </Link>
        </div>
    );
};

export default SkillTag;
