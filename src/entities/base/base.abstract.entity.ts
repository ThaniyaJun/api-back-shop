import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @Column('nvarchar', { name: 'created_by' })
  createdBy: string;

  @CreateDateColumn({
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @Column('nvarchar', { length: 50, name: 'updated_by' })
  updatedBy: string;

  @UpdateDateColumn({
    name: 'updated_date',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedDate: Date;

  @DeleteDateColumn({
    name: 'deleted_date',
    type: 'timestamp',
    // onUpdate: 'CURRENT_TIMESTAMP()',
  })
  deletedDate: Date;
}
