// data/services/networkService.ts
import { isOnline as check } from '../../../utils/network';
import { INetworkService } from '../../../domain/entidades/network/network';


export class NetworkService implements INetworkService {
  async isOnline(): Promise<boolean> {
    return check();
  }
}