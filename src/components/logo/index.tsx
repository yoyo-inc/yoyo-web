import React from 'react';
import { useModel } from '@umijs/max';
import defaultLogo from '@/assets/logo.png';
import { getToken } from '@/utils/token';

export default function Logo() {
  const { initialState } = useModel('@@initialState');
  const logo = initialState?.systemSetting?.logo?.resourceName
    ? '/api/resource/upload/' +
      initialState.systemSetting.logo.resourceName +
      '?token=' +
      getToken()
    : defaultLogo;

  return <img style={{ width: '32px', height: '32px' }} src={logo} alt="logo" />;
}
