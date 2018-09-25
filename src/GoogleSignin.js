import React, { Component } from 'react';

import { NativeModules, Platform } from 'react-native';

const { RNGoogleSignin } = NativeModules;

const IS_IOS = Platform.OS === 'ios';

export const statusCodes = {
  SIGN_IN_CANCELLED: 13,
  IN_PROGRESS: 1,
  PLAY_SERVICES_NOT_AVAILABLE: 2,
  SIGN_IN_REQUIRED: 3,
};

class GoogleSignin {
  configPromise;

  async signIn() {
    await this.configPromise;
    return await RNGoogleSignin.signIn();
  }

  async hasPlayServices(options = { showPlayServicesUpdateDialog: true }) {
    if (IS_IOS) {
      return true;
    } else {
      if (options && options.showPlayServicesUpdateDialog === undefined) {
        throw new Error(
          'RNGoogleSignin: Missing property `showPlayServicesUpdateDialog` in options object for `hasPlayServices`'
        );
      }
      return RNGoogleSignin.playServicesAvailable(options.showPlayServicesUpdateDialog);
    }
  }

  configure(options = {}) {
    if (options.offlineAccess && !options.webClientId) {
      throw new Error('RNGoogleSignin: offline use requires server web ClientID');
    }

    this.configPromise = RNGoogleSignin.configure(options);
  }

  async signInSilently() {
    await this.configPromise;
    return RNGoogleSignin.signInSilently();
  }

  async signOut() {
    return RNGoogleSignin.signOut();
  }

  async revokeAccess() {
    return RNGoogleSignin.revokeAccess();
  }

  async isSignedIn() {
    return RNGoogleSignin.isSignedIn();
  }
}

export const GoogleSigninSingleton = new GoogleSignin();
