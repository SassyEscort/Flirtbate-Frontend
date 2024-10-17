'use client';
import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
// import { CometChatUIKitConstants } from '@cometchat/uikit-resources';
// import { Call, CometChat } from '@cometchat/chat-sdk-javascript';
import { Call } from '@cometchat/chat-sdk-javascript';
import { toast } from 'react-toastify';
import { TokenIdType } from 'views/protectedModelViews/verification';
import { getUserDataClient } from 'utils/getSessionData';
import { CallingService, CreditCallRes } from 'services/calling/calling.services';
import { CALLING_STATUS } from 'constants/callingConstants';
// import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import { useSession } from 'next-auth/react';
import { User } from 'app/(guest)/layout';
import { ErrorMessage } from 'constants/common.constants';
import { COMETCHAT_CONSTANTS } from 'views/protectedViews/callingFeature/CallInitialize';
// import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import UIStyledDialog, { ModelCreditsUIStyledDialog } from 'components/UIComponents/UIStyledDialog';
import ModelCredits from 'views/protectedViews/Credites/ModelCredits';
import { usePathname, useSearchParams } from 'next/navigation';
import CreditsAdded from 'views/protectedViews/CreditsAdded/CreditsAdded';
import { useRouter } from 'next/navigation';
// import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';
import { gaEventTrigger } from 'utils/analytics';
import { ModelDetailsService } from 'services/modelDetails/modelDetails.services';
import VideoCallEnded from 'views/protectedViews/videoCalling/VideoCallEnded';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { CustomerDetailsService } from 'services/customerDetails/customerDetails.services';
import { ROLE } from 'constants/workerVerification';

interface CallFeatureContextProps {
  call: CometChat.Call | undefined;
  handleCancelCall: () => void;
  handleCallInitiate: (
    guestId: number,
    isCallIniate: boolean,
    callTime: number,
    modelName: string,
    modelPhoto: string,
    userName: string,
    modelPrice: string,
    isFavourite: number
  ) => void;
  handelNameChange: () => void;
  isNameChange: boolean;
  isCallAccepted: boolean;
  isCustomer: boolean;
  isCallIncoming: boolean;
  modelName: string;
  modelPhoto: string;
  modelUsername: string;
  isLoading: boolean;
  isCallEnded: boolean;
  isBusy: boolean;
  handleBusyClose: () => void;
  avaialbleCredits: number;
  getToken: (token: TokenIdType) => void;
  handleOpen: () => void;
  modelCreditPrice: string;
  handleCallEnd: () => void;
  isModelAvailable: number;
  handleModelOfflineClose: () => void;
  user: string | undefined;
  isUnanswered: boolean;
  isFavouriteModel: number;
  handelIsFavouriteModelChange: (val: number) => void;
}

const CallContext = createContext<CallFeatureContextProps>({
  call: undefined,
  handleCancelCall: () => {},
  handleCallInitiate: () => {},
  handelNameChange: () => {},
  isNameChange: false,
  isCallAccepted: false,
  isCustomer: false,
  isCallIncoming: false,
  modelName: '',
  modelPhoto: '',
  modelUsername: '',
  isBusy: false,
  handleBusyClose: () => {},
  isLoading: false,
  isCallEnded: false,
  avaialbleCredits: 0,
  getToken: () => {},
  handleOpen: () => {},
  modelCreditPrice: '',
  handleCallEnd: () => {},
  isModelAvailable: 0,
  handleModelOfflineClose: () => {},
  user: '',
  isUnanswered: false,
  isFavouriteModel: 0,
  handelIsFavouriteModelChange: (val: number) => {}
});

export async function loadUIKitSettingsBuilder() {
  const { UIKitSettingsBuilder } = await import('@cometchat/uikit-shared');
  return UIKitSettingsBuilder;
}

async function loadUIKitResource() {
  const { CometChatUIKitConstants } = await import('@cometchat/uikit-resources');
  return CometChatUIKitConstants;
}

async function loadCometChatCalls() {
  const { CometChatCalls } = await import('@cometchat/calls-sdk-javascript');
  return CometChatCalls;
}

export async function loadCometChatUIKit() {
  const { CometChatUIKit } = await import('@cometchat/chat-uikit-react');
  return CometChatUIKit;
}

async function loadCometChatModules() {
  const { Call, CometChat } = await import('@cometchat/chat-sdk-javascript');
  return { Call, CometChat };
}

