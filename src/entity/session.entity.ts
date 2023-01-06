import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  user_id: string;

  @Column('text')
  data: string;

  @Column('time with time zone')
  created_at: string;

  @Column('time with time zone')
  expired_at: string;

  @Column('time with time zone')
  last_accessed_at: string;
}