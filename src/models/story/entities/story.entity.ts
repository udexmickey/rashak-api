import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Url } from 'url';

@Entity()
export class Story {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @PrimaryColumn({ unique: true })
  storyId: string;

  @Column()
  image: string | Url;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  youtube_link?: string | Url;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
