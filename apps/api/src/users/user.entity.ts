import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  username!: string

  @Column({ unique: true })
  email!: string

  @Column({ default: true })
  enabled!: boolean

  @Column({ default: 'email' })
  provider!: string

  @Column()
  password!: string

  @Column({ nullable: true, type: 'timestamptz' })
  verifiedAt!: Date | null

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @Column({ default: 0 })
  tokenVersion!: number
}
