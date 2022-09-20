import React from 'react';

export enum LOADING_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  FAIL,
}

const zfill = (data: any) => String(data).padStart(2, '0');

const BASE_API = 'https://en.wikipedia.org/api/rest_v1/feed/onthisday/all';
// https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/01/01

export const getDateUrl = (date: Date = new Date()): string => {
  const day = zfill(date.getDate());
  const month = zfill(date.getMonth() + 1);
  return `${BASE_API}/${month}/${day}`;
}

export interface ResponsePage {
  thumbnail?: {
    source: string;
  };
  extract: string;
  timestamp: string;
  description: string;
  desktop?: {
    page: string;
  };
}

interface ResponsePageSet {
  text: string;
  pages: ResponsePage[];
}

export type ApiResponse = {[index: string]: ResponsePageSet[]};

interface Props {
  onError(): void;
}

interface HookResponse {
  sync(): void;
  status: LOADING_STATUS;
  data: ApiResponse | null;
}

export const useWikipediaData = ({
  onError,
}: Props): HookResponse => {

  const [status, setStatus] = React.useState<LOADING_STATUS>(LOADING_STATUS.IDLE);
  const [apiResponse, setApiResponse] = React.useState<ApiResponse | null>(null);
  const [performRequest, setPerformRequest] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (performRequest) {
      setStatus(LOADING_STATUS.LOADING);
      fetch(getDateUrl())
        .then((response: Response) => response.json())
        .then((response: ApiResponse) => {
          setStatus(LOADING_STATUS.SUCCESS);
          setApiResponse(response);
          setPerformRequest(false);
        }).catch(() => {
          setStatus(LOADING_STATUS.FAIL);
          setPerformRequest(false);
          onError();
        })
    }
  // eslint-disable-next-line
  }, [performRequest]);

  return {
    sync: () => setPerformRequest(true),
    status,
    data: apiResponse,
  };

}
