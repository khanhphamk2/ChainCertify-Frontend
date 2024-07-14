import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { getFileInfo, getFile } from '../../api/certificate.api';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const CertificateDetail = () => {
  const ipfsLink =
    'https://black-delicate-hamster-859.mypinata.cloud/ipfs/QmbTo9FCw37kbZuYFtUbZuY4j1pVhjQ2kQ4KaQZcSbiR4Z?pinataGatewayToken=9TtgncTJIzdzv_ieLJA3Uulkt--VHz6BNjRkJU1h2mw1SB_aK6v8UN0itzHBsAVY';
  const [pdf, setPdf] = useState(null);
  useEffect(() => {
    try {
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
        const ipfsUrl = await getPreviewFileUrl(ipfsLink);
        const pdfFile = await getFile(ipfsUrl);
        console.log(pdfFile);
        setPdf(URL.createObjectURL(pdfFile));
      };

      fetchFile();
    } catch (error) {
      throw error;
    }
  }, []);
  return (
    <div className="m-7 w-4/5">
      <div className="flex flex-col gap-1">
        <Typography variant="h3">TOEIC Certificates - 2021</Typography>
        <p className="font-light text-gray-500 text-base mr-1">
          0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c{' '}
          <i className="fas fa-copy text-gray-500 copy-icon text-base" />
        </p>
        <Typography variant="small" color="indigo">
          {'Size: 1.5 MB | Uploaded at: 2023-02-04'}
        </Typography>
      </div>
      <div className="my-3">
        <object class="pdf" data={pdf} width="100%" height="800px"></object>
      </div>
    </div>
  );
};

export default CertificateDetail;
