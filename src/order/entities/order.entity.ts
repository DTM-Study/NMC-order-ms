import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum OrderStatus {
    PENDING = 'PENDING',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED',
}
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    totalAmount: number;

    @Column()
    totalItems: number;

    @Column({default: false})
    paid: boolean

    @Column({default: OrderStatus.PENDING})
    status: OrderStatus;

    @Column({nullable: true})
    paidAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
