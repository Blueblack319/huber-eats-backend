import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.contants';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(@Inject(CONFIG_OPTIONS) private options: JwtModuleOptions) {}
  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.options.secretKey);
  }
}
