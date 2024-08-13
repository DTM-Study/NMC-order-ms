import { IsEnum, IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { OrderStatus } from "../entities/order.entity";
import { Type } from "class-transformer";

export class filtersOrdersDto {
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(()=>Number)
    page?: number=1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(()=>Number)
    limit?: number=10;

    @IsOptional()
    @IsEnum(OrderStatus , {  
        message: `Ajúste al formato de status de orden ${OrderStatus}`,
    })
    status?: OrderStatus = OrderStatus.PENDING;
}