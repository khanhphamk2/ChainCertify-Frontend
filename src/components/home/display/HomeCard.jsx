import React from 'react';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

function HomeCard(props) {
  return (
    <div className={`flex justify-center ${props.className}`}>
      <Card className="mt-6" style={{ width: '320px' }}>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {props.title}
          </Typography>
          <Typography>{props.description}</Typography>
        </CardBody>
        <div className="ml-5 mb-5">
          <NavLink to={`/${props.plug}`}>
            <Button>{props.button}</Button>
          </NavLink>
        </div>
      </Card>
    </div>
  );
}

export default HomeCard;
