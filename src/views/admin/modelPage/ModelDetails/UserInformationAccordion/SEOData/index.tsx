import { ModelDetailsRes } from 'services/adminModel/types';
import PersonalDetailsBox from '../ModelInformation/PersonalDetailsBox';
import { ModelInformationBox, ModelInformationContentBox } from './SEOData.styled';

const SEOData = ({ modelData }: { modelData: ModelDetailsRes }) => {
  return (
    <ModelInformationBox gap={modelData?.data ? 3 : 0}>
      {modelData?.data?.model_seo?.map((item, index) => (
        <ModelInformationContentBox key={index}>
          <PersonalDetailsBox label="Title" value={item.title ? item.title : '-'} />
          <PersonalDetailsBox label="Keywords" value={item.keywords ? item.keywords : '-'} />
          <PersonalDetailsBox label="Description" value={item.description ? item.description : '-'} />
        </ModelInformationContentBox>
      ))}
    </ModelInformationBox>
  );
};

export default SEOData;
