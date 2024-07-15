import { Typography, Spinner } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { getFileInfo, getFile } from '../../api/certificate.api';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const CertificateDetail = () => {
  const location = useLocation();
  const { certHash, ipfsHash, issueDate } = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const ipfsLink = `https://black-delicate-hamster-859.mypinata.cloud/ipfs/${ipfsHash}?pinataGatewayToken=9TtgncTJIzdzv_ieLJA3Uulkt--VHz6BNjRkJU1h2mw1SB_aK6v8UN0itzHBsAVY`;
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
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

    const fetchFile = async () => {
      try {
        const ipfsUrl = await getPreviewFileUrl(ipfsLink);
        const pdfFile = await getFile(ipfsUrl);
        console.log(pdfFile);
        setPdf(URL.createObjectURL(pdfFile));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFile();
  }, []);

  return (
    <div className="m-7 w-4/5">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <Typography variant="h3">{ipfsHash}</Typography>
            <p className="font-light text-gray-500 text-base mr-1">
              {certHash}{' '}
              <i className="fas fa-copy text-gray-500 copy-icon text-base" />
            </p>
            <Typography variant="small" color="indigo">
              {`Issued at: ${moment(issueDate).format('YYYY/MM/DD HH:mm')} `}
            </Typography>
          </div>
          <div className="my-3">
            <object
              className="pdf"
              data={pdf}
              width="100%"
              height="800px"
            ></object>
          </div>
        </>
      )}
    </div>
  );
};

export default CertificateDetail;
