// common/pipes/empty-to-undefined.pipe.ts
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class EmptyToUndefinedPipe implements PipeTransform {
  transform(value: any) {
    if (value === '') return undefined;
    return value;
  }
}
