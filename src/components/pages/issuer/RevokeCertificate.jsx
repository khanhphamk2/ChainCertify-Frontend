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
import detectEthereumProvider from '@metamask/detect-provider';
const RevokeCertificate = () => {
  const { address } = useParams();
  const [curInst, setCurInst] = useState('uit');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [certPubKey, setCertPubKey] = useState(address || '');
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: '',
  });
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [certChecked, setCertChecked] = useState(false);
  const validKey = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
  const [icon, setIcon] = useState({
    title: 'key',
    color: 'gray',
  });
  const [gasFee, setGasFee] = useState(
    (0.0001 + Math.random() * (0.001 - 0.0001)).toFixed(10)
  );
  const [showFraudModal, setShowFraudModal] = useState(false); // State for fraud detection modal

  const closeModal = () => setShowModal(false);

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
        setShowFraudModal(true); // Show fraud detection modal
      }
    }
  };

  const openModal = () => {
      if (isChecked) {
      if (gasFee === 0) {
        setIsLoading(true); // Hiển thị spinner

        setTimeout(() => {
          setIsLoading(false); // Ẩn spinner
          setGasFee(
            selectedFile
              ? ((selectedFile.size / (1024 * 1024)) * 0.01).toFixed(5)
              : 0
          );
          setShowModal(true);
        }, 3000);
      } else {
        setShowModal(true);
      }
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const handleConfirm = async () => {
    setIsConfirmLoading(true);
    const provider = await detectEthereumProvider();

    if (provider) {
      try {
        const accounts = await provider.request({
          method: 'eth_requestAccounts',
        });
        const transactionParameters = {
          to: '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E', // Địa chỉ hợp đồng của bạn
          from: accounts[0],
          value: '0x9184e72a000', // Giá trị giao dịch (0 ETH trong trường hợp này)
          data: '0xbDA5747bF2123213123123D65F08deb54cb465eB87D40e51B197E', // Dữ liệu giao dịch
        };

        const txHash = await provider.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });

        console.log('Transaction sent:', txHash);
        // openModal();
        setTimeout(() => {
        setIsConfirmLoading(false);
        window.location.href = '/pending';
      }, 1000);
      } catch (error) {
        console.error('Transaction failed:', error);
        setIsConfirmLoading(false);
      }
    } else {
      console.error('Please install MetaMask!');
      setIsConfirmLoading(false);
    }
  };

  const handleFraudContinue = () => {
    setShowFraudModal(false);
    handleConfirm();
  };

  const handleFraudCancel = () => {
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
              <Button onClick={handleCheck}>
                {isLoading ? <Spinner className="h-4 w-4" /> : 'Check'}
              </Button>
            </div>
            {certChecked && (
              <div className="flex px-2 items-center">
                <div>
                  <i className="fas fa-file-pdf text-red-500 mr-1"></i>
                </div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-2"
                >
                  TOEIC OFFICIAL SCORE CERTIFICATE
                </Typography>
              </div>
            )}
            <Textarea label="Why Revoke ?" />
            <div className="flex justify-end">
              <Button color="red" onClick={handleExecute}>
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
      </div>
      <Dialog open={showModal} handler={closeModal}>
        <DialogHeader>Your attention is required!</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center mb-3">
            <i className="fab fa-ethereum text-[60px] text-blue-gray-800 mr-2"></i>
            <Typography color="black" variant="h5" className="py-3">
              Your revocation request costs{' '}
              <span className="text-red-500">{gasFee} ETH</span> to execute !
            </Typography>
            <p className="text-gray-600">
              Once you have revoked this certificate, it will become{' '}
              <span className="font-bold">invalid</span>, and you will no longer
              be able to use it
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
      <Dialog open={showFraudModal} handler={handleFraudCancel}>
        <DialogHeader>Fraud Detection Warning</DialogHeader>
        <DialogBody divider>
          <p className="text-center mb-3">
            {' '}
            <i className="fas fa-warning text-[60px] text-yellow-700 mr-2"></i>
          </p>
          <p className="text-black">
            Holder from address{' '}
            <span className="text-red-600">{"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"}</span> is at risk of
            fraud. Are you sure you want to continue with this action? This
            could be a potential fraud attempt.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleFraudCancel}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={handleFraudContinue}>
            Continue
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default RevokeCertificate;
