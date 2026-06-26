import { ApiProperty } from '@nestjs/swagger'

export class RefreshDto {
  @ApiProperty({ description: 'Expired or valid JWT to refresh' })
  token!: string
}
