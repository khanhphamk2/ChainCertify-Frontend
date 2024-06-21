import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Input,
  Select,
  Option,
  Textarea,
  Button,
  Spinner,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { useParams, Link, NavLink } from 'react-router-dom';

const TABLE_ROWS = [
  {
    name: 'TOEIC Certificates - 2018',
    address: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c',
    size: '1.2 MB',
    uploadedAt: '2021-09-01',
    from: '0x785Da6a701c568545dCfcB03FcB875f56beacD4',
  },
  {
    name: 'UIT Graduation Certificate',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    size: '1.5 MB',
    uploadedAt: '2023-11-08',
    from: '0x65B38Da6a701c568545dCfcB03FcB875f56beca11',
  },
  {
    name: 'Coursera - UI/UX Design MasterTrack Certificate',
    address: '0x1a2B3c4D5E6F7A8B9c0D1E2F3A4B5C6D7E8F9A0',
    size: '1.8 MB',
    uploadedAt: '2021-20-11',
    from: '0x785Da6a701c568545dCfcB03FcB875f56beacD4',
  },
  {
    name: 'Writing Tools & Hacks Course - Udemy Certificate of Completion',
    address: '0x617F2E2fD72FD9D5503197092aC168c91465E7f2',
    size: '1.3 MB',
    uploadedAt: '2022-01-01',
    from: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
  },
  {
    name: 'Cisco Certified Network Associate',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    size: '1.7 MB',
    uploadedAt: '2024-01-26',
    from: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
  },
];

