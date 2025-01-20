import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@Shared/dtos/base-api-response.dto';
import { PaginationParamsDto } from '@Shared/dtos/pagination-params.dto';
import { AppLogger } from '@Shared/logger/logger.service';
import { ReqContext } from '@Shared/request-context/req-context.decorator';
import { RequestContext } from '@Shared/request-context/request-context.dto';

import { AppointmentOutput } from '../../../../../appointment-booking/internal/api/dtos/appointment-output.dto';
import { ListUpcomingAppointmentsQuery } from '../../../core/queries/list-upcoming-appointments.query';

@ApiTags('appointments')
@Controller('appointments')
export class ListUpcomingAppointmentsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ListUpcomingAppointmentsController.name);
  }

  @Get('upcoming')
  @ApiOperation({
    summary: 'List all upcoming appointments',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([AppointmentOutput]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async handle(
    @ReqContext() ctx: RequestContext,
    @Query() query: PaginationParamsDto,
  ): Promise<BaseApiResponse<AppointmentOutput[]>> {
    this.logger.log(ctx, `${this.handle.name} was called`);

    const { appointments, count } = await this.queryBus.execute(
      new ListUpcomingAppointmentsQuery(ctx, query.limit, query.offset),
    );

    return { data: appointments, meta: { count } };
  }
}
