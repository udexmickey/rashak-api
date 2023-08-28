import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Url } from 'url';

@Entity()
export class Partner {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @PrimaryColumn({ unique: true })
  partnerId: string;

  @Column()
  companyName: string;

  @Column()
  image: string | Url;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
