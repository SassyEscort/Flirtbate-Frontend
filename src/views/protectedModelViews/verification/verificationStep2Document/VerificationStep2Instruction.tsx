'use client';
import UINewTypography from 'components/UIComponents/UINewTypography';

import { FormattedMessage } from 'react-intl';
import {
  InstructionMainContainer,
  HeaderTextContainer,
  InstructionSubContainer,
  FirstBoxMainContainer,
  FirstBoxFirstContainer,
  FirstImageBlur,
  FirstBoxSecondContainer,
  SecondImage,
  FirstImageWithoutBlur,
  TypographyBox,
  SomeInstructionsUI
} from './verificationStep2Instructions.styled';

const VerificationStep2Instruction = () => {
  return (
    <InstructionMainContainer>
      <HeaderTextContainer>
        <SomeInstructionsUI variant="buttonLargeBold">
          <FormattedMessage id="SomeInstructions" />
        </SomeInstructionsUI>
      </HeaderTextContainer>
      <InstructionSubContainer>
        <FirstBoxMainContainer>
          <FirstBoxFirstContainer>
            <FirstImageBlur src="/images/model/instruction-img.png" alt="instruction-img" />
            <FirstBoxSecondContainer>
              <TypographyBox>
                <UINewTypography variant="buttonLargeMenu" color="text.primary">
                  <FormattedMessage id="BlurredFuzzyOrGrainyPhotos" />
                </UINewTypography>
              </TypographyBox>
              <SecondImage src="/images/model/alert-img.png" alt="alert-img" />
            </FirstBoxSecondContainer>
          </FirstBoxFirstContainer>

          <FirstBoxFirstContainer>
            <FirstImageWithoutBlur src="/images/model/instruction-img.png" alt="instruction-img" />
            <FirstBoxSecondContainer>
              <TypographyBox>
                <UINewTypography variant="buttonLargeMenu" color="text.primary">
                  <FormattedMessage id="MakeSureToUpload" />
                </UINewTypography>
              </TypographyBox>
              <SecondImage src="/images/model/success-img.png" alt="success-img" />
            </FirstBoxSecondContainer>
          </FirstBoxFirstContainer>
        </FirstBoxMainContainer>

        <FirstBoxMainContainer>
          <FirstBoxFirstContainer>
            <FirstImageWithoutBlur src="/images/model/instruction-img2.png" alt="instruction-img" />
            <FirstBoxSecondContainer>
              <TypographyBox>
                <UINewTypography variant="buttonLargeMenu" color="text.primary">
                  <FormattedMessage id="AvoidPatches" />
                </UINewTypography>
              </TypographyBox>
              <SecondImage src="/images/model/alert-img.png" alt="alert-img" />
            </FirstBoxSecondContainer>
          </FirstBoxFirstContainer>

          <FirstBoxFirstContainer>
            <FirstImageWithoutBlur src="/images/model/instruction-img3.png" alt="instruction-img" />
            <FirstBoxSecondContainer>
              <TypographyBox>
                <UINewTypography variant="buttonLargeMenu" color="text.primary">
                  <FormattedMessage id="MakeSureYourFace" />
                </UINewTypography>
              </TypographyBox>
              <SecondImage src="/images/model/success-img.png" alt="success-img" />
            </FirstBoxSecondContainer>
          </FirstBoxFirstContainer>
        </FirstBoxMainContainer>
      </InstructionSubContainer>
    </InstructionMainContainer>
  );
};

export default VerificationStep2Instruction;
