import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  firstname: string;

  @Column('text')
  lastname: string;

  @Column('text')
  email: string;

  @Column('text')
  pass: string;
}
