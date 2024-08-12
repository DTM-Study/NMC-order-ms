import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { RpcException } from '@nestjs/microservices';

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



  async findAll() {
    const oders = await this.dbOrder.find();
    if (oders.length === 0) {
      throw new RpcException({ status: 204, message: "No hay ordenes" });
    }
    return oders;
  }

  async findOne(id: number) {
    const order = await this.dbOrder.findOne({
      where: { id:id},
    });
    if (!order) {
      throw new RpcException({ status: 404, message: "No existe la orden con id " + id });
    }
    return order;
  }


}
