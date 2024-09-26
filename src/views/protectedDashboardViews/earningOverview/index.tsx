import UINewTypography from 'components/UIComponents/UINewTypography';
import { FormattedMessage } from 'react-intl';
import {
  ProfileBackSide,
  ProfileDOBContainer,
  ProfileDOBMainContainer,
  ProfileDOBox,
  ProfileDOBoxMain,
  ProfilePieContainer,
  ProfilePieMainContainer,
  ProfileStatiscsContainer,
  ProfileStatiscsMainContainer,
  ProfileTotalVisits,
  UINewTypographyEarningsOverview
} from './EarningOverview.styled';
import { useCallback, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import FilterTimeDropdownV2 from './FilterTimeDropdownV2';
import { DATE_DURATION_TYPE } from 'constants/dateRange';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { getUserDataClient } from 'utils/getSessionData';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import { ModelEarningResponse } from 'services/modelDetails/type';
import Earnings from './Earning';
import { CircularProgress } from '@mui/material';
import { LoaderBox } from '../payoutRequest/PayoutRequest.styled';
import debounce from 'lodash/debounce';
import CustomDatePicker from 'components/common/CustomDatePicker';

const EarningOverview = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [periodType, setPeriodType] = useState('lastWeek');
  const [fromDate, setFromDate] = useState<Moment | null>(moment().startOf('week').day(0));
  const [toDate, setToDate] = useState<Moment | null>(moment());

  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [modelEarning, setModelEarning] = useState<ModelEarningResponse>();

  const handleFromToDateChange = (date: Moment, dateType: string) => {
    if (date?.isValid()) {
      dateType === 'from' ? setFromDate(date) : setToDate(date);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDateChange = useCallback(debounce(handleFromToDateChange, 1000), []);

  const handleChangePeriodType = (value: string) => {
    setPeriodType(value);
    switch (value) {
      case DATE_DURATION_TYPE.TODAY:
        setFromDate(moment().startOf('day'));
        setToDate(moment());
        break;
      // case DATE_DURATION_TYPE.THIS_WEEK:
      //   setFromDate(moment().startOf('week').day(0));
      //   setToDate(moment());
      //   break;
      case DATE_DURATION_TYPE.LAST_WEEK:
        setFromDate(moment().startOf('week').day(0));
        setToDate(moment());
        break;
      // case DATE_DURATION_TYPE.THIS_MONTH:
      //   setFromDate(moment().startOf('month'));
      //   setToDate(moment());
      //   break;
      case DATE_DURATION_TYPE.LAST_MONTH:
        setFromDate(moment().subtract(1, 'month').startOf('month'));
        setToDate(moment().subtract(1, 'month').endOf('month'));
        break;
      // case DATE_DURATION_TYPE.LAST_3_MONTHS:
      //   setFromDate(moment().subtract(3, 'month').startOf('day'));
      //   setToDate(moment());
      //   break;
      // case DATE_DURATION_TYPE.LAST_24_HOURS:
      //   setFromDate(moment().subtract(24, 'hours'));
      //   setToDate(moment());
      //   break;
      // case DATE_DURATION_TYPE.YESTERDAY:
      //   setFromDate(moment().subtract(1, 'day').startOf('day'));
      //   setToDate(moment().subtract(1, 'day').endOf('day'));
      //   break;
      // case DATE_DURATION_TYPE.LAST_7_DAYS:
      //   setFromDate(moment().subtract(7, 'days').startOf('day'));
      //   setToDate(moment());
      //   break;
      // case DATE_DURATION_TYPE.LAST_30_DAYS:
      //   setFromDate(moment().subtract(30, 'days').startOf('day'));
      //   setToDate(moment());
      //   break;
      // case DATE_DURATION_TYPE.THIS_YEAR:
      //   setFromDate(moment().startOf('year'));
      //   setToDate(moment());
      //   break;
      case DATE_DURATION_TYPE.LAST_YEAR:
        setFromDate(moment().subtract(1, 'year').startOf('year'));
        setToDate(moment().subtract(1, 'year').endOf('year'));
        break;
    }
  };

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      setToken({ id: data.id, token: data.token });
    };

    userToken();
  }, []);

  useEffect(() => {
    const modelEarning = async () => {
      setIsLoading(true);
      const modelData = await ModelDetailsService.getModelEarning(token.token, {
        start_date: fromDate ? fromDate.format('YYYY-MM-DD') : '',
        end_date: toDate ? toDate.format('YYYY-MM-DD') : ''
      });
      setModelEarning(modelData.data);
      setIsLoading(false);
    };
    if (token.token) {
      modelEarning();
    }
  }, [fromDate, toDate, token.token]);

  return (
    <ProfileStatiscsMainContainer>
      {isLoading ? (
        <LoaderBox>
          <CircularProgress />
        </LoaderBox>
      ) : (
        <>
          <ProfileStatiscsContainer>
            <UINewTypographyEarningsOverview color="text.secondary">
              <FormattedMessage id="EarningsOverview" />
            </UINewTypographyEarningsOverview>
            <ProfileDOBMainContainer>
              <ProfileDOBContainer>
                {periodType === DATE_DURATION_TYPE.ALL_TIME && (
                  <ProfileDOBoxMain>
                    <ProfileDOBox>
                      <CustomDatePicker
                        value={moment(fromDate, 'YYYY-MM-DD')}
                        maxDate={toDate!}
                        keyName="from"
                        handleDateChange={handleDateChange}
                      />
                    </ProfileDOBox>
                    <ProfileDOBox>
                      <CustomDatePicker
                        value={moment(toDate, 'YYYY-MM-DD')}
                        minDate={fromDate!}
                        keyName="to"
                        handleDateChange={handleDateChange}
                      />
                    </ProfileDOBox>
                  </ProfileDOBoxMain>
                )}
                <FilterTimeDropdownV2 periodType={periodType} handleChange={handleChangePeriodType} />
              </ProfileDOBContainer>
            </ProfileDOBMainContainer>
          </ProfileStatiscsContainer>
          <ProfilePieMainContainer>
            <ProfilePieContainer>
              <ProfileBackSide>
                <UINewTypography variant="buttonLargeBold" lineHeight="160%">
                  <FormattedMessage id="CurrentBalance" />
                </UINewTypography>
                <UINewTypography variant="h3">{modelEarning?.amount.toFixed(2)}</UINewTypography>
              </ProfileBackSide>

              <ProfileBackSide>
                <UINewTypography variant="buttonLargeBold" lineHeight="160%">
                  <FormattedMessage id="TotalEarnings" />
                </UINewTypography>
                <UINewTypography variant="h3">
                  {modelEarning?.earnings && modelEarning?.earnings > 0 ? modelEarning?.earnings?.toFixed(2) : 0}
                </UINewTypography>
              </ProfileBackSide>
            </ProfilePieContainer>
          </ProfilePieMainContainer>

          <ProfileTotalVisits>
            <Earnings fromDate={fromDate} toDate={toDate} />
          </ProfileTotalVisits>
        </>
      )}
    </ProfileStatiscsMainContainer>
  );
};

export default EarningOverview;
