import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interface";
import response from "../utils/response";
import EventModel, { eventDAO, TEvent } from "../models/event.model";
import { FilterQuery, isValidObjectId } from "mongoose";

export default {
  async create(req: IReqUser, res: Response) {
    /*
      #swagger.tags = ['Events']
      #swagger.security = [{
        "bearerAuth": {}
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/EventRequest"
        }
      }
    */
    try {
      const payload = { ...req.body, createdBy: req.user?.id } as TEvent;

      await eventDAO.validate(payload);
      const result = await EventModel.create(payload);

      response.success(res, result, "Success Create an Event");
    } catch (error) {
      response.error(res, error, "Failed to Create Event!");
    }
  },

  async findAll(req: IReqUser, res: Response) {
    /*
      #swagger.tags = ['Events']
    */
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query: FilterQuery<TEvent> = {};

      // if (search) {
      //   Object.assign(query, {
      //     ...query,
      //     $text: {
      //       $search: search,
      //     },
      //   });
      // }
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

      const result = await EventModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      if (!result) return response.notFound(res, "Event not found!");

      const total = await EventModel.countDocuments(query);

      response.pagination(
        res,
        result,
        { total, totalPage: Math.ceil(total / limit), current: page },
        "Success Find All Event"
      );
    } catch (error) {
      response.error(res, error, "Failed to get all Event!");
    }
  },

  async findOne(req: IReqUser, res: Response) {
    /*
      #swagger.tags = ['Events']
    */
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
    /*
      #swagger.tags = ['Events']
      #swagger.security = [{
        "bearerAuth": {}
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/EventRequest"
        }
      }
    */
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
    /*
      #swagger.tags = ['Events']
      #swagger.security = [{
        "bearerAuth": {}
      }]
    */
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
    /*
      #swagger.tags = ['Events']
    */
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
