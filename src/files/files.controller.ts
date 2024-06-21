import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFiler } from './helpers/file-filter.helper';
import { diskStorage } from 'multer';
import { fileName } from './helpers/file-name.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Images')
@Controller('files')
export class FilesController {
  constructor(
    private readonly fileService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.fileService.getStaticProductImage(imageName);
    return res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFiler,
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileName,
      }),
    }),
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is a valid image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/uploads/${file.filename}`;

    return {
      secureUrl,
    };
  }
}
