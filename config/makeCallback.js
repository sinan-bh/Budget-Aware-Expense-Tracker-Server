import httpStatus from "http-status-codes";
import { sentConfiguredHeaders, sentHeaders } from "./headers.js";
import dotenv from "dotenv";

dotenv.config();

const extractHeaders = (req) => ({
  "device-id": req?.headers["device-id"] ?? "",
  "app-type": req?.headers["app-type"] ?? "",
  "content-type": req?.headers["content-type"] ?? "",
  referer: req?.headers["referer"] ?? "",
  "user-agent": req?.headers["user-agent"] ?? "",
  authorization: req?.headers["authorization"] ?? "",
});

const makeCallback = (callback) => (req, res, next) => {
  // define request variables
  const fileReq = req;
  const request = {
    body: req?.body ?? {},
    query: req?.query ?? {},
    params: req?.params ?? {},
    ip: req?.ip ?? "",
    method: req?.method ?? "",
    path: req?.path ?? "",
    user: req?.user ?? {},
    cookies: req.cookies ?? {},
    headers: extractHeaders(req),
    file: fileReq.file ?? null,
    files: fileReq.files ?? null,
  };

  // success function
  const success = (response) => {
    const {
      statusCode = httpStatus.OK,
      message = httpStatus.getStatusText(statusCode),
      headers = null,
      data,
      redirect,
      cookies = [],
    } = response ?? {};

    // sent headers from controllers
    // if (headers) {
    //   sentHeaders(res, headers);
    // }
    // sent configured headers
    // sentConfiguredHeaders(res);

    // redirect if provided
    if (redirect) {
      return res.redirect(statusCode, redirect);
    }

    // send the response data
    res.status(statusCode).send({ statusCode, message, data });
  };
  // invoke callback function, then handle response, catch error if any

  callback(request).then(success).catch(next);
};

export default makeCallback;
