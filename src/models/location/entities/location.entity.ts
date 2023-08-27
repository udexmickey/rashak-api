import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Location {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @PrimaryColumn({ unique: true })
  locationId: string;

  @Column()
  communities: string[];

  @Column()
  state: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
