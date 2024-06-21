import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
  IconButton,
} from '@material-tailwind/react';
import { Link, NavLink } from 'react-router-dom';
import Ipfs from '../../assets/icons/ipfs.svg';
import Mongodb from '../../assets/icons/mongodb.svg';

const TABLE_ROWS = [
  {
    name: 'TOEIC Certificates - 2021',
    address: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c',
    size: '1.2 MB',
    uploadedAt: '2021-09-01',
  },
  {
    name: 'UIT Graduation Certificate',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    size: '1.5 MB',
    uploadedAt: '2023-11-08',
  },
  {
    name: 'Coursera - UI/UX Design MasterTrack Certificate',
    address: '0x1a2B3c4D5E6F7A8B9c0D1E2F3A4B5C6D7E8F9A0',
    size: '1.8 MB',
    uploadedAt: '2021-20-11',
  },
  {
    name: 'Writing Tools & Hacks Course - Udemy Certificate of Completion',
    address: '0x617F2E2fD72FD9D5503197092aC168c91465E7f2',
    size: '1.3 MB',
    uploadedAt: '2022-01-01',
  },
  {
    name: 'Cisco Certified Network Associate',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    size: '1.7 MB',
    uploadedAt: '2024-01-26',
  },
];

function GetCertificates() {
  const [tableRows, setTableRows] = useState(TABLE_ROWS);
  const [showModal, setShowModal] = useState(false);
  const [curIndex, setCurIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Thêm state key duy nhất
  const gasFee = 0.0001 + Math.random() * (0.001 - 0.0001);

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

  const removeRow = (index) => {
    const newTableRows = tableRows.filter((_, i) => i !== index);
    setTableRows(newTableRows);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-4/5">
        <div className="flex flex-row text-left py-10 pb-2 justify-center gap-10">
          <div className="flex flex-col gap-2 w-50">
            <Typography variant="h2" style={{ width: 'fit-content' }}>
              Distributed certificate storage!
            </Typography>
            <Typography variant="lead" style={{ width: '470px' }}>
              Access your certificates seamlessly stored with IPFS and
              efficiently managed by MongoDB.
            </Typography>
          </div>
          <div className="flex items-center gap-10">
            <img src={Ipfs} alt="ipfs" className="h-24 w-24" />
            <img src={Mongodb} alt="mongodb" className="h-20 w-50" />
          </div>
        </div>
        <div className="flex justify-center">
          <Card
            key={refreshKey}
            className="h-full w-[90%] mt-10 overflow-hidden animate__animated animate__fadeInUp"
          >
            <table className="w-full min-w-max table-auto text-left">
              <tbody>
                {dataFetched ? (
                  tableRows.map(
                    ({ name, address, uploadedAt, size }, index) => {
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
                                {name}
                                <span className="text-gray-500 text-sm mx-3">
                                  {address}
                                </span>
                                <i className="fas fa-copy text-gray-500 copy-icon" />
                              </Typography>
                              <Typography
                                variant="small"
                                color="indigo"
                                className="text-xs pl-2"
                              >
                                {`Size: ${size} | Uploaded at: ${uploadedAt}`}
                              </Typography>
                            </div>
                            <div className="ml-auto">
                              <Menu>
                                <MenuHandler>
                                  <i className="fas fa-ellipsis-vertical text-gray-400 p-1"></i>
                                </MenuHandler>
                                <MenuList>
                                  <MenuItem className="flex flex-row">
                                    <Link
                                      to={`/share/${address}`}
                                      className="flex flex-row"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="my-auto">
                                        <i className="fas fa-share text-blue-gray-500 mr-1"></i>
                                      </div>
                                      <Typography
                                        variant="small"
                                        color="blue-gray-500"
                                        className="font-normal pl-2"
                                      >
                                        Share
                                      </Typography>
                                    </Link>
                                  </MenuItem>

                                  <MenuItem className="flex flex-row">
                                    <Link
                                      to={`/revoke/${address}`}
                                      className="flex flex-row"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <div className="my-auto">
                                        <i className="fas fa-rotate-left text-red-500 mr-1"></i>
                                      </div>
                                      <Typography
                                        variant="small"
                                        color="red"
                                        className="font-normal pl-2"
                                      >
                                        Revoke
                                      </Typography>
                                    </Link>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
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
      </div>
      <Dialog open={showModal}>
        <DialogHeader>Your attention is required!</DialogHeader>
        <DialogBody divider className="text-lg text-blue-gray-900">
          Are you sure to remove this certificate ?
          <p className="text-sm text-gray-500">
            You have to fetch data again if you want to get it
          </p>
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
          <Button
            variant="gradient"
            onClick={() => {
              removeRow(curIndex);
              setShowModal(false);
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default GetCertificates;
