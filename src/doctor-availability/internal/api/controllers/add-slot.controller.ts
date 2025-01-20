import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@Shared/dtos/base-api-response.dto';
import { AppLogger } from '@Shared/logger/logger.service';
import { ReqContext } from '@Shared/request-context/req-context.decorator';
import { RequestContext } from '@Shared/request-context/request-context.dto';

import { AddSlotDto } from '../../../shared/dtos/slot-input.dto';
import { SlotOutput } from '../../../shared/dtos/slot-output.dto';
import { SlotService } from '../../application/services/slot.service';

@ApiTags('doctors')
@Controller('doctors')
export class AddSlotsController {
  constructor(
    private readonly slotService: SlotService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AddSlotsController.name);
  }

  @Post('slots')
  @ApiOperation({
    summary: 'Allows a doctor to add new slots',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(SlotOutput),
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async addSlot(
    @ReqContext() ctx: RequestContext,
    @Body() input: AddSlotDto,
  ): Promise<BaseApiResponse<SlotOutput>> {
    this.logger.log(ctx, `${this.addSlot.name} was called`);

    const slot = await this.slotService.createSlot(ctx, input);

    return { data: slot, meta: {} };
  }
}
