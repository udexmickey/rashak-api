import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class TeamMember {
  @ObjectIdColumn()
  _id: ObjectId | string;

  @PrimaryColumn({ unique: true })
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
