import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function Info({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infotitle" color="textSecondary" gutterBottom>
                    <h3 style={{color:"navy"}}><b>{title}</b></h3>
                </Typography>

                <h2 className="infoBox_cases">{cases}</h2><br/>

                <Typography className="infoBox_total" color="textSecondary">
                <h4 style={{color:"brown"}}>Total = {total}</h4>
                </Typography>
            </CardContent>
        </Card>
    )
};
export default Info
