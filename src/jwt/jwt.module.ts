import { DynamicModule, Module, Global, NestMiddleware } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        // provide는 뭐고 useValue는 뭐야? provide 형태로 제공하고 useValue에 준 값을 쓰겠다?
        // 아하! => @Inject(provide) private bananan => banana has options
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