export const CallFeatureProvider = ({ children }: { children: ReactNode }) => {
  const tokenCometChat = useSession();
  const intl = useIntl();
  const user = (tokenCometChat?.data?.user as User)?.picture;
  const userNameData = user && JSON.parse(user);

  const providerData = JSON.parse(user || '{}');

  const isCustomer = providerData?.role === ROLE.CUSTOMER;

  const searchParams = useSearchParams();
  const credit = searchParams.get('credit');
  const totalBal = searchParams.get('total_credits_after_txn');
  const totalBalValue = searchParams.get('total_amount_after_txn');

  const path = usePathname();
  const userName = path.split('/')[2];

  const customerInfo = {
    email: providerData?.customer_email,
    name: providerData?.customer_name,
    username: providerData?.customer_user_name,
    model_username: userName
  };

  const [call, setCall] = useState<CometChat.Call | undefined>(undefined);
  const [modelId, setModelId] = useState(0);
  const [token, setToken] = useState<TokenIdType>({ id: 0, token: '' });
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [endCallTime, setEndCallTime] = useState(180000);
  const [sessionId, setSessionId] = useState('');
  const [isCallIncoming, setIsCallIncoming] = useState(false);
  const [modelName, setModelName] = useState('');
  const [modelPhoto, setModelPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOutOfCredits, setIsOutOfCredits] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [addedCredits, setAddedCredits] = useState(0);
  const [balance, setBalance] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [avaialbleCredits, setAvailableCredits] = useState(0);
  const [isNameChange, setIsNameChange] = useState(false);
  const [modelCreditPrice, setModelCreditPrice] = useState('');
  const [isModelAvailable, setIsModelAvailable] = useState(1);
  const [isUnanswered, setIsUnanswered] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [callLogId, setCallLogId] = useState(0);
  const [isCreditAvailable, setIsCreditAvailable] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [modelUsername, setModelUsername] = useState('');
  const [isFavouriteModel, setIsFavouriteModel] = useState(0);

  const modelObj = {
    modelId: modelId,
    modelName: modelName,
    modelPhoto: modelPhoto,
    modelUsername: modelUsername,
    isCreditAvailable: isCreditAvailable,
    callTime: callTime,
    modelCreditPrice: modelCreditPrice,
    isFavouriteModel: isFavouriteModel
  };

  const pathname = usePathname();
  const router = useRouter();
  const init = useCallback(async () => {
    try {
      const CometChatUIKit = await loadCometChatUIKit();
      const UIKitSettingsBuilder = await loadUIKitSettingsBuilder();
      const UIKitSettings = new UIKitSettingsBuilder()
        .setAppId(COMETCHAT_CONSTANTS.APP_ID)
        .setRegion(COMETCHAT_CONSTANTS.REGION)
        .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
        .subscribePresenceForAllUsers()
        .build();

      await CometChatUIKit.init(UIKitSettings);
      let user = await CometChatUIKit.getLoggedinUser();

      if (!user && userNameData && isCustomer) {
        user = await CometChatUIKit.login(userNameData?.customer_user_name);
      }

      CometChatUIKit.getLoggedinUser().then((user) => {
        if (!user && userNameData && isCustomer) {
          CometChatUIKit.login(userNameData?.customer_user_name);
        }
      });
    } catch (e) {
      toast.error(ErrorMessage);
    }
  }, [userNameData, isCustomer]);

  const handelNameChange = () => {
    setIsNameChange(!isNameChange);
  };

  const handelIsFavouriteModelChange = async (val: number) => {
    setIsFavouriteModel(val);
    if (val && token?.token && modelId) await CustomerDetailsService.favouritePutId(modelId, token?.token);
  };

  const handleCancelCall = async () => {
    const { CometChat } = await loadCometChatModules();
    await creditPutCallLog(modelId, sessionId, CALLING_STATUS.CANCELED, ROLE.CUSTOMER);
    await CometChat.rejectCall(sessionId, CometChat.CALL_STATUS.CANCELLED);
    setCall(undefined);
  };

  const getToken = (token: TokenIdType) => {
    setToken(token);
  };

  const getCometChatInfo = async () => {
    if (modelId && token.token) {
      const getInfo = await CallingService.getCometChatInfo(modelId, token.token);
      if (getInfo?.data?.time_unit === 'minutes' && getInfo?.data?.available_call_duration >= 1) {
        const durationInSeconds = moment.duration(getInfo?.data?.available_call_duration, 'minutes').asMilliseconds();
        setCallTime(durationInSeconds);
        setIsCreditAvailable(true);
      } else {
        setIsCreditAvailable(false);
      }
    }
  };

  const handleCallInitiate = async (
    guestId: number,
    isCreditAvailable: boolean,
    callTime: number,
    modelName: string,
    modelPhoto: string,
    userName: string,
    modelPrice: string,
    isFavourite: number
  ) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
      if (stream) {
        setModelCreditPrice(modelPrice);
        setModelId(guestId);
        setModelName(modelName);
        setModelPhoto(modelPhoto);
        setModelUsername(userName);
        setIsFavouriteModel(isFavourite || 0);
        const isModelAvailable = await ModelDetailsService.getModelDetails(token.token, isCustomer, { user_name: userName || '' });

        if (guestId && isCreditAvailable && !call && Boolean(token.token) && isModelAvailable.data.is_online) {
          const isModelBusy = await CallingService.getModelCallStatus(guestId, token.token);
          if (isModelBusy.data.ongoing_calls) {
            gaEventTrigger('Model_busy', {
              action: 'Model_busy',
              category: 'Button',
              label: 'Model_busy',
              value: JSON.stringify(customerInfo)
            });
            setIsBusy(true);
          } else {
            setIsLoading(true);
            await init();
            setEndCallTime(callTime);
            const { CometChat } = await loadCometChatModules();
            const CometChatUIKitConstants = await loadUIKitResource();
            const callObject = new CometChat.Call(
              userName,
              CometChatUIKitConstants.MessageTypes.video,
              CometChatUIKitConstants.MessageReceiverType.user
            );
            gaEventTrigger('Video_call_initiated', {
              action: 'Video_call_initiated',
              category: 'Button',
              label: 'Video_call_initiated',
              value: JSON.stringify(customerInfo)
            });
            const callInitiate = await CometChat.initiateCall(callObject);
            setCall(callInitiate);
            setSessionId(callInitiate.getSessionId());
            setIsCallEnded(false);
            await creditPutCallLog(guestId, callInitiate.getSessionId(), '');
            setIsLoading(false);
          }
        } else if (call) {
          toast.error(intl.formatMessage({ id: 'PleaseEndYour' }));
          setIsLoading(false);
        } else if (!isModelAvailable.data.is_online) {
          gaEventTrigger('Video_call_unanswered', {
            action: 'Video_call_unanswered',
            category: 'Button',
            label: 'Video_call_unanswered',
            value: JSON.stringify(customerInfo)
          });
          const missedParams = {
            model_id: guestId,
            status: CALLING_STATUS.UNASWERED
          };
          setIsModelAvailable(isModelAvailable.data.is_online);
          await CallingService.missedCallStatus(missedParams, token.token);
        } else {
          const creditInfoEvent = {
            email: providerData?.customer_email,
            name: providerData?.customer_name,
            username: providerData?.customer_user_name,
            model_username: userName,
            is_credit_over: false,
            source: 'Video calling model'
          };
          gaEventTrigger('Credits_Purchase_Popup_open', {
            action: 'Credits_Purchase_Popup_open',
            category: 'Dialog',
            label: 'Credits_Purchase_Popup_open',
            value: JSON.stringify(creditInfoEvent)
          });
          setOpen(true);
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.code) {
        gaEventTrigger('Uid_Not_Found', {
          action: 'Uid_Not_Found',
          category: 'Button',
          label: 'Uid_Not_Found',
          value: modelId
        });
        toast.error(intl.formatMessage({ id: ErrorMessage }));
      } else {
        toast.error(intl.formatMessage({ id: 'PermissionForAudioAndVideo' }));
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSuccess(false);
    router.push(pathname);
  };

  const handleOpen = () => setOpen(true);

  const handleBusyClose = () => setIsBusy(false);

  const handleCallEnd = () => setIsCallEnded(false);

  const handleReviewClose = (isPreventReload?: boolean) => {
    setReviewOpen(false);
    if (!isPreventReload) window.location.reload();
  };

  const handleModelOfflineClose = () => setIsModelAvailable(1);

  const creditPutCallLog = async (
    model_id: number,
    comet_chat_session_id: string,
    status: string,
    ended_by?: string
  ): Promise<CreditCallRes | undefined> => {
    const creditLog = {
      model_id: model_id,
      comet_chat_session_id: comet_chat_session_id,
      status: status,
      ended_by: ended_by
    };
    if (token.token && model_id) {
      const creditLogData = await CallingService.creditPutCallLog(creditLog, token.token);
      if (call && (creditLogData.end_call || status === CALLING_STATUS.ENDED)) {
        const CometChatCalls = await loadCometChatCalls();
        const { CometChat } = await loadCometChatModules();
        gaEventTrigger('Video_call_ended', {
          action: 'Video_call_ended',
          category: 'Button',
          label: 'Video_call_ended',
          value: JSON.stringify(customerInfo)
        });
        setCall(undefined);
        setCallLogId(creditLogData.id);
        setIsCallAccepted(false);
        await CometChat.endCall(call.getSessionId());
        CometChatCalls.endSession();
        await getCometChatInfo();
        setAvailableCredits(creditLogData.available_credits);
        setReviewOpen(true);
        if (isCustomer && creditLogData.out_of_credits) {
          const creditInfoEvent = {
            email: providerData?.customer_email,
            name: providerData?.customer_name,
            username: providerData?.customer_user_name,
            model_username: userName,
            is_credit_over: true,
            is_new_purchase: false,
            source: 'Video calling model'
          };
          gaEventTrigger('Credits_Purchase_Popup_open', {
            action: 'Credits_Purchase_Popup_open',
            category: 'Dialog',
            label: 'Credits_Purchase_Popup_open',
            value: JSON.stringify(creditInfoEvent)
          });
          setIsOutOfCredits(true);
          setOpen(true);
          const CometChatUIKit = await loadCometChatUIKit();
          await CometChatUIKit.logout();
        }
      }
      return creditLogData;
    }
  };

  useEffect(() => {
    cometChatCallEventListner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomer, modelId, sessionId]);

  const cometChatCallEventListner = async () => {
    const CometChatCalls = await loadCometChatCalls();
    CometChatCalls.addCallEventListener(String(modelId), {
      onUserJoined: async () => {
        await creditPutCallLog(modelId, sessionId, '');
      },
      onCallEnded: async () => {
        const { CometChat } = await loadCometChatModules();
        setIsCallAccepted(false);
        setCall(undefined);
        setIsCallEnded(true);
        CometChat.removeUserListener(String(modelId));
        if (isCustomer) {
          const endCallData = await creditPutCallLog(modelId, sessionId, CALLING_STATUS.ENDED, ROLE.MODEL);
          if (endCallData) {
            setAvailableCredits(endCallData.available_credits);
          }
          const CometChatUIKit = await loadCometChatUIKit();
          await CometChatUIKit.logout();
        }
      },
      onCallEndButtonPressed: async () => {
        const { CometChat } = await loadCometChatModules();
        setIsCallAccepted(false);
        setCall(undefined);
        setIsCallEnded(true);
        CometChat.removeUserListener(String(modelId));
        if (isCustomer) {
          const endCallData = await creditPutCallLog(modelId, sessionId, CALLING_STATUS.ENDED, ROLE.CUSTOMER);
          if (endCallData) {
            setAvailableCredits(endCallData.available_credits);
          }
          const CometChatUIKit = await loadCometChatUIKit();
          await CometChatUIKit.logout();
        }
      }
    });
    return () => CometChatCalls.removeCallEventListener(String(modelId));
  };

  const cometChatCallListener = async () => {
    const { CometChat } = await import('@cometchat/chat-sdk-javascript');
    const callListener = new CometChat.CallListener({
      onIncomingCallReceived: async (call: Call) => {
        setIsCallIncoming(true);
        setSessionId(call.getSessionId());
      },
      onOutgoingCallAccepted: async () => {
        gaEventTrigger('Video_call_started', {
          action: 'Video_call_started',
          category: 'Button',
          label: 'Video_call_started',
          value: JSON.stringify(customerInfo)
        });
        setIsCallAccepted(true);
      },
      onOutgoingCallRejected: async (call: Call) => {
        if (call.getStatus() === CALLING_STATUS.BUSY) {
          setIsBusy(true);
        }
        setCall(undefined);
        setIsUnanswered(true);
        gaEventTrigger('Video_call_unanswered', {
          action: 'Video_call_unanswered',
          category: 'Button',
          label: 'Video_call_unanswered',
          value: JSON.stringify(customerInfo)
        });
        await creditPutCallLog(modelId, call.getSessionId(), CALLING_STATUS.UNASWERED, ROLE.MODEL);
        setEndCallTime(180000);
        if (isCustomer) {
          const CometChatUIKit = await loadCometChatUIKit();
          await CometChatUIKit.logout();
        }
      },
      onIncomingCallCancelled: async (call: Call) => {
        setCall(undefined);
        gaEventTrigger('Video_call_canceled', {
          action: 'Video_call_canceled',
          category: 'Button',
          label: 'Video_call_canceled',
          value: JSON.stringify(customerInfo)
        });
        await creditPutCallLog(modelId, call.getSessionId(), CALLING_STATUS.CANCELED);
        setEndCallTime(180000);
        if (isCustomer) {
          const CometChatUIKit = await loadCometChatUIKit();
          await CometChatUIKit.logout();
        }
      },
      onCallEndedMessageReceived: async (call: Call) => {
        setIsCallAccepted(false);
        setCall(undefined);
        CometChat.removeUserListener(String(modelId));
        await CometChat.endCall(call.getSessionId());
        setIsCallEnded(true);
        if (isCustomer) {
          const endCallData = await creditPutCallLog(modelId, call.getSessionId(), CALLING_STATUS.ENDED, ROLE.MODEL);
          if (endCallData) {
            setAvailableCredits(endCallData.available_credits);
          }
          const CometChatUIKit = await loadCometChatUIKit();
          await CometChatUIKit.logout();
        }
      }
    });

    CometChat.addCallListener(String(modelId), callListener);

    return () => {
      CometChat.removeCallListener(String(modelId));
    };
  };

  useEffect(() => {
    cometChatCallListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelId, isCustomer, call]);

  useEffect(() => {
    const userToken = async () => {
      const data = await getUserDataClient();
      if (data) {
        setToken({ id: data.id, token: data.token });
      }
    };
    userToken();
  }, []);

  useEffect(() => {
    setBalance(Number(totalBal));
    setBalance(Number(totalBalValue));
    setAddedCredits(Number(credit));
    if (credit) {
      setOpenSuccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (credit) {
      gaEventTrigger(
        'purchase',
        {
          action: 'purchase',
          category: 'Page change',
          label: 'purchase',
          value: JSON.stringify(customerInfo)
        },
        Number(totalBalValue)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (isCallAccepted && isCustomer) {
        try {
          const endCall = await creditPutCallLog(modelId, sessionId, '');
          if (endCall && endCall.end_call) {
            setIsCallEnded(true);
            clearInterval(intervalId);
            return;
          }
        } catch (error) {
          toast.error(ErrorMessage);
        }
      }
    }, 60000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCallAccepted, isCustomer, modelId, sessionId, isCallEnded]);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (isCallAccepted || isCallEnded) {
        setCall(undefined);
        setIsCallAccepted(false);
        setIsCallEnded(true);
        const { CometChat } = await loadCometChatModules();
        await CometChat.endCall(sessionId);
        const CometChatCalls = await loadCometChatCalls();
        CometChatCalls.endSession();
        if (isCustomer) {
          const endCallData = await creditPutCallLog(modelId, sessionId, CALLING_STATUS.ENDED);
          if (endCallData) {
            setAvailableCredits(endCallData.available_credits);
          }
          setOpen(true);
          const CometChatUIKit = await loadCometChatUIKit();
          await CometChatUIKit.logout();
          return;
        }
      }
    }, endCallTime);

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCallAccepted, isCallEnded, isCustomer, modelId, sessionId]);

  return (
    <CallContext.Provider
      value={{
        call,
        handleCancelCall,
        handleCallInitiate,
        handelNameChange,
        isNameChange,
        isCallAccepted,
        isCustomer,
        isCallIncoming,
        modelName,
        modelPhoto,
        modelUsername,
        isCallEnded,
        isBusy,
        handleBusyClose,
        isLoading,
        avaialbleCredits,
        getToken,
        handleOpen,
        modelCreditPrice,
        handleCallEnd,
        isModelAvailable,
        handleModelOfflineClose,
        user,
        isUnanswered,
        isFavouriteModel,
        handelIsFavouriteModelChange
      }}
    >
      {children}
      <ModelCreditsUIStyledDialog open={open} maxWidth="md" fullWidth scroll="body">
        <ModelCredits
          onClose={handleClose}
          isOutOfCredits={isOutOfCredits}
          userName={userName}
          modelCreditPrice={Number(modelCreditPrice)}
        />
      </ModelCreditsUIStyledDialog>
      <UIStyledDialog open={openSuccess} maxWidth="md" fullWidth scroll="body">
        <CreditsAdded addedCredits={addedCredits} newBalance={balance} onClose={handleClose} isOutOfCredits={isOutOfCredits} />
      </UIStyledDialog>
      <VideoCallEnded open={reviewOpen} onClose={handleReviewClose} callLogId={callLogId} modelObj={modelObj} />
    </CallContext.Provider>
  );
};

export const useCallFeatureContext = (): CallFeatureContextProps => {
  const context = useContext(CallContext);
  return context;
};
