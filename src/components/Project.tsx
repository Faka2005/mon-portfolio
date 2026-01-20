import React from "react";
import { useParams } from "react-router-dom";
import ProjectZigbee from "./ProjectIOT/ProjectZigbee";
import ProjectDetails from "./ProjectDetailWeb";
import ProjectXbee from "./ProjectIOT/ProjectXbee";
import ProjectChronometre from "./ProjectIOT/ProjectChrono";
import ProjectXbeeLCD from "./ProjectIOT/ProjectLCD";

const Projects: React.FC = () => {
  // récupère le paramètre de la route : /projects/:type
  const { name } = useParams<{ name: string }>();
  const { categorie } = useParams<{ categorie: string }>();

    if(categorie === 'web')return <ProjectDetails/>;
    switch (name) {
        case 'zigbee-home-assistant':
            return <ProjectZigbee />;
        case 'xbee-lora-communication':
            return <ProjectXbee/>;
        case 'xbee-lcd':
            return <ProjectXbeeLCD/>;
        case 'chronometre-arduino-multiplexage':
            return <ProjectChronometre/>;
        default:
            break;
    }
  
};

export default Projects;