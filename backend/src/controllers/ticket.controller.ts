import { Response } from "express";
import response from "../utils/response";
import { IPaginationQuery, IReqUser } from "../utils/interface";
import TicketModel, { ticketDAO, TypeTicket } from "../models/ticket.model";
import { FilterQuery, isValidObjectId } from "mongoose";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      await ticketDAO.validate(req.body);

      const result = await TicketModel.create(req.body);

      response.success(res, result, "Ticket created successfully");
    } catch (error) {
      response.error(res, error, "Failed to create ticket");
    }
  },

  async findAll(req: IReqUser, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query: FilterQuery<TypeTicket> = {};

      if (search) {
        Object.assign(query, {
          ...query,
          $text: {
            $search: search,
          },
        });
      }

      const result = await TicketModel.find(query)
        .populate("events")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      const count = await TicketModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          total: count,
          current: page,
          totalPage: Math.ceil(count / limit),
        },
        "Tickets retrieved successfully"
      );
    } catch (error) {
      response.error(res, error, "Failed to find all tickets");
    }
  },

  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const result = await TicketModel.findById(id);

      response.success(res, result, "Ticket retrieved successfully");
    } catch (error) {
      response.error(res, error, "Failed to find ticket");
    }
  },

  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const result = await TicketModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      response.success(res, result, "Ticket updated successfully");
    } catch (error) {
      response.error(res, error, "Failed to update ticket");
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const result = await TicketModel.findByIdAndDelete(id, {
        new: true,
      });

      response.success(res, result, "Ticket removed successfully");
    } catch (error) {
      response.error(res, error, "Failed to remove ticket");
    }
  },

  async findByEvent(req: IReqUser, res: Response) {
    try {
      const { eventId } = req.params;

      if (!isValidObjectId(eventId)) {
        return response.error(res, null, "Event not found or Invalid event ID");
      }

      const result = await TicketModel.find({ events: eventId }).exec();

      if (!result || result.length === 0) {
        return response.error(res, null, "No tickets found for this event");
      }

      response.success(res, result, "Tickets found for the event");
    } catch (error) {
      response.error(res, error, "Failed to find tickets by event");
    }
  },
};
