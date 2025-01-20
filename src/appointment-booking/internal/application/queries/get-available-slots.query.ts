import { RequestContext } from '@Shared/request-context/request-context.dto';

export class GetAvailableSlotsQuery {
  constructor(
    public readonly ctx: RequestContext,
    public readonly limit: number,
    public readonly offset: number,
  ) {}
}
