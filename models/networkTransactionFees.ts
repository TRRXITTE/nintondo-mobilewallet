import * as BlueElectrum from '../blue_modules/BlueElectrum';

export enum NetworkTransactionFeeType {
  FAST = 'Fast',
  MEDIUM = 'MEDIUM',
  SLOW = 'SLOW',
  CUSTOM = 'CUSTOM',
}

export class NetworkTransactionFee {
  static StorageKey = 'NetworkTransactionFee';

  public fastestFee: number;
  public mediumFee: number;
  public slowFee: number;

  constructor(fastestFee = 340, mediumFee = 170, slowFee = 100) {
    this.fastestFee = fastestFee;
    this.mediumFee = mediumFee;
    this.slowFee = slowFee;
  }
}

export default class NetworkTransactionFees {
  static async recommendedFees(): Promise<NetworkTransactionFee> {
    try {
      const isDisabled = await BlueElectrum.isDisabled();
      if (isDisabled) {
        throw new Error('Electrum is disabled. Dont attempt to fetch fees');
      }
      const response = await BlueElectrum.estimateFees();
      // Ensure minimum values for Dogecoin compatibility
      const fast = Math.max(response.fast, 340);
      const medium = Math.max(response.medium, 170);
      const slow = Math.max(response.slow, 100);
      
      if (fast === medium) {
        // exception, if fees are equal lets bump priority fee slightly so actual priority tx is above the rest
        return new NetworkTransactionFee(fast + 10, medium, slow);
      }
      return new NetworkTransactionFee(fast, medium, slow);
    } catch (err) {
      console.warn(err);
      return new NetworkTransactionFee(340, 170, 100);
    }
  }
}
