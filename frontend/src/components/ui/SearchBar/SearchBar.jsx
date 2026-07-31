import { Search } from "lucide-react";

import "./SearchBar.css";

function SearchBar({
    placeholder,
    value,
    onChange
}) {

    return (
        <div className="search-bar">
            <Search
                size={18}
            />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchBar;