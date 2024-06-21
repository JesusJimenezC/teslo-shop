import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as slug from 'slug';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'products',
})
export class Product {
  @ApiProperty({
    example: 'e7d8b0a8-9b4f-4b7f-8f3f-2e5f4e1c0f6a',
    description: 'Unique identifier for the product',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    uniqueItems: true,
    description: 'Title of the product',
    example: 'T-Shirt Teslo',
  })
  @Column('text', {
    unique: true,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    example: 10.99,
    description: 'Price product',
  })
  @Column('float', {
    nullable: false,
    default: 0,
  })
  price: number;

  @ApiProperty({
    example: 'This is a T-Shirt Teslo',
    description: 'Description of the product',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 't-shirt-teslo',
    description: 'Slug of the product',
  })
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Stock of the product',
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['M', 'L', 'XL'],
    description: 'Sizes available for the product',
  })
  @Column('text', {
    array: true,
    nullable: false,
  })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product gender objective',
  })
  @Column('text', {
    nullable: false,
  })
  gender: string;

  @ApiProperty({
    example: ['t-shirt', 'teslo'],
    description: 'Product tags',
  })
  @Column('text', {
    array: true,
    nullable: false,
    default: [],
  })
  tags: string[];

  @ApiProperty({
    example: ['t-shirt-teslo-1.jpg', 't-shirt-teslo-2.jpg'],
    description: 'Product images',
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = slug(this.slug);
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = slug(this.slug);
  }
}
