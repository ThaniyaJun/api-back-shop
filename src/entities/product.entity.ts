import { Entity, Column, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/entities/base/base.abstract.entity';


@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'prd_id' })
  prdId: number;

  @Column('nvarchar', { name: 'prd_name' })
  prdName: string;

  @Column('nvarchar', { name: 'prd_desc' })
  prdDesc: string;

  @Column('decimal', { name: 'prd_price' })
  prdPrice: number;

  @Column('int', { name: 'qty' })
  qty: number;

  // @ManyToOne(() => ProvinceEntity, (province) => province.amphurs)
  // @JoinColumn({ name: 'province_id' })
  // province: Array<ProvinceEntity>;

}