const ShareCertificate = () => {
  const { address } = useParams();
  const [curInst, setCurInst] = useState('uit');
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isCertLoading, setIsCertLoading] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [certPubKey, setCertPubKey] = useState(address || '');
  const [userAddress, setUserAddress] = useState('');
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: '',
  });
  const [certChecked, setCertChecked] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  const validKey = [
    '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c',
  ];
  const validUser = ['0x8F9a7B6c5D4e3F2a1BcDeAb98C76Ef54d32E1F0a'];
  const [certIcon, setCertIcon] = useState({
    title: 'file',
    color: 'gray',
  });
  const [userIcon, setUserIcon] = useState({
    title: 'user',
    color: 'gray',
  });
  const [gasFee, setGasFee] = useState(
    (0.0001 + Math.random() * (0.001 - 0.0001)).toFixed(10)
  );
  const reasons = [
    'Recruitment',
    'Further Study',
    'Visa Application',
    'Job Promotion',
    'Other',
  ];
  const certificateTypes = [
    {
      institution: 'uit',
      name: 'UIT - University Of Information Technology',
      types: [
        "Associate's Degree",
        "Bachelor's Degree",
        "Master's Degree",
        'Doctoral Degree',
        'Professional Degrees',
      ],
    },
    {
      institution: 'iig',
      name: 'IIG Vietnam',
      types: [
        'TOEIC Listening & Reading',
        'TOEIC Speaking & Writing',
        'TOEIC Bridge',
      ],
    },
  ];

  const [refreshKey, setRefreshKey] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const [tableRows, setTableRows] = useState(TABLE_ROWS);
  const [curIndex, setCurIndex] = useState(-1);

  useEffect(() => {
    const fetchedData = localStorage.getItem('fetchedData');
    if (fetchedData) {
      setDataFetched(true);
      setTableRows(JSON.parse(fetchedData));
    } else {
      setDataFetched(true);
      localStorage.setItem('fetchedData', JSON.stringify(tableRows));
      setRefreshKey(refreshKey + 1);
    }
  }, []);

  const closeModal = () => setShowModal(false);

  const handleSelectInstitution = (event) => {
    setCurInst(event);
  };

  const checkValid = (pubKey) => {
    return validKey.includes(pubKey);
  };

  const checkUser = (address) => {
    return validUser.includes(address);
  };

  const handleCertCheck = () => {
    setIsCertLoading(true); // Hiển thị spinner

    setTimeout(() => {
      if (checkValid(certPubKey)) {
        setCertIcon({
          title: 'check',
          color: 'green',
        });
      } else {
        setCertIcon({
          title: 'xmark',
          color: 'red',
        });
      }
      setCertChecked(true);
      setIsCertLoading(false); // Ẩn spinner
    }, 3000);
  };

  const handleUserCheck = () => {
    setIsUserLoading(true); // Hiển thị spinner

    setTimeout(() => {
      if (checkUser(userAddress)) {
        setUserIcon({
          title: 'check',
          color: 'green',
        });
      } else {
        setUserIcon({
          title: 'xmark',
          color: 'red',
        });
      }
      setUserChecked(true);
      setIsUserLoading(false); // Ẩn spinner
    }, 3000);
  };

  const handleExecute = () => {
    if (!certChecked) {
      setShowAlert({
        show: true,
        message: 'Certificate public key has not been checked !',
      });
      setTimeout(() => {
        setShowAlert({
          ...showAlert,
          show: false,
        });
      }, 3000);
    } else {
      if (!checkValid(certPubKey)) {
        setShowAlert({
          show: true,
          message: 'Certificate public key is not valid !',
        });
        setTimeout(() => {
          setShowAlert({
            ...showAlert,
            show: false,
          });
        }, 3000);
      } else {
        setShowModal(true);
      }
    }
  };

  const handleConfirm = () => {
    setIsConfirmLoading(true);
    setTimeout(() => {
      setIsConfirmLoading(false);
      window.location.href = '/pending';
    }, 2000);
  };

  return (
    <div className="flex-col w-full">
      <div className="flex flex-col text-center py-10 pb-1">
        <Typography variant="h1">Share your certificate !</Typography>
        <Typography variant="lead">
          Share your certificates with another user. They can view and check
          your information.
        </Typography>
      </div>
      <div className="mb-7 flex flex-col justify-center items-center">
        <Card className="h-auto w-[40%] mt-5 overflow-hidden p-8" color="white">
          <div>
            <Typography variant="h4" color="blue-gray">
              Share Request
            </Typography>
            <Typography color="gray" className="font-normal">
              Fulfill all information below
            </Typography>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <div className="flex gap-3">
              <Input
                label="Receiver Address"
                icon={
                  <i
                    className={`fas fa-${userIcon.title} text-${userIcon.color}-500 text-xs`}
                  />
                }
                onChange={(event) => setUserAddress(event.target.value)}
              />
              <Button onClick={handleUserCheck}>
                {isUserLoading ? <Spinner className="h-4 w-4" /> : 'Check'}
              </Button>
            </div>
            <div className="flex gap-3">
              <Input
                label="Certificate Hash"
                icon={
                  <i
                    className={`fas fa-${certIcon.title} text-${certIcon.color}-500 text-xs`}
                  />
                }
                onChange={(event) => setCertPubKey(event.target.value)}
                value={certPubKey}
              />
              <Button onClick={handleCertCheck}>
                {isCertLoading ? <Spinner className="h-4 w-4" /> : 'Check'}
              </Button>
            </div>
            {checkValid(certPubKey) && certChecked && (
              <div className="flex px-2 items-center">
                <div>
                  <i className="fas fa-file-pdf text-red-500 mr-1"></i>
                </div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-2"
                >
                  TOEIC Certificates - 2018
                </Typography>
              </div>
            )}

            <div className="flex justify-end">
              <Button color="amber" onClick={handleExecute}>
                Execute
              </Button>
              <div
                className={`fixed inset-0 flex items-start justify-end m-5 ${
                  showAlert.show ? 'z-50' : 'z-0'
                } transition-opacity duration-300 ${
                  showAlert.show
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <Alert
                  open={showAlert.show}
                  color="red"
                  onClose={() => setShowAlert(false)}
                  className="w-[50%]"
                  icon={<i className="fas fa-exclamation-triangle text-xs" />}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                  }}
                >
                  {showAlert.message}
                </Alert>
              </div>
            </div>
          </div>
        </Card>
        <Card
          key={refreshKey}
          className="h-full w-2/3 mt-10 overflow-hidden animate__animated animate__fadeInUp"
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <Typography variant="h5" className="p-2 mt-2 ml-2">
                Certificates shared to you !
              </Typography>
            </thead>
            <tbody>
              {dataFetched ? (
                tableRows.map(
                  ({ name, address, uploadedAt, size, from }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes =
                      (isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50') +
                      ` flex items-center hover:bg-gray-200 cursor-pointer px-5`;

                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          window.location.href = '/get/' + address;
                        }}
                      >
                        <td className={classes}>
                          <div className="mr-2">
                            <i className="fas fa-file-pdf text-red-500 mr-1"></i>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Typography
                              variant="h6"
                              color="blue-gray"
                              className="font-normal pl-2"
                            >
                              {name}{' '}
                              <span className="text-gray-500 text-sm mx-2">
                                {address}
                                <i className="fas fa-copy text-gray-500 copy-icon ml-1" />
                              </span>
                            </Typography>
                            <Typography
                              variant="small"
                              color="indigo"
                              className="text-xs pl-2"
                            >
                              {`Size: ${size} | Uploaded at: ${uploadedAt} | From: ${from}`}
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td className="p-4">
                    <Typography>No certificates fetched</Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
      <Dialog open={showModal} handler={closeModal}>
        <DialogHeader>Your attention is required!</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center mb-3">
            <i className="fab fa-ethereum text-[60px] text-blue-gray-800 mr-2"></i>
            <Typography color="black" variant="h5" className="py-3">
              Your share request costs{' '}
              <span className="text-red-500">{gasFee} ETH</span> to execute !
            </Typography>
            <p className="text-gray-600">
              Once you have shared this certificate, the information of
              certificate can be visible to receiver
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleConfirm}>
            {isConfirmLoading ? <Spinner className="h-4 w-4" /> : 'Confirm'}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ShareCertificate;
