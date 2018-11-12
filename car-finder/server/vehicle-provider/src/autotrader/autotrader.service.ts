import { Injectable } from '@nestjs/common';

@Injectable()
export class AutotraderService {
    ping(): string {
        return 'AutotraderService!';
    }
}
