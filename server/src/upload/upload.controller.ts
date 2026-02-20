import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorators/public.decorator';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  /** Upload resume file (public - used during registration). */
  @Public()
  @Post('resume')
  @UseInterceptors(FileInterceptor('file'))
  uploadResume(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return {
      message: 'Resume uploaded successfully',
      filename: file.filename,
      url: this.uploadService.getResumeUrl(file.filename),
      size: file.size,
    };
  }
}
