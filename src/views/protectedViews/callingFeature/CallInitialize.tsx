'use client';
import { useEffect } from 'react';
// import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import { useSession } from 'next-auth/react';
import { User } from 'app/(guest)/layout';
import { ErrorMessage } from 'constants/common.constants';
import { toast } from 'react-toastify';
// import { UIKitSettingsBuilder } from '@cometchat/uikit-shared';
import { loadCometChatUIKit, loadUIKitSettingsBuilder } from '../../../../context/CallFeatureContext';

export const COMETCHAT_CONSTANTS = {
  APP_ID: process.env.NEXT_PUBLIC_COMET_CHAT_APP_ID!,
  REGION: process.env.NEXT_PUBLIC_COMET_CHAT_REGION!,
  AUTH_KEY: process.env.NEXT_PUBLIC_COMET_CHAT_AUTH_KEY!
};

const CallInitialize = () => {
  const token = useSession();
  const modelUser = (token?.data?.user as User)?.picture;
  const modelUsername = modelUser && JSON.parse(modelUser);

  const isModel = (token?.data?.user as User)?.provider === 'providerModel';

  useEffect(() => {
    const init = async () => {
      try {
        const UIKitSettingsBuilder = await loadUIKitSettingsBuilder();
        const UIKitSettings = new UIKitSettingsBuilder()
          .setAppId(COMETCHAT_CONSTANTS.APP_ID)
          .setRegion(COMETCHAT_CONSTANTS.REGION)
          .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
          .subscribePresenceForAllUsers()
          .build();
        const CometChatUIKit = await loadCometChatUIKit();
        await CometChatUIKit.init(UIKitSettings);
        if (isModel && modelUsername) {
          let user = await CometChatUIKit.getLoggedinUser();

          if (!user && modelUsername.user_name && isModel) {
            user = await CometChatUIKit.login(modelUsername.user_name);
          }

          CometChatUIKit.getLoggedinUser().then((user) => {
            if (!user && modelUsername.user_name && isModel) {
              CometChatUIKit.login(modelUsername.user_name);
            }
          });
        }
      } catch (e) {
        toast.error(ErrorMessage);
      }
    };
    init();
  }, [modelUsername, isModel]);

  return <></>;
};

export default CallInitialize;
