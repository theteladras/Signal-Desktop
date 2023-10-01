import fetch from 'node-fetch';
import * as log from '../../logging/log';
import * as Errors from '../../types/errors';
import type { GiphyResponse, GiphyResponseData } from './types';

const API_KEY = 'ZsUpUm2L6cVbvei347EQNp7HrROjbOdc';

export const search = async (query: string): Promise<GiphyResponseData> => {
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
    query
  )}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(apiUrl, options);

    const jsonRes = (await res.json()) as GiphyResponse;

    return jsonRes.data;
  } catch (error) {
    log.error('locale: Error fetching gifs', Errors.toLogFormat(error));
    return [];
  }
};
