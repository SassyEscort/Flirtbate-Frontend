'use client';
import UINewTypography from 'components/UIComponents/UINewTypography';
import { PaidFireImageBox, UINewTypographySuccessBoost } from './boostProfile.styled';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

export const PaidProfile = ({ activePlanHours, activePlanMins }: { activePlanHours: number; activePlanMins: number }) => {
  return (
    <>
      <PaidFireImageBox>
        <Image src="/images/boostProfile/fire-ani.gif" height={150} width={109} alt="fire_icon" />
        <UINewTypography variant="buttonLargeMenu" color="common.white">
          <FormattedMessage id="ProfileBoostedFor" /> {activePlanHours ? activePlanHours : ''} {activePlanMins && activePlanMins}{' '}
          {activePlanMins && <FormattedMessage id="Mins" />}
        </UINewTypography>
        <UINewTypographySuccessBoost>
          {activePlanHours}:{activePlanMins}
        </UINewTypographySuccessBoost>
      </PaidFireImageBox>
    </>
  );
};
