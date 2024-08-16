import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { filtersOrdersDto } from './dto/filters-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';


@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('createOrder')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    return await   this.orderService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() body: filtersOrdersDto) {
    return this.orderService.findAll(body);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload() id: number) {
    return this.orderService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() body: UpdateOrderDto) {
    return this.orderService.changeOrderStatus(body);
  }

}
