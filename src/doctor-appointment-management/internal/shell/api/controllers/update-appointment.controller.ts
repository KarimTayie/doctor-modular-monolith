import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@Shared/dtos/base-api-response.dto';
import { AppLogger } from '@Shared/logger/logger.service';
import { ReqContext } from '@Shared/request-context/req-context.decorator';
import { RequestContext } from '@Shared/request-context/request-context.dto';

import { UpdateAppointmentInput } from '../../../../../appointment-booking/shared/dtos/appointment-input.dto';
import { AppointmentOutput } from '../../../../../appointment-booking/shared/dtos/appointment-output.dto';
import { UpdateAppointmentCommand } from '../../../core/commands/update-appointment.command';

@ApiTags('appointments')
@Controller('appointments')
export class UpdateAppointmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UpdateAppointmentController.name);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Mark an appointment as completed or cancelled ',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(AppointmentOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async handle(
    @ReqContext() ctx: RequestContext,
    @Param('id') appointmnetId: string,
    @Body() input: UpdateAppointmentInput,
  ): Promise<BaseApiResponse<AppointmentOutput>> {
    this.logger.log(ctx, `${this.handle.name} was called`);

    const updatedAppointment = await this.commandBus.execute(
      new UpdateAppointmentCommand(ctx, appointmnetId, input.status),
    );

    return { data: updatedAppointment, meta: {} };
  }
}
