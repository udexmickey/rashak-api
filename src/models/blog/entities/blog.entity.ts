import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Url } from 'url';

@Entity()
export class Blog {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryColumn({ unique: true })
  blogId?: string; //i only have this as optional cause it would be generated automatical from uuid

  @Column()
  image: string | Url;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @VersionColumn()
  __v: string;
}
