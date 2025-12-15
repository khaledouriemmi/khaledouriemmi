import React from 'react';

export default function ProjectFilter({
    categories,
    activeCategory,
    onCategoryChange,
    searchTerm,
    onSearchChange
}) {
    return (
        <div className="project-filter-container">
            <div className="filter-search">
                <div className="search-wrapper">
                    <svg className="search-icon" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="filter-categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => onCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
