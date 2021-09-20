import React from 'react';
import { Icon } from '@iconify/react';
import { LocationIcon } from "@iconify/icons-mdi/fire-alert";

const Marker = ({ lat, lng, onClick }) => {
    return (
        <div className="marker" onClick={onClick}>
            <Icon icon={LocationIcon} className="icon" />
        </div>
    )
}
export default Marker;
