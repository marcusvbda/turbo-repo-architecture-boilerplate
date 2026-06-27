import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordDto {
  @ApiProperty()
  token!: string

  @ApiProperty({ example: 'newSecret123' })
  password!: string
}
