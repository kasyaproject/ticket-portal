import { Request, Response } from "express";
import response from "../utils/response";
import CategoryModel, { categoryDAO } from "../models/category.model";
import { IPaginationQuery, IReqUser } from "../utils/interface";

export default {
  async create(req: Request, res: Response) {
    try {
      await categoryDAO.validate(req.body); // validasi terhadap Yup yang ada di model
      const result = await CategoryModel.create(req.body); // buat data category baru

      response.success(res, result, "Success create category");
    } catch (error) {
      response.error(res, error, "Failed create Category");
    }
  },

  async findAll(req: Request, res: Response) {
    const {
      page = 1,
      limit = 10,
      search,
    } = req.query as unknown as IPaginationQuery;

    try {
      const query = {};

      // pencarian berdasarkan keyword
      if (search) {
        Object.assign(query, {
          $or: [
            {
              name: { $regex: search, $options: "i" },
            },
            {
              description: { $regex: search, $options: "i" },
            },
          ],
        });
      }

      const result = await CategoryModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      const total = await CategoryModel.countDocuments(query);

      response.pagination(
        res,
        result,
        { total, totalPage: Math.ceil(total / limit), current: page },
        "Success find all category"
      );
    } catch (error) {
      response.error(res, error, "Failed find all Category");
    }
  },

  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoryModel.findById(id);

      if (!result) return response.error(res, null, "Category not found");

      response.success(res, result, "Success find one category");
    } catch (error) {
      response.error(res, error, "Failed find Category");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) return response.error(res, null, "Category not found");

      response.success(res, result, "Success update category");
    } catch (error) {
      response.error(res, error, "Failed update Category");
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoryModel.findByIdAndDelete(id);

      if (!result) return response.error(res, null, "Category not found");

      response.success(res, result, "Success delete category");
    } catch (error) {
      response.error(res, error, "Failed delete Category");
    }
  },
};
