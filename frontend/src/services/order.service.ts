import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {
  createOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
  getOrders: (params: string) => instance.get(`${endpoint.ORDER}?${params}`),
  getOrderById: (id: string) => instance.get(`${endpoint.ORDER}/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    instance.put(`${endpoint.ORDER}/${id}/${status}`),
  deleteOrder: (id: string) => instance.delete(`${endpoint.ORDER}/${id}`),

  getMemberOrders: (params: string) =>
    instance.get(`${endpoint.ORDER}-history?${params}`),
};

export default orderServices;
