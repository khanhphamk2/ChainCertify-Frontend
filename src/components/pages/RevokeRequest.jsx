import React, { useState } from 'react';
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
} from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import { revokeRequest } from '../../api/request.api';

const RevokeRequest = () => {
  const { address } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: '',
  });
  const [requestForm, setRequestForm] = useState({
    address: localStorage.getItem('walletAddress'),
    certHash: '',
    reason: '',
  });

  const handleRequest = async () => {
    setIsLoading(true);
    revokeRequest(requestForm)
      .then((res) => {
        setTimeout(() => {
          setShowModal(true);
          setIsLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setShowAlert({
          show: true,
          message: 'Request failed. Please try again',
        });
        setTimeout(() => setShowAlert({ show: false, message: '' }), 2000);
        console.error(err);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setRequestForm({
      address: localStorage.getItem('walletAddress'),
      certHash: '',
      reason: '',
    });
    window.location.href = '/';
  };

  return (
    <div className="flex-col w-full mt-10">
      <div className="mb-7 flex justify-center">
        <Card className="h-auto w-[40%] mt-5 overflow-hidden p-8" color="white">
          <div>
            <Typography variant="h4" color="blue-gray">
              Revocation Request
            </Typography>
            <Typography color="gray" className="font-normal">
              Fulfill all information below
            </Typography>
          </div>
          <div className="flex flex-col gap-5 pt-5">
            <div className="flex gap-3">
              <Input
                label="Certificate Hash"
                onChange={(e) =>
                  setRequestForm({ ...requestForm, certHash: e.target.value })
                }
                value={requestForm.certHash}
              />
            </div>
            <Textarea
              label="Why Revoke ?"
              onChange={(e) =>
                setRequestForm({ ...requestForm, reason: e.target.value })
              }
              value={requestForm.reason}
            />
            <div className="flex justify-end">
              <Button color="red" onClick={handleRequest}>
                Request
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
        <DialogHeader>Request Success</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center mb-3">
            <i className="fas fa-check text-[60px] text-green-600 mr-2"></i>
            <Typography color="black" variant="h5" className="py-3">
              Request has been successfully submitted
            </Typography>
            <p className="text-gray-600 px-2">
              Your revocation request is being processed. Please wait for
              related issuers to confirm your request.
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={closeModal} className="mr-1">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default RevokeRequest;
