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
import moment from 'moment';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  issueCertificate,
  getFileInfo,
  uploadJson,
  uploadPdf,
} from '../../api/certificate.api';
import { signAndSendTransaction } from '../../utils/signAndSendTransaction';
import { set } from 'date-fns';
import { hashObject } from '../../utils/hashObject';
const IssueCertificates = () => {
  const accountAddress = localStorage.getItem('walletAddress');
  const [selectedFile, setSelectedFile] = useState(null);
  const [gasFee, setGasFee] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [curInst, setCurInst] = useState('uit');
  const [holderName, setHolderName] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [holderAddress, setHolderAddress] = useState('');
  const [institution, setInstitution] = useState('');
  const [certificateType, setCertificateType] = useState('');
  const [score, setScore] = useState(0);
  const [note, setNote] = useState('');
  const [expireDate, setExpiredDate] = useState(
    moment().format('YYYY/MM/DD').toString()
  );
  const [certificateHash, setCertificateHash] = useState('');

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

  const [ipfsLink, setIpfsLink] = useState('');

  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSelectInstitution = (event) => {
    setCurInst(event);
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

  const closeModal = () => {
    setSelectedFile(null);
    setHolderName('');
    setIdentityNumber('');
    setHolderAddress('');
    setInstitution('');
    setCertificateType('');
    setScore(0);
    setNote('');
    setExpiredDate(moment().format('YYYY/MM/DD').toString());
    setShowModal(false);
    window.location.href = '/issuer-dashboard';
  };

  const getPreviewFileUrl = async (ipfsUrl) => {
    const { pdf } = await getFileInfo(ipfsUrl);
    if (pdf) {
      const regex = /Qm[a-zA-Z0-9]+/;
      const previewFileUrl = ipfsUrl.replace(regex, pdf);
      console.log(previewFileUrl);
      return previewFileUrl;
    }
    return '';
  };

  const handleConfirm = async () => {
    const data = {
      name: holderName,
      identityNumber,
      holder: holderAddress,
      institution,
      type: certificateType,
      score: parseInt(score),
      expireDate,
      note,
    };

    try {
      setIsLoading(true);
      const receipt = await signAndSendTransaction(data);
      console.log(receipt);
      if (receipt.certHash) {
        setCertificateHash(receipt.certHash);
        const { holder, note, ...info } = data;
        const { pdfHash } = await uploadPdf(selectedFile);
        const { jsonHash } = await uploadJson({
          holder,
          info,
          pdfHash,
          hashInfo: hashObject(info),
        });
        const response = await issueCertificate({
          ...data,
          certHash: receipt.certHash,
          pdfIpfsHash: pdfHash,
          jsonIpfsHash: jsonHash,
          hash: receipt.transactionHash,
        });

        if (response) {
          setIpfsLink(
            `https://black-delicate-hamster-859.mypinata.cloud/ipfs/${pdfHash}?pinataGatewayToken=9TtgncTJIzdzv_ieLJA3Uulkt--VHz6BNjRkJU1h2mw1SB_aK6v8UN0itzHBsAVY`
          );
          setShowModal(true);
          setIsLoading(false);
        }
      }
    } catch (error) {
      throw error;
    }

    // if (receipt.certHash) {
    //   setCertificateHash(receipt.certHash);
    //   const response = await issueCertificate({

    //   });
    //   const ipfsUrl = await getPreviewFileUrl(response.certificate.ipfs);
    //   setIpfsLink(ipfsUrl);
    //   setIsLoading(false);
    //   setShowModal(true);
    // }
  };

  return (
    <div className="flex-col w-full">
      <div className="flex flex-col text-center py-10 pb-1">
        <Typography variant="h1">Issue new certificate !</Typography>
        <Typography variant="lead">
          Send your certificates to issuer to verify and commit it to
          blockchain.
        </Typography>
      </div>
      <div className="mb-7">
        <div className="flex justify-center gap-10">
          <Card
            className="h-auto w-[30%] mt-10 overflow-hidden p-8"
            color="white"
          >
            <div>
              <Typography variant="h4" color="blue-gray">
                Certificate Information
              </Typography>
              <Typography color="gray" className="font-normal">
                Fulfill all information below
              </Typography>
            </div>
            <div className="flex flex-col gap-5 pt-5">
              <Input
                label="Holder Name"
                icon={<i className="fas fa-user text-xs" />}
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
              />
              <Input
                label="Identity Number"
                icon={<i className="fas fa-address-card text-xs" />}
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
              />
              <Input
                label="Holder Address"
                icon={<i className="fas fa-hashtag text-xs" />}
                value={holderAddress}
                onChange={(e) => setHolderAddress(e.target.value)}
              />
              <Select label="Institution" onChange={(e) => setInstitution(e)}>
                {certificateTypes.map((item, index) => (
                  <Option key={index} value={item.institution}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <Select
                label="Certificate Type"
                onChange={(e) => setCertificateType(e)}
              >
                {certificateTypes
                  .find((item) => item.institution === curInst)
                  ?.types.map((type, index) => (
                    <Option key={index} value={type}>
                      {type}
                    </Option>
                  ))}
              </Select>
              <Input
                label="Score"
                icon={<i className="fas fa-star text-xs" />}
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
              <DatePicker selectedDate={expireDate} onChange={setExpiredDate} />
              <Textarea
                label="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
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
            <Button color="blue" className="m-2" onClick={handleConfirm}>
              {isLoading ? <Spinner className="h-4 w-4" /> : 'Execute'}
            </Button>
          </Card>
        </div>
      </div>
      <Dialog open={showModal} handler={closeModal}>
        <DialogHeader>Issue Success!</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center mb-3">
            <i className="fas fa-check text-[60px] text-green-500 mr-2"></i>
            <Typography color="black" variant="h5" className="py-3">
              Your certificate has been successfully issued and stored on the
              blockchain!
            </Typography>
            <p className="text-gray-600">
              Your certificate is now awaiting verification. You can track the
              progress using the hash below:
            </p>
            <div className="bg-gray-100 p-2 mt-2 rounded w-full text-center">
              <Typography color="black" variant="h6">
                {certificateHash}{' '}
                <i className="fas fa-copy cursor-pointer ml-1" />
              </Typography>
            </div>
            <p className="text-gray-600 mt-6 w-full">
              You can also view the file on IPFS using the link below:
            </p>
            <div className="bg-gray-100 p-2 mt-2 rounded w-full">
              <Tooltip content={ipfsLink}>
                <Typography color="blue" variant="h6">
                  <a
                    href={ipfsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'block',
                      maxWidth: '100%',
                    }}
                  >
                    {ipfsLink}
                  </a>
                </Typography>
              </Tooltip>
            </div>
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

export default IssueCertificates;
