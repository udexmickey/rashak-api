import { ObjectId } from 'mongodb';
import { DepartmentEnum } from 'src/utils/Enum/department.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Admin {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @Column({ unique: true })
  adminId: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  department: DepartmentEnum;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
