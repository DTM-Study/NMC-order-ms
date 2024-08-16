import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { RpcException } from '@nestjs/microservices';
import { filtersOrdersDto } from './dto/filters-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly dbOrder: Repository<Order>,
  ) { }
  async create(createOrderDto: CreateOrderDto) {
    const tempOrder = this.dbOrder.create(createOrderDto);
    try {
      await this.dbOrder.save(tempOrder);
    } catch (err) {
      const logger = new Logger('OrderMS');
      logger.error(err);
      throw new RpcException({ status: 500, message: "DB_Error" });
    }
    return { message: "Orden creada ", id: tempOrder.id };
  }



  async findAll(filters: filtersOrdersDto) {
    const total = await this.dbOrder.count({
      where: {
        status: filters.status
      }
    });
    const pages = Math.ceil(total / filters.limit);


    const orders = await this.dbOrder.find({
      skip: (filters.page - 1) * filters.limit,
      take: filters.limit,
      where: {
        status: filters.status
      }
    });

    if (orders.length === 0) {
      throw new RpcException({ status: 204, message: "No hay ordenes" });
    }

    return { data: orders, metadata: { total, pages, page: filters.page } };
  }

  async findOne(id: number) {
    const order = await this.dbOrder.findOne({
      where: { id: id },
    });
    if (!order) {
      throw new RpcException({ status: 404, message: "No existe la orden con id " + id });
    }
    return order;
  }

  async changeOrderStatus(body: UpdateOrderDto) {
    const order = await this.dbOrder.findOne({
      where: { id: body.id },
    });
    if (!order) {
      throw new RpcException({ status: 404, message: "No existe la orden con id " + body.id });
    }
    
    if (body.status === order.status) {
      return { message: "Orden modificada", id: order.id };
    }

    order.status = body.status;
    try {
      await this.dbOrder.save(order);
    } catch (err) {
      const logger = new Logger('OrderMS');
      logger.error(err);
      throw new RpcException({ status: 500, message: "DB_Error" });
    }

    return { message: "Orden modificada", id: order.id };
  }


}
