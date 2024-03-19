// department.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Department, (department) => department.subDepartments, {
    nullable: true,
  })
  managingDepartment: Department;

  @OneToMany(() => Department, (department) => department.managingDepartment)
  subDepartments: Department[];
}
