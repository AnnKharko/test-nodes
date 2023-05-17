import { Controller } from '@nestjs/common';
import { NodesService } from './nodes.services';

@Controller('node')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}
}
