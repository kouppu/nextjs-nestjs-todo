import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        messages: this.buildErrors(errors),
      });
    }
    return value;
  }

  /**
   * バリデーションエラーメッセージを作成する
   *
   * @param errors
   * @returns
   */
  private buildErrors(errors: ValidationError[]) {
    const result = [];
    errors.forEach((el) => {
      const prop = el.property;
      let message = '';
      Object.entries(el.constraints).forEach((constraint) => {
        message = constraint[1];
      });
      result.push({
        name: prop,
        message,
      });
    });

    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
