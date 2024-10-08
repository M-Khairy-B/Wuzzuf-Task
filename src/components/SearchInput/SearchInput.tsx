import { useEffect, useState } from "react";
import { useSearchJobQuery } from "./SearchApi";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Job } from "../../Model/types";

interface SearchInputProps {
    setSearchData: (data: Job[], term: string) => void;
    queryValue?: string;
}
export default function SearchInput({
    setSearchData,
    queryValue,
}: SearchInputProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [debouncedTitle, setDebouncedTitle] = useState(title);
    const { data: searchData } = useSearchJobQuery(debouncedTitle, {
        skip: debouncedTitle.length < 3,
    });
    useEffect(() => {
        if (title === queryValue) {
            setShowDropdown(false);
        } else {
            setShowDropdown(true);
        }
        const handler = setTimeout(() => {
            setDebouncedTitle(title);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [title]);

    useEffect(() => {
        setSearchData(searchData, debouncedTitle);
    }, [searchData, debouncedTitle]);

    useEffect(() => {
        if (queryValue) {
            setTitle(queryValue);
            setShowDropdown(true);
        }
    }, [queryValue]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.toLowerCase();
        setTitle(newValue);
        
        if (newValue === "") {
            if (location.pathname === "/") {
                return;
            }
                navigate({
                pathname: "/jobs/search/",
                search: "",
            });
            setSearchData([], "");
            setShowDropdown(false);
        }
    };

    const handleJobClick = (item: any) => {
        navigate({
            pathname: "/jobs/search/",
            search: `?${createSearchParams({
                query: item.attributes.title,
            })}`,
        });
        let currentHistory: string[] = [];
        currentHistory = JSON.parse(
            localStorage.getItem("searchHistory") || "[]"
        );
        if (!Array.isArray(currentHistory)) {
            currentHistory = [];
        }
        const updatedHistory = [
            ...new Set([...currentHistory, item.attributes.title]),
        ];
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        setTitle(item.attributes.title.toLowerCase());
        setShowDropdown(false);
    };

    return (
        <section className="search">
            <div className="search-input">
                <div className="search-input-main">
                    <div className="custom-input">
                        <input
                            className="custom-input-main"
                            type="text"
                            placeholder="search keyword"
                            value={title}
                            onChange={handleChange}
                        />
                        <svg
                            className="search-icon"
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.0114 17.6101H18.7467L18.2985 17.1778C19.8674 15.3528 20.8119 12.9834 20.8119 10.4059C20.8119 4.65866 16.1532 0 10.4059 0C4.65866 0 0 4.65866 0 10.4059C0 16.1532 4.65866 20.8119 10.4059 20.8119C12.9834 20.8119 15.3528 19.8674 17.1778 18.2985L17.6101 18.7467V20.0114L25.6146 28L28 25.6146L20.0114 17.6101ZM10.4059 17.6101C6.41967 17.6101 3.20183 14.3922 3.20183 10.4059C3.20183 6.41967 6.41967 3.20183 10.4059 3.20183C14.3922 3.20183 17.6101 6.41967 17.6101 10.4059C17.6101 14.3922 14.3922 17.6101 10.4059 17.6101Z"
                                fill="#808080"
                            />
                        </svg>
                    </div>
                    {title.length >= 3 && (
                        <div
                            className={`dropdown-list ${
                                !showDropdown && "hidden"
                            }`}
                        >
                            {searchData?.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="dropdown-item"
                                    onClick={() => handleJobClick(item)}
                                >
                                    {item?.attributes?.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
