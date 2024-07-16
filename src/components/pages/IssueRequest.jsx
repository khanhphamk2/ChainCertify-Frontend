import React, { useState } from 'react';
import {
  Card,
  Typography,
  Input,
  Button,
  Textarea,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
  Select,
  Option,
  Alert,
  Tooltip,
} from '@material-tailwind/react';
import DatePicker from './controls/DatePicker';
import { issueRequest } from '../../api/request.api';
import moment from 'moment';
const IssueRequest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: '',
    identityNumber: '',
    institution: 'uit',
    address: localStorage.getItem('walletAddress'),
    type: '',
    score: 0,
    expireDate: moment().format('YYYY/MM/DD').toString(),
  });
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

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRequest = async () => {
    setIsLoading(true);
    await issueRequest(requestForm, selectedFile);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 2000);
  };

  const closeModal = () => {
    setRequestForm({
      name: '',
      identityNumber: '',
      institution: 'uit',
      address: localStorage.getItem('walletAddress'),
      type: '',
      score: 0,
      expireDate: moment().format('YYYY/MM/DD').toString(),
    });
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <div className="flex-col w-full">
      <div className="mb-7">
        <div className="flex justify-center gap-10">
          <Card
            className="h-auto w-[30%] mt-10 overflow-hidden p-8"
            color="white"
          >
            <div>
              <Typography variant="h4" color="blue-gray">
                Issuance Request Form
              </Typography>
              <Typography color="gray" className="font-normal">
                Fulfill all information below
              </Typography>
            </div>
            <div className="flex flex-col gap-5 pt-5">
              <Input
                label="Holder Name"
                icon={<i className="fas fa-user text-xs" />}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, name: e.target.value })
                }
                value={requestForm.name}
              />
              <Input
                label="Indentity Number"
                icon={<i className="fas fa-address-card text-xs" />}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    identityNumber: e.target.value,
                  })
                }
                value={requestForm.identityNumber}
              />
              <Select
                label="Institution"
                onChange={(e) => {
                  setRequestForm({
                    ...requestForm,
                    institution: e,
                  });
                }}
              >
                {certificateTypes.map((item, index) => (
                  <Option value={item.institution}>{item.name}</Option>
                ))}
              </Select>
              <Select
                label="Certificate Type"
                onChange={(e) => {
                  setRequestForm({
                    ...requestForm,
                    type: e,
                  });
                }}
              >
                {certificateTypes
                  .find((item) => item.institution === requestForm.institution)
                  ?.types.map((type, index) => (
                    <Option key={index} value={type}>
                      {type}
                    </Option>
                  ))}
              </Select>
              <Input
                label="Score"
                value={requestForm.score}
                onChange={(e) => {
                  setRequestForm({
                    ...requestForm,
                    score: parseInt(e.target.value) || 0,
                  });
                }}
                icon={<i className="fas fa-star text-xs" />}
              />
              <div>
                <DatePicker
                  selectedDate={requestForm.expireDate}
                  onChange={(e) =>
                    setRequestForm({ ...requestForm, expireDate: e })
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            className="h-auto w-[30%] mt-10 overflow-hidden p-8"
            color="white"
          >
            <div>
              <Typography variant="h4" color="blue-gray">
                Certificate Upload
              </Typography>
              <Typography color="gray" className="font-normal">
                Choose a pdf file from your device
              </Typography>
            </div>
            <div
              className="flex flex-col items-center justify-center h-full border-dashed border-2 border-blue-gray-300 p-4 mt-4 rounded-lg cursor-pointer"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'application/pdf'; // Optionally set accepted file types
                input.onchange = handleUploadFile;
                input.click();
              }}
            >
              <i
                className={`fas fa-${
                  selectedFile ? 'check' : 'file-upload'
                } text-3xl text-blue-gray-400 mb-2`}
              />
              <Typography color="gray" className="font-medium">
                {selectedFile ? selectedFile.name : 'Upload file'}
              </Typography>
            </div>
          </Card>
        </div>
        <div className="mt-5 w-full flex justify-center relative">
          <Card className="p-2 w-[63%] flex flex-row justify-between">
            <Checkbox
              label={
                <Typography color="blue-gray" className="flex font-medium">
                  I agree with the
                  <Typography
                    as="a"
                    href="#"
                    color="blue"
                    className="font-medium transition-colors hover:text-blue-700"
                  >
                    &nbsp;terms and conditions
                  </Typography>
                  .
                </Typography>
              }
              onClick={() => setIsChecked(true)}
            />
            <div
              className={`fixed inset-0 flex items-start justify-end m-5 ${
                showAlert ? 'z-50' : 'z-0'
              } transition-opacity duration-300 ${
                showAlert
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <Alert
                open={showAlert}
                color="red"
                onClose={() => setShowAlert(false)}
                className="w-[50%]"
                icon={<i className="fas fa-exclamation-triangle text-xs" />}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
              >
                You have to agree with our terms and conditions.
              </Alert>
            </div>
            <Button color="blue" className="m-2" onClick={handleRequest}>
              {isLoading ? <Spinner className="h-4 w-4" /> : 'Request'}
            </Button>
          </Card>
        </div>
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
              Your issuance request is being processed. Please wait for all
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

export default IssueRequest;
