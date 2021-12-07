import type { NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

export const getASingleSegmentID = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { PENDO_PSSANDBOX_SUB_ID } = process.env;
  const { PEND_CURRENT_PSSANDBOX_JWT } = process.env;
  const segmentGETUrl = `https://app.pendo.io/api/s/${PENDO_PSSANDBOX_SUB_ID}/segment`;

  axios.get(segmentGETUrl, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `pendo.sess.jwt=${PEND_CURRENT_PSSANDBOX_JWT}`,
    },
  })
    .then((data) => {
      console.log(data, 'this is my response');
      return next();
    })
    .catch((err) => {
      console.log('there was the following error', err);
    });
};

export const logSomething = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('This works!');
  return next();
};
