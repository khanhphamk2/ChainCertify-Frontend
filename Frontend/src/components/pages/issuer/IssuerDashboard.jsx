import React from 'react';
import HomeCard from '../../home/display/HomeCard';
import { Typography } from '@material-tailwind/react';

const introduction = [
  {
    id: 0,
    title: 'Issue Certificates',
    description:
      'Send your certificates to issuer to verify and commit it to blockchain',
    button: 'Issue',
    plug: 'issue',
  },
  {
    id: 1,
    title: 'Revoke Certificates',
    description:
      'Send revocation request to issuer to verify and execute revocation process',
    button: 'Revoke',
    plug: 'revoke',
  },
  {
    id: 2,
    title: 'Pending Requests',
    description: 'Manage all your pending requests from holders',
    button: 'View',
    plug: 'requests',
  },
  {
    id: 3,
    title: 'Issuers',
    description: 'View all issuers in the system and their activity history',
    button: 'Detail',
    plug: 'issuers',
  },
];

function IssuerDashboard() {
  return (
    <div className="flex flex-col justify-center w-3/5">
      <div className="flex flex-col text-center my-6">
        <Typography variant="h1">Hello, Issuer!</Typography>
      </div>
      <div className="flex flex-wrap justify-center">
        {introduction.map((instance) => (
          <HomeCard
            className="mx-3"
            title={instance.title}
            description={instance.description}
            button={instance.button === 'View' ? 'View (5)' : instance.button}
            plug={instance.plug}
          />
        ))}
      </div>
    </div>
  );
}

export default IssuerDashboard;
