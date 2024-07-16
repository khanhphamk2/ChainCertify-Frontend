import React from 'react';
import HomeCard from './display/HomeCard';
import { Typography } from '@material-tailwind/react';

const introduction = [
  {
    id: 0,
    title: 'Certificates',
    description: 'Manage all your certificates and their status',
    button: 'View',
    plug: 'get',
  },
  {
    id: 1,
    title: 'Issuance Request',
    description:
      'Send your certificates to issuer to verify and commit it to blockchain',
    button: 'Issue',
    plug: 'issue-request',
  },
  {
    id: 2,
    title: 'Revocation Request',
    description:
      'Send revocation request to issuer to verify and execute revocation process',
    button: 'Revoke',
    plug: 'revoke-request',
  },
  {
    id: 3,
    title: 'Share',
    description:
      'Share your certificates with another user or view certificates shared by others.',
    button: 'Share',
    plug: 'share',
  },
];

function Home() {
  return (
    <div className="flex flex-col justify-center w-3/5">
      <div className="flex flex-col text-center mt-4">
        <Typography variant="h1">Hello, Holder!</Typography>
      </div>
      <div className="flex flex-wrap justify-center">
        {introduction.map((instance) => (
          <HomeCard
            className="mx-3"
            title={instance.title}
            description={instance.description}
            button={instance.button}
            plug={instance.plug}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
