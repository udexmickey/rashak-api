import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  //Cloudinary service to upload one image
  async uploadImage(
    filename: Express.Multer.File,
    folder_destination: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!filename)
      throw new UnauthorizedException(
        'Kindly add an image "file"',
      ).getResponse();

    // Check if the size of the file is more than 1M
    if (filename.size > 1000000) {
      throw new Error('Please upload a file size not more than 1M');
    }
    // Check if the file is an image
    if (!filename.mimetype.startsWith('image')) {
      throw new Error('Sorry, this file is not an image, please try again');
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: `rashak/photos/${folder_destination}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(filename.buffer).pipe(upload);
    });
  }

  //Todo Add function/logic to upload multiple images
  async uploadMultipleImage() {
    return;
  }

  //Todo Add function/logic to upload a video
  async uploadVideo(
    filename: Express.Multer.File,
    folder_destination: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!filename)
      throw new UnauthorizedException(
        'Kindly add a video "file"',
      ).getResponse();

    // Check if the size of the file is more than 5M
    if (filename.size > 5000000) {
      throw new Error('Please upload a file(video) size not more than 5M');
    }

    if (!filename.mimetype.startsWith('video'))
      throw new BadRequestException('Please only upload video');

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: `rashak/videos/${folder_destination}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(filename.buffer).pipe(upload);
    });
  }

  //Todo Add function/logic to upload multiple videos
  // async uploadMultipleVideos() {
  //   return;
  // }
}
