// Uncomment these if you want to remove firebase and add your own custom backend:
// import * as friendship from './local/friendship';
// import FriendshipAPITracker from './local/tracker';
// import FriendshipManager from './firebase/friendshipManager';
// export { friendship, FriendshipAPITracker, FriendshipManager };

// Remove these lines if you want to remove firebase and add your own custom backend:
import * as friendship from './firebase/friendship';
import FriendshipAPITracker from './firebase/tracker';
import FriendshipManager from './firebase/friendshipManager';
export { friendship, FriendshipAPITracker, FriendshipManager };
