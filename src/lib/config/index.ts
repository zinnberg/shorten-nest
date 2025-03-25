import { plainToInstance, Transform } from 'class-transformer';
import { 
    IsEnum, 
    IsNumber, 
    Max, 
    Min, 
    validateSync, 
    IsString,
    IsNotEmpty,
} from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
  Local = "local",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @Transform(({ value }) => value ?? Environment.Development)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  @Transform(({ value }) => value ?? 8080)
  HTTP_PORT: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value ?? 'localhost:5000')
  GRPC_PATH: string;

  @IsString()
  @IsNotEmpty()
  HOST: string;
}

export function validateConfig(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
      EnvironmentVariables,
      config,
      { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  
    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }