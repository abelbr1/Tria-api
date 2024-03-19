import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  async bootstrapData() {
    // Create CEO
    const ceo = await this.createDepartment('CEO', 'Chief Executive Officer');

    const cfo = await this.createDepartment(
      'CFO',
      'Chief Financial Officer',
      ceo,
    );

    const cto = await this.createDepartment(
      'CTO',
      'Chief Technology Officer',
      ceo,
    );

    const cmo = await this.createDepartment(
      'CMO',
      'Chief Marketing Officer',
      ceo,
    );

    await this.createDepartment(
      'Finance Department',
      'Finance Department',
      cfo,
    );
    await this.createDepartment(
      'Accounting Department',
      'Accounting Department',
      cfo,
    );

    await this.createDepartment(
      'Engineering Department',
      'Engineering Department',
      cto,
    );
    await this.createDepartment('IT Department', 'IT Department', cto);

    await this.createDepartment(
      'Marketing Department',
      'Marketing Department',
      cmo,
    );
    await this.createDepartment('Sales Department', 'Sales Department', cmo);
  }

  async createDepartment(
    name: string,
    description: string,
    managingDepartment?: Department,
  ) {
    const department = this.departmentRepository.create({
      name,
      description,
      managingDepartment,
    });
    return this.departmentRepository.save(department);
  }
  async getDepartment(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id: id },
      relations: ['managingDepartment', 'subDepartments'],
    });
    return department;
  }

  async getAllDepartments(): Promise<Department[]> {
    const departments = await this.departmentRepository.find({
      relations: ['managingDepartment', 'subDepartments'],
    });

    return departments;
  }
}
