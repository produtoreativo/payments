import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class UploadService {
  constructor(
    @InjectS3() private readonly s3: S3,
  ) {}

  async sendJSON(id, provider, json) {
  
    const data = {
      Key: `${provider}-${id}`, 
      Body: JSON.stringify(json),
      ContentType: 'application/json',
      Bucket: 'prodops-payments',
      ACL: 'public-read'
    };

    const response: any = await this.s3.putObject(data).promise().catch(err => {
      console.log('Erro aws', err)
    });

    const { Location, Key } = response;
    console.log(Location, Key)
    return response;
  }
}
