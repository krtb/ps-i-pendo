import type { NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

const {
  PENDO_PSSANDBOX_SUB_ID,
  POST_SEGMENTS_HERE_SUB_ID,
  PENDO_CURRENT_PSSANDBOX_JWT,
} = process.env;
const pendoDomain = 'https://app.pendo.io';
const getAllSegmentsEndpoint = `${pendoDomain}/api/s/${PENDO_PSSANDBOX_SUB_ID}/segment`;
const postCreateNewSegmentEndpoint = `${pendoDomain}/api/s/${POST_SEGMENTS_HERE_SUB_ID}/segment`;

export const getSegmentsFromUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  axios.get(getAllSegmentsEndpoint, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `pendo.sess.jwt=${PENDO_CURRENT_PSSANDBOX_JWT}`,
    },
  })
    .then((response) => {
      res.locals.originalSegments = response.data;
      next();
    })
    .catch((err) => {
      console.log('problem with getting all segments ...', err);
    });
};

export const postNewSegments = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { originalSegments } = res.locals;
  // TODO: Check if you can remove 1 level of mapping. May not be needed.
  const mySegments = originalSegments.map((aSingleSegment: any) => {
    const aSegmentObject = {
      id: 'id',
      name: 'name',
      flagName: 'flagName',
      shared: 'shared',
      definition: 'definition',
      pipeline: 'pipeline',
    };
    // TODO: Do I need an id?
    aSegmentObject.id = aSingleSegment.id;
    aSegmentObject.name = aSingleSegment.name;
    aSegmentObject.flagName = aSingleSegment.flagName;
    aSegmentObject.shared = aSingleSegment.shared;
    aSegmentObject.definition = aSingleSegment.definition;
    aSegmentObject.pipeline = aSingleSegment.pipeline;

    return aSegmentObject;
  });

  mySegments.map((aSingleSegmentObject: any) => {
    const data = {
      name: aSingleSegmentObject.name,
      flagName: aSingleSegmentObject.flagName,
      definition: aSingleSegmentObject.definition,
      pipeline: aSingleSegmentObject.pipeline,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `pendo.sess.jwt=${PENDO_CURRENT_PSSANDBOX_JWT}`,
      },
    };

    return axios.post(postCreateNewSegmentEndpoint, data,config)
      .then((response) => {
        // TODO: add count for segment amount migrated.
        console.log(response, '----------------> MIGRATED SEGMENTS.');
        next();
      })
      .catch((err) => {
        console.log('there was the following error', err.response);
      });
  });
};

export const logSomething = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('This works!');
  next();
};
