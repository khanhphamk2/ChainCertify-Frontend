import React from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';

export default function PendingRequests() {
  // Giả sử bạn có một mảng requests chứa thông tin của các request đang chờ
  const requests = [
    {
      id: 1,
      type: 'Issue',
      holder: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
      certificate: '0x59d18B315ac0fE0C5Ed1e256D34E043fc2b1ED19',
      requestAt: '2023-02-04 22:00:00',
    },
    {
      id: 2,
      type: 'Revoke',
      holder: '0xC3Dae2012Fa50441102491c45dF4ad732bEaEb9f',
      certificate: '0xD533a949740bb3306d119CC777fa900bA034cd52',
      requestAt: '2023-02-04 22:00:00',
    },
    {
      id: 3,
      type: 'Verify',
      holder: '0xC3Dae2012Fa50441102491c45dF4ad732bEaEb9f',
      certificate: '0x59d18B315ac0fE0C5Ed1e256D34E043fc2b1ED19',
      requestAt: '2023-02-04 22:00:00',
    },
    {
      id: 4,
      type: 'Share',
      holder: '0x28C6c06298d514Db089934071355E5743bf21d60',
      certificate: '0xD533a949740bb3306d119CC777fa900bA034cd52',
      requestAt: '2023-02-04 22:00:00',
    },
  ];

  return (
    <div className="flex flex-col justify-center w-1/2">
      <Typography variant="h3" className="text-center m-5">
        Pending Requests
      </Typography>
      <div className="flex flex-col gap-5">
        {requests.map((request) => (
          <Card key={request.id} className="p-5">
            <div className="flex gap-2">
              <p className="text-sm text-white p-1 px-3 font-semibold mb-2 rounded-full bg-gray-800 w-20 text-center">
                {request.type}
              </p>

              {request.type === 'Issue' ? null : (
                <p className="text-sm text-white p-1 px-3 font-semibold mb-2 rounded-full bg-blue-800 w-auto text-center">
                  {request.certificate}{' '}
                  <i className="fas fa-copy cursor-pointer ml-1" />
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <p className="text-black text-sm ml-1">
                Holder:{' '}
                <span className="text-gray-500 mr-1">{request.holder}</span>
                <i className="fas fa-copy text-gray-500" />
              </p>
              <p className="text-black text-sm ml-1">
                Request at:{' '}
                <span className="text-gray-500 mr-1">{request.requestAt}</span>
              </p>
            </div>
            <div className="flex justify-end">
              <Button variant="text" color="black" className="p-2">
                <i className="fas fa-eye" /> Detail
              </Button>
              <Button variant="text" color="green" className="p-2">
                <i className="fas fa-check" /> Process
              </Button>
              <Button variant="text" color="red" className="p-2">
                <i className="fas fa-remove" /> Decline
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
