import React, { Fragment } from 'react';
import { ModelDetailsRes } from 'services/adminModel/types';
import PersonalDetailsBox from '../ModelInformation/PersonalDetailsBox';
import { ModelDocumentBox, ModelDocumentContentBox, ModelDocumentImgBox } from './ModelDocument.styled';

const ModelDocument = ({ modelData }: { modelData: ModelDetailsRes }) => {
  return (
    <ModelDocumentBox gap={modelData?.data ? 3 : 0}>
      {modelData?.data?.documents && (
        <ModelDocumentContentBox>
          {modelData?.data?.documents?.map((item, index) => (
            <Fragment key={index}>
              <PersonalDetailsBox label="Document Type" value={item?.document_type ? item?.document_type : ''} />
              <ModelDocumentImgBox src={item.link} />
            </Fragment>
          ))}
        </ModelDocumentContentBox>
      )}
    </ModelDocumentBox>
  );
};

export default ModelDocument;