import React, { useState } from 'react';
import {
  Typography,
  Card,
  Input,
  Textarea,
  Button,
  Spinner,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import { detectFraud } from '../../../api/fraudDetection.api';
import { sendRevokeTransaction } from '../../../utils/signAndSendTransaction';

const RevokeCertificate = () => {
  const accountAddress = '0x087791512beF6469B7ea2799a55D508a9bf6be33';
  const { address } = useParams();
  const [curInst, setCurInst] = useState('uit');
  const [isLoading, setIsLoading] = useState(false);
  const [isRevokeLoading, setIsRevokeLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [certPubKey, setCertPubKey] = useState(address || '');
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: '',
  });
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [certChecked, setCertChecked] = useState(false);
  const [holderAddress, setHolderAddress] = useState('');
  const validKey =
    '0x591304466179a7374e7b8218aff0da2c8efbadaf836651706bb972579a8c7a37';
  const [icon, setIcon] = useState({
    title: 'key',
    color: 'gray',
  });
  const [gasFee, setGasFee] = useState(
    (0.0001 + Math.random() * (0.001 - 0.0001)).toFixed(10)
  );
  const [showFraudModal, setShowFraudModal] = useState(false); // State for fraud detection modal

  const [showErrorModal, setShowErrorModal] = useState(false); // State for error modal

  const [transactionHash, setTransactionHash] = useState('');

  const [safe, setSafe] = useState(false);

  const [reason, setReason] = useState('');

  const closeModal = () => {
    setShowModal(false);
    window.location.href = '/issuer-dashboard';
  };

  const handleSelectInstitution = (event) => {
    setCurInst(event);
  };

  const checkValid = (pubKey) => {
    return pubKey === validKey;
  };

  const handleCheck = () => {
    setIsLoading(true); // Hiển thị spinner

    setTimeout(() => {
      if (checkValid(certPubKey)) {
        setIcon({
          title: 'check',
          color: 'green',
        });
      } else {
        setIcon({
          title: 'xmark',
          color: 'red',
        });
      }
      setCertChecked(true);
      setIsLoading(false); // Ẩn spinner
    }, 3000);
  };

  const handleExecute = async () => {
    setIsRevokeLoading(true);

    setShowFraudModal(true);

    const isSafe = Boolean((await detectFraud(holderAddress)).safe);

    setSafe(isSafe);

    setIsRevokeLoading(false);
  };

  const executeRevocation = async () => {
    setIsConfirmLoading(true);
    try {
      const data = {
        reason,
        holder: holderAddress,
        certHash: certPubKey,
      };

      const receipt = await sendRevokeTransaction(data);

      setTransactionHash(receipt.transactionHash);

      console.log(receipt);

      setIsConfirmLoading(false);
      setShowFraudModal(false);
      setShowModal(true);
    } catch (error) {
      console.error('Error revoking certificate:', error);
      setShowErrorModal(true);
      setIsRevokeLoading(false);
      setIsConfirmLoading(false);
    }
  };

  const handleFraudContinue = async () => {
    setIsConfirmLoading(true);
    await executeRevocation();
    setShowFraudModal(false);
  };

  return (
    <div className="flex-col w-full">
      <div className="mb-7 flex justify-center">
        <Card
          className="h-auto w-[40%] mt-10 overflow-hidden p-8"
          color="white"
        >
          <div>
            <Typography variant="h4" color="blue-gray">
              Certificate Revocation
            </Typography>
            <Typography color="gray" className="font-normal">
              Fulfill all information below
            </Typography>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <Input
              label="Holder Address"
              value={holderAddress}
              onChange={(event) => setHolderAddress(event.target.value)}
              icon={<i className="fas fa-user text-xs" />}
            />
            <div className="flex gap-3">
              <Input
                label="Certificate Hash"
                icon={
                  <i
                    className={`fas fa-${icon.title} text-${icon.color}-500 text-xs`}
                  />
                }
                onChange={(event) => setCertPubKey(event.target.value)}
                value={certPubKey}
              />
            </div>
            {/* {certChecked && (
              <div className="flex px-2 items-center">
                <div>
                  <i className="fas fa-file-pdf text-red-500 mr-1"></i>
                </div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-2"
                >
                  Cisco Certified Network Associate
                </Typography>
              </div>
            )} */}
            <Textarea
              label="Why Revoke ?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end">
              <Button color="red" onClick={handleExecute}>
                {isRevokeLoading ? <Spinner className="h-4 w-4" /> : 'Execute'}
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
      </div>
      <Dialog open={showModal} handler={closeModal}>
        <DialogHeader>Revoke success !</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center mb-3">
            <i className="fab fa-ethereum text-[60px] text-blue-gray-800 mr-2"></i>
            <Typography color="black" variant="h5" className="py-3">
              Your certificate has been revoked, it will no longer be valid.
            </Typography>
            <div className="text-black">
              Transaction hash:{' '}
              <a
                href={`https://sepolia.arbiscan.io/tx/${transactionHash}`}
                target="_blank"
              >
                <span className="text-blue-700">{transactionHash}</span>
              </a>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={closeModal} className="mr-1">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={showFraudModal} handler={() => setShowFraudModal(false)}>
        <DialogHeader>Fraud Detection Processing</DialogHeader>
        <DialogBody>
          <div className="text-center mb-3 flex justify-center">
            {isRevokeLoading ? (
              <Spinner className="h-10 w-10 m-4" />
            ) : safe ? (
              <i className="fas fa-check-circle text-[60px] text-green-700 mr-2"></i>
            ) : (
              <i className="fas fa-exclamation-circle text-[60px] text-yellow-700 mr-2"></i>
            )}
          </div>
          <div className="text-center my-2">
            {!isRevokeLoading &&
              (safe ? (
                <Typography variant="h3" color="black">
                  Safe
                </Typography>
              ) : (
                <Typography variant="h3" color="black">
                  Fraud Detected
                </Typography>
              ))}
          </div>
          {!isRevokeLoading &&
            (safe ? (
              <p className="text-black">
                Holder from address{' '}
                <span className="text-blue-600">{holderAddress}</span> is safe.
                You can continue your transaction !
              </p>
            ) : (
              <p className="text-black">
                Holder from address{' '}
                <span className="text-blue-600">{holderAddress}</span> is at
                risk of fraud. Are you sure you want to continue with this
                transaction?
              </p>
            ))}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setShowFraudModal(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {!isRevokeLoading && (
            <Button variant="gradient" onClick={executeRevocation}>
              {isConfirmLoading ? <Spinner className="h-4 w-4" /> : 'Continue'}
            </Button>
          )}
        </DialogFooter>
      </Dialog>
      <Dialog open={showErrorModal} handler={() => setShowErrorModal(false)}>
        <DialogHeader>Error</DialogHeader>
        <DialogBody divider>
          <p className="text-center mb-3">
            {' '}
            <i className="fas fa-exclamation-circle  text-[60px] text-red-700 mr-2"></i>
          </p>
          <p className="text-black">
            The certificate with hash{' '}
            <span className="text-red-700">{certPubKey}</span> is not valid.
            Please check the certificate hash again.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={() => setShowErrorModal(false)}>
            OK
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default RevokeCertificate;
