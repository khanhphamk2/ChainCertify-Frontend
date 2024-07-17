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
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Ipfs from '../../assets/icons/ipfs.svg';
import Mongodb from '../../assets/icons/mongodb.svg';
import { getCertificatesList } from '../../api/certificate.api';
import moment from 'moment';
import { ethers } from 'ethers';

function GetCertificates() {
  const [tableRows, setTableRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [curIndex, setCurIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Thêm state key duy nhất
  const gasFee = 0.0001 + Math.random() * (0.001 - 0.0001);

  const navigate = useNavigate();

  useEffect(() => {
    // const fetchedData = localStorage.getItem('fetchedData');
    // if (fetchedData) {
    //   setDataFetched(true);
    //   setTableRows(JSON.parse(fetchedData));
    // } else {
    //   setDataFetched(true);
    //   localStorage.setItem('fetchedData', JSON.stringify(tableRows));
    //   setRefreshKey(refreshKey + 1);
    // }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const wallet = ethers.utils.getAddress(
          localStorage.getItem('walletAddress')
        );
        const data = await getCertificatesList(wallet);
        setTableRows(data.result);
        setDataFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
              <tbody className={isLoading ? 'p-5 flex justify-center' : ''}>
                {!isLoading ? (
                  tableRows.length > 0 ? (
                    tableRows.map(
                      ({ ipfsHash, certHash, issueDate, isRevoked }, index) => {
                        const isLast = index === tableRows.length - 1;
                        const classes =
                          (isLast
                            ? 'p-4'
                            : 'p-4 border-b border-blue-gray-50') +
                          ` flex items-center hover:bg-gray-200 cursor-pointer px-5`;

                        return (
                          <tr
                            key={index}
                            onClick={() => {
                              navigate('/get/' + certHash, {
                                state: {
                                  ipfsHash,
                                  certHash,
                                  issueDate,
                                },
                              });
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
                                  {ipfsHash}{' '}
                                  {isRevoked && (
                                    <span className="text-sm text-white p-1 px-3 font-semibold mb-2 ml-2 rounded-full bg-blue-800 w-auto text-center">
                                      Revoked
                                    </span>
                                  )}
                                  <div>
                                    <span className="text-gray-500 text-sm mr-1">
                                      {certHash}
                                    </span>
                                    <i className="fas fa-copy text-gray-500 copy-icon" />
                                  </div>
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="indigo"
                                  className="text-xs pl-2"
                                >
                                  {`Issued at: ${moment(issueDate).format(
                                    'YYYY/MM/DD HH:mm'
                                  )}`}
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
                                        to={`/share/${certHash}`}
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
                  )
                ) : (
                  <Spinner className="h-6 w-6" />
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
