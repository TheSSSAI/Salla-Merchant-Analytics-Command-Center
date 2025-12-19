import { Receiver } from '@upstash/qstash';
import { ServiceConfig } from '../../src/config/ServiceConfig';

/**
 * QStashSignatureValidator
 * 
 * Middleware utility to verify that incoming requests to queue consumers
 * genuinely originate from Upstash QStash.
 * This prevents unauthorized actors from triggering internal processing logic
 * by guessing the Vercel function URL.
 */
export class QStashSignatureValidator {
  private receiver: Receiver;

  constructor() {
    // Requires QSTASH_CURRENT_SIGNING_KEY and QSTASH_NEXT_SIGNING_KEY in env
    this.receiver = new Receiver({
      currentSigningKey: ServiceConfig.qstashCurrentSigningKey,
      nextSigningKey: ServiceConfig.qstashNextSigningKey,
    });
  }

  /**
   * Verifies the signature of a request.
   * 
   * @param request The standard Request object (Web Standard)
   * @returns Promise<boolean> True if valid, False otherwise
   */
  public async verify(request: Request): Promise<boolean> {
    const signature = request.headers.get('upstash-signature');
    
    if (!signature) {
      console.warn('Missing Upstash Signature header');
      return false;
    }

    try {
      // Clone request to read text body without consuming original stream for downstream
      const body = await request.clone().text();

      const isValid = await this.receiver.verify({
        signature: signature,
        body: body,
        // Tolerance for clock skew (default is usually sufficient, explicitly setting if needed)
        clockTolerance: 30, 
      });

      return isValid;
    } catch (error) {
      console.error('QStash Signature Verification Failed:', error);
      return false;
    }
  }
}