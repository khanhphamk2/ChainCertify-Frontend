import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const CertificateDetail = ({ pdfUrl }) => {
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
        <object class="pdf" data={pdfUrl} width="100%" height="800px"></object>
      </div>
    </div>
  );
};

export default CertificateDetail;
