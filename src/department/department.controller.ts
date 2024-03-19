import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';

@Controller('department')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  @Get('/bootstrap')
  async bootstrapData() {
    await this.departmentService.bootstrapData();
    return { message: 'Bootstrap data created successfully' };
  }
  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const dep = await this.departmentRepository.findOne({
      where: {
        id: createDepartmentDto.managingDepartment,
      },
    });
    if (dep) {
      return this.departmentService.createDepartment(
        createDepartmentDto.name,
        createDepartmentDto.description,
        dep,
      );
    }
    throw new NotFoundException(
      `Deparment With #Id${createDepartmentDto.managingDepartment} Not Found`,
    );
  }

  @Get()
  findAll() {
    return this.departmentService.getAllDepartments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.getDepartment(+id);
  }
}
