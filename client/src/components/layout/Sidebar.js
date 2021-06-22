import React from 'react';

import NewProject from '../projects/NewProject';
import ProjectList from '../projects/ProjectList.js';

const Sidebar = () => {
    return (
        <aside>
            <h1>Projects<span>Maker</span></h1>
            <NewProject />
            <div className="projects">
                <h2>Your Projects</h2>
                <ProjectList />
            </div>
        </aside>
    );
};

export default Sidebar;