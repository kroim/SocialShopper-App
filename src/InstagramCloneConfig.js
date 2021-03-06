import AppStyles from './AppStyles';
import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;

const InstagramCloneConfig = {
  isSMSAuthEnabled: true,
  appIdentifier: 'rn-instagram-android',
  onboardingConfig: {
    welcomeTitle: IMLocalized('Welcome to Social Shopper'),
    welcomeCaption: IMLocalized(
      '',
    ),
    walkthroughScreens: [
      {
        icon: require('../assets/images/instagram.png'),
        title: IMLocalized('Share Photos & Videos'),
        description: IMLocalized(
          'Have fun with your friends by posting cool photos and videos.',
        ),
      },
      {
        icon: require('../assets/images/photo.png'),
        title: IMLocalized('Stories'),
        description: IMLocalized('Share stories that disappear after 24h.'),
      },
      {
        icon: require('../assets/images/chat.png'),
        title: IMLocalized('Messages'),
        description: IMLocalized(
          'Communicate with your friends via private messages.',
        ),
      },
      {
        icon: require('../assets/icons/friends-unfilled.png'),
        title: IMLocalized('Group Chats'),
        description: IMLocalized(
          'Stay in touch your gang in private group chats.',
        ),
      },
      {
        icon: require('../assets/images/pin.png'),
        title: IMLocalized('Checkins'),
        description: IMLocalized(
          'Check in when posting to share your location with friends.',
        ),
      },
      {
        icon: require('../assets/images/notification.png'),
        title: IMLocalized('Get Notified'),
        description: IMLocalized(
          'Receive notifications when you get new messages and likes.',
        ),
      },
    ],
  },
  tabIcons: {
    Feed: {
      focus: AppStyles.iconSet.homefilled,
      unFocus: AppStyles.iconSet.homeUnfilled,
    },
    Discover: {
      focus: AppStyles.iconSet.search,
      unFocus: AppStyles.iconSet.search,
    },
    Chat: {
      focus: AppStyles.iconSet.commentFilled,
      unFocus: AppStyles.iconSet.commentUnfilled,
    },
    Friends: {
      focus: AppStyles.iconSet.friendsFilled,
      unFocus: AppStyles.iconSet.friendsUnfilled,
    },
    Profile: {
      focus: AppStyles.iconSet.profileFilled,
      unFocus: AppStyles.iconSet.profileUnfilled,
    },
  },
  tosLink: 'https://www.instamobile.io/eula-instachatty/',
  editProfileFields: {
    sections: [
      {
        title: IMLocalized('PUBLIC PROFILE'),
        fields: [
          {
            displayName: IMLocalized('First Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name',
          },
          {
            displayName: IMLocalized('Last Name'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: IMLocalized('Your last name'),
          },
        ],
      },
      {
        title: IMLocalized('PRIVATE DETAILS'),
        fields: [
          {
            displayName: IMLocalized('E-mail Address'),
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: IMLocalized('Your email address'),
          },
          {
            displayName: IMLocalized('Phone Number'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: IMLocalized('Your phone number'),
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized('GENERAL'),
        fields: [
          {
            displayName: IMLocalized('Allow Push Notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: true,
          },
          {
            displayName: IMLocalized('Enable Face ID / Touch ID'),
            type: 'switch',
            editable: true,
            key: 'face_id_enabled',
            value: false,
          },
        ],
      },
      {
        title: IMLocalized('Feed'),
        fields: [
          {
            displayName: IMLocalized('Autoplay Videos'),
            type: 'switch',
            editable: true,
            key: 'autoplay_video_enabled',
            value: true,
          },
          {
            displayName: IMLocalized('Always Mute Videos'),
            type: 'switch',
            editable: true,
            key: 'mute_video_enabled',
            value: true,
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Save'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized('CONTACT'),
        fields: [
          {
            displayName: IMLocalized('Address'),
            type: 'text',
            editable: false,
            key: 'push_notifications_enabled',
            value: '142 Steiner Street, San Francisco, CA, 94115',
          },
          {
            displayName: IMLocalized('E-mail us'),
            value: 'florian@instamobile.io',
            type: 'text',
            editable: true,
            key: 'email',
            placeholder: IMLocalized('Your email address'),
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Call Us'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '+16504859694',
};

export default InstagramCloneConfig;
