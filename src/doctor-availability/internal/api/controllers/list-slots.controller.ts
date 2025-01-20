import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@Shared/dtos/base-api-response.dto';
import { PaginationParamsDto } from '@Shared/dtos/pagination-params.dto';
import { AppLogger } from '@Shared/logger/logger.service';
import { ReqContext } from '@Shared/request-context/req-context.decorator';
import { RequestContext } from '@Shared/request-context/request-context.dto';

import { SlotOutput } from '../../../shared/dtos/slot-output.dto';
import { SlotService } from '../../application/services/slot.service';

@ApiTags('doctors')
@Controller('doctors')
export class ListSlotsController {
  constructor(
    private readonly slotService: SlotService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ListSlotsController.name);
  }

  @Get('slots')
  @ApiOperation({
    summary: 'Allows a doctor to list their slots',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(SlotOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async listSlots(
    @ReqContext() ctx: RequestContext,
    @Query() query: PaginationParamsDto,
  ): Promise<BaseApiResponse<SlotOutput[]>> {
    this.logger.log(ctx, `${this.listSlots.name} was called`);

    const { slots, count } = await this.slotService.listSlots(
      ctx,
      query.limit,
      query.offset,
    );

    return { data: slots, meta: { count } };
  }
}
