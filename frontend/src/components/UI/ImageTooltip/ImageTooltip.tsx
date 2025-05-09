import React from 'react';
import { Tooltip } from '@mui/material';

interface Props {
  photoUrl: string ;
  altText: string;
}

const ImageTooltip: React.FC<Props> = ({photoUrl, altText}) => {
  return (
    <Tooltip
      title={
        <img
          src={photoUrl}
          alt={altText}
          style={{ width: 200, height: "auto", borderRadius: 8 }}
        />
      }
      placement="left"
      arrow
    >
      <img
        src={photoUrl}
        alt={altText}
        style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
      />
    </Tooltip>
  );
};

export default ImageTooltip;