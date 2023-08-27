import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TeamMember {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @Column({ unique: true })
  teamMemberId: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
