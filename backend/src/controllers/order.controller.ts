import { FilterQuery } from "mongoose";
import { Response } from "express";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";
import OrderModel, {
  orderDAO,
  OrderStatus,
  TypeOrder,
  TypeVoucher,
} from "../models/order.model";
import TicketModel from "../models/ticket.model";
import { getId } from "../utils/id";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      // Ambil data user
      const userId = req.user?.id;
      // Ambil nilai dari form
      const payload = {
        ...req.body,
        createdBy: userId,
      } as TypeOrder;
      // validasi payload
      await orderDAO.validate(payload);

      // ambil data ticket
      const ticket = await TicketModel.findById(payload.ticket);
      // validasi ticket
      if (!ticket) return response.notFound(res, "Ticket not Found!");
      if (ticket.quantity < payload.quantity)
        return response.error(res, null, "Ticket quantity not enough!");

      // total pembayaran
      const total: number = +ticket?.price * +payload.quantity;
      // simpan hasil total ke dalam payload
      Object.assign(payload, {
        ...payload,
        total,
      });

      // buat Order
      const result = await OrderModel.create(payload);

      response.success(res, result, "Success create an Order");
    } catch (error) {
      response.error(res, error, "Failed to create an order!");
    }
  },
  async findAllByAdmin(req: IReqUser, res: Response) {
    try {
      const buildQuery = (filter: any) => {
        let query: FilterQuery<TypeOrder> = {};

        if (filter.search) query.$text = { $search: filter.search };

        return query;
      };

      const { limit = 10, page = 1, search } = req.query;

      const query = buildQuery({
        search,
      });

      const result = await OrderModel.find(query)
        .limit(+limit)
        .skip((+page - 1) * +limit)
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      if (!result) return response.notFound(res, "Order not found!");

      const total = await OrderModel.countDocuments(query);

      response.pagination(
        res,
        result,
        { total, totalPage: Math.ceil(total / +limit), current: +page },
        "Success Find All Order"
      );
    } catch (error) {
      response.error(res, error, "Failed to find order");
    }
  },
  async findAllByMember(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to find your order");
    }
  },
  async findOne(req: IReqUser, res: Response) {
    // berdasarkan orderId
    try {
      const { orderId } = req.params;

      const result = await OrderModel.findOne({
        orderId,
      });

      if (!result) response.notFound(res, "Specific order not found!");

      response.success(res, result, "Success to find specific order");
    } catch (error) {
      response.error(res, error, "Failed to find specific order");
    }
  },

  async complete(req: IReqUser, res: Response) {
    try {
      const { orderId } = req.params;
      const userId = req.user?.id;

      // CARI ORDER BERDASARKAN ID DAN CREATEDBY
      const order = await OrderModel.findOne({
        orderId,
        createdBy: userId,
      });

      if (!order) return response.notFound(res, "Order not found!");

      if (order.status == OrderStatus.COMPLETE)
        return response.error(res, null, "You have been completed this order");

      // GENERATE VOUCHER
      const vouchers: TypeVoucher[] = Array.from(
        { length: order.quantity },
        () => {
          return { isPrint: false, voucherId: getId() } as TypeVoucher;
        }
      );

      // UPDATE STATUS ORDER DAN SIMPAN
      const result = await OrderModel.findOneAndUpdate(
        {
          orderId,
          createdBy: userId,
        },
        {
          vouchers,
          status: OrderStatus.COMPLETE,
        },
        {
          new: true,
        }
      );

      // UPDATE QUANTITY TICKET (Dikurangi quantity order)
      const ticket = await TicketModel.findById(order.ticket);
      if (!ticket) return response.notFound(res, "Ticket and Order not found!");

      await TicketModel.updateOne(
        {
          _id: ticket.id,
        },
        {
          quantity: ticket.quantity - order.quantity,
        }
      );

      response.success(res, result, "Success to complete an order");
    } catch (error) {
      response.error(res, error, "Failed to completed order");
    }
  },
  async cencelled(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to cancelled order");
    }
  },
  async pending(req: IReqUser, res: Response) {
    try {
    } catch (error) {
      response.error(res, error, "Failed to pending order");
    }
  },
};
