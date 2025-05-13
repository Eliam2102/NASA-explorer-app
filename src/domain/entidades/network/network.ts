// domain/interfaces/INetworkService.ts
export interface INetworkService {
  isOnline(): Promise<boolean>;
}