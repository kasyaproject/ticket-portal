import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interface";
import BannerModel, { bannerDAO, TypeBanner } from "../models/banner.model";
import response from "../utils/response";
import { FilterQuery, isValidObjectId } from "mongoose";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      await bannerDAO.validate(req.body);

      const result = await BannerModel.create(req.body);

      response.success(res, result, "Banner created successfully");
    } catch (error) {
      response.error(res, error, "Failed to create banner");
    }
  },

  async findAll(req: IReqUser, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query: FilterQuery<TypeBanner> = {};

      if (search) {
        Object.assign(query, {
          ...query,
          $text: {
            $search: search,
          },
        });
      }

      const result = await BannerModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      if (!result) {
        return response.notFound(res, "No banners found");
      }

      const count = await BannerModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          total: count,
          current: page,
          totalPage: Math.ceil(count / limit),
        },
        "Banners retrieved successfully"
      );
    } catch (error) {
      response.error(res, error, "Failed to find all banners");
    }
  },

  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Banner not found");
      }

      const result = await BannerModel.findById(id);

      if (!result) {
        return response.notFound(res, "Banner not found");
      }

      response.success(res, result, "Banner retrieved successfully");
    } catch (error) {
      response.error(res, error, "Failed to find banner");
    }
  },

  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Banner not found");
      }

      const result = await BannerModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) {
        return response.notFound(res, "Banner not found");
      }

      response.success(res, result, "Banner updated successfully");
    } catch (error) {
      response.error(res, error, "Failed to update banner");
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Banner not found");
      }

      const result = await BannerModel.findByIdAndDelete(id, {
        new: true,
      });

      if (!result) {
        return response.notFound(res, "Banner not found");
      }

      response.success(res, result, "Banner removed successfully");
    } catch (error) {
      response.error(res, error, "Failed to remove banner");
    }
  },
};
