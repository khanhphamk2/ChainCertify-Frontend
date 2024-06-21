import React from 'react';
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardHeader,
} from '@material-tailwind/react';

export default function IssuersList() {
  const issuers = [
    {
      id: 1,
      name: 'John Doe',
      address: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
      joinedAt: '2023-02-04 22:00:00',
      issue: 3,
      revoke: 2,
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '0xC3Dae2012Fa50441102491c45dF4ad732bEaEb9f',
      joinedAt: '2023-02-04 22:00:00',
      issue: 10,
      revoke: 4,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      address: '0xC3Dae2012Fa50441102491c45dF4ad732bEaEb9f',
      joinedAt: '2023-02-04 22:00:00',
      issue: 5,
      revoke: 1,
    },
    {
      id: 4,
      name: 'Bob Brown',
      address: '0x28C6c06298d514Db089934071355E5743bf21d60',
      joinedAt: '2023-02-04 22:00:00',
      issue: 2,
      revoke: 0,
    },
  ];

  return (
    <div>
      <div>
        <Typography variant="h3" className="mt-10">
          Authorized issuers
        </Typography>
      </div>
      {issuers.map((issuer) => (
        <Card key={issuer.id} className="px-5 py-3 my-3 pb-5">
          <div>
            <p className="flex gap-2">
              {' '}
              <Typography color="gray">
                Name: <span className="font-bold">{issuer.name}</span>
              </Typography>
            </p>
            <p className="flex gap-2">
              {' '}
              <Typography color="gray">
                Address:{' '}
                <span className="font-bold">
                  <a href={`https://etherscan.io/address/${issuer.address}`}>
                    {issuer.address}
                  </a>
                </span>
              </Typography>
            </p>
            <p className="flex gap-2">
              {' '}
              <Typography color="gray">
                Name: <span className="font-bold">{issuer.joinedAt}</span>
              </Typography>
            </p>
            <div className="flex flex-row gap-1 mt-1">
              <p className="rounded-full bg-blue-700 w-auto text-white px-2 py-1">
                Issue: {issuer.issue}
              </p>
              <p className="rounded-full bg-blue-700 w-auto text-white px-2 py-1">
                Revoke: {issuer.revoke}
              </p>
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-3">
            <Button
              color="lightBlue"
              buttonType="filled"
              size="small"
              ripple="light"
              onClick={() => {
                // Code to view recent activities
              }}
            >
              View Recent Activities
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
