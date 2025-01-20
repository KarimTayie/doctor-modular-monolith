import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
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

import { BookAppointmentCommand } from '../../application/commands/book-appointment.command';
import { BookAppointmentInput } from '../dtos/appointment-input.dto';
import { AppointmentOutput } from '../dtos/appointment-output.dto';

@ApiTags('appointments')
@Controller('appointments')
export class BookAppointmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(BookAppointmentController.name);
  }

  @Post()
  @ApiOperation({
    summary: 'Book an appointment for a specific slot	Patient',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(AppointmentOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async bookAppointment(
    @ReqContext() ctx: RequestContext,
    @Body() input: BookAppointmentInput,
  ): Promise<BaseApiResponse<AppointmentOutput>> {
    this.logger.log(ctx, `${this.bookAppointment.name} was called`);

    const appointment = await this.commandBus.execute(
      new BookAppointmentCommand(
        ctx,
        input.slotId,
        input.patientId,
        input.patientName,
      ),
    );

    return { data: appointment, meta: {} };
  }
}
