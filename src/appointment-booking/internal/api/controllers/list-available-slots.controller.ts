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

import { SlotOutput } from '../../../../doctor-availability/shared/dtos/slot-output.dto';
import { GetAvailableSlotsQuery } from '../../application/queries/get-available-slots.query';

@ApiTags('slots')
@Controller('slots')
export class ListAvailableSlotsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ListAvailableSlotsController.name);
  }

  @Get('available')
  @ApiOperation({
    summary: 'List all available slots across all doctors',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([SlotOutput]),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async listAvailableSlots(
    @ReqContext() ctx: RequestContext,
    @Query() query: PaginationParamsDto,
  ): Promise<BaseApiResponse<SlotOutput[]>> {
    this.logger.log(ctx, `${this.listAvailableSlots.name} was called`);

    const { slots, count } = await this.queryBus.execute(
      new GetAvailableSlotsQuery(ctx, query.limit, query.offset),
    );

    return { data: slots, meta: { count } };
  }
}
