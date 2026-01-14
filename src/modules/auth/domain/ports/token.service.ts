export interface TokenService {
  sign(payload: object): Promise<string>;
}
