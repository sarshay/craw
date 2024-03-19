import React, { useEffect, useMemo, useState } from "react";
import axios from 'axios';
import { API_ROUTES } from '../../routes';
export async function getAuthenticatedUser(user_token) {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    if (!user_token) {
      return defaultReturnObject;
    }

    const response = await axios({
      method: 'GET',
      url: API_ROUTES.ME,
      withCredentials: true
    });
    if (response.data) {
      defaultReturnObject.authenticated = true;
      defaultReturnObject.user = response.data;
    }

    return defaultReturnObject;
  }
  catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

