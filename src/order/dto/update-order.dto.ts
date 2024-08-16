import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { OrderStatus } from "../entities/order.entity";

export class UpdateOrderDto  {
  @IsNumber({}, {message: 'El id de la orden debe ser un numero'})
  @IsNotEmpty({message: 'id is required'})
  id: number;

  @IsNotEmpty({message: 'status is required'})
  @IsEnum(OrderStatus, {message: `Los status deben ser: ${Object.values(OrderStatus)}`})
  status: OrderStatus;
}
