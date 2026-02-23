import { Body, Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TaskService, CreateTaskDto, SubmitTaskDto } from './task.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('instructor', 'super_admin', 'admin')
  async create(
    @Body() dto: CreateTaskDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.taskService.create(dto, req.user.id);
  }

  @Post(':id/submit')
  @UseGuards(RolesGuard)
  @Roles('student')
  async submit(
    @Param('id') id: string,
    @Body() dto: SubmitTaskDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.taskService.submit(id, req.user.id, dto);
  }
}
