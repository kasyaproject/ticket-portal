import { Response } from "express";
import mongoose from "mongoose";
import * as yup from "yup";

type Pagination = {
  totalPage: number;
  current: number;
  total: number;
};

export default {
  success(res: Response, data: any, message: string) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
    });
  },

  error(res: Response, error: unknown, message: string) {
    // Response error dari yup validasi
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        meta: {
          status: 400,
          message,
        },
        data: { [`${error.path}`]: error.errors[0] },
      });
    }

    // Response error dari mongoose
    if (error instanceof mongoose.Error) {
      return res.status(500).json({
        meta: {
          status: 500,
          message: error.message,
        },
        dara: error.name,
      });
    }

    // Response error dari mongoDB
    if ((error as any)?.code) {
      const _err = error as any;

      return res.status(500).json({
        meta: {
          status: 500,
          message: _err.errorResponse.errmsg,
        },
        dara: _err,
      });
    }

    // Response error default
    res.status(500).json({
      meta: {
        status: 500,
        message,
      },
      data: error,
    });
  },

  unauthorized(res: Response, message: string = "unauthorized") {
    res.status(403).json({
      meta: {
        status: 403,
        message,
      },
      data: null,
    });
  },

  pagination(
    res: Response,
    data: any[],
    pagination: Pagination,
    message: string
  ) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    });
  },
};
