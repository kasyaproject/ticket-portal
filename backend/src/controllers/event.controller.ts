import { Response } from "express";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";
import EventModel, { eventDAO, TypeEvent } from "../models/event.model";
import { FilterQuery, isValidObjectId } from "mongoose";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      const payload = { ...req.body, createdBy: req.user?.id } as TypeEvent;

      await eventDAO.validate(payload);
      const result = await EventModel.create(payload);

      response.success(res, result, "Success Create an Event");
    } catch (error) {
      response.error(res, error, "Failed to Create Event!");
    }
  },

  async findAll(req: IReqUser, res: Response) {
    try {
      const buildQuery = (filter: any) => {
        let query: FilterQuery<TypeEvent> = {};

        if (filter.search) query.$text = { $search: filter.search };
        if (filter.category) query.category = filter.category;
        if (filter.isOnline) query.isOnline = filter.isOnline;
        if (filter.isFetured) query.isFetured = filter.isFetured;
        if (filter.isPublish) query.isPublish = filter.isPublish;

        return query;
      };

      const {
        limit = 10,
        page = 1,
        search,
        category,
        isOnline,
        isFetured,
        isPublish,
      } = req.query;

      const query = buildQuery({
        search,
        category,
        isOnline,
        isFetured,
        isPublish,
      });

      const result = await EventModel.find(query)
        .limit(+limit)
        .skip((+page - 1) * +limit)
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      if (!result) return response.notFound(res, "Event not found!");

      const total = await EventModel.countDocuments(query);

      response.pagination(
        res,
        result,
        { total, totalPage: Math.ceil(total / +limit), current: +page },
        "Success Find All Event"
      );
    } catch (error) {
      response.error(res, error, "Failed to get all Event!");
    }
  },

  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Event not found");
      }

      const result = await EventModel.findById(id);

      if (!result) return response.notFound(res, "Event not found!");

      response.success(res, result, "Success Find Event");
    } catch (error) {
      response.error(res, error, "Failed to find Event!");
    }
  },

  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Event not found");
      }

      const result = await EventModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) return response.notFound(res, "Event not found!");

      response.success(res, result, "Success Update an Event");
    } catch (error) {
      response.error(res, error, "Failed Update an Event!");
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "Event not found");
      }

      const result = await EventModel.findByIdAndDelete(id, {
        new: true,
      });

      if (!result) return response.notFound(res, "Event not found!");

      response.success(res, result, "Success Delete an Event");
    } catch (error) {
      response.error(res, error, "Failed Delete an Event!");
    }
  },

  async findOneBySlug(req: IReqUser, res: Response) {
    try {
      const { slug } = req.params;

      const result = await EventModel.findOne({ slug });

      if (!result) return response.notFound(res, "Event not found!");

      response.success(res, result, "Success Find an Event");
    } catch (error) {
      response.error(res, error, "Failed to Find Event!");
    }
  },
};
