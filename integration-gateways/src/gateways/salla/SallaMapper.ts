import { GatewayException, GatewayErrorType } from '../../models/GatewayException';
import { 
    SallaOrderDTO, 
    SallaCustomerDTO, 
    SallaOrderItemDTO, 
    SallaProductDTO 
} from './SallaDTOs';
// Assuming internal domain interfaces are defined in contracts or shared models
// For the purpose of this file, we assume these interfaces match the ISallaGateway return types
export interface Order {
    id: string;
    referenceId: string;
    status: string;
    currency: string;
    totalAmount: number;
    subTotal: number;
    taxAmount: number;
    shippingAmount: number;
    createdAt: Date;
    customer: Customer;
    items: OrderItem[];
    paymentMethod: string;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    currency: string;
    imageUrl?: string;
}

/**
 * SallaMapper
 * 
 * Part of the Anti-Corruption Layer (ACL).
 * Responsible for transforming Salla's external Data Transfer Objects (DTOs) 
 * into clean, internal Domain Entities.
 * 
 * This ensures that changes in Salla's API schema do not propagate 
 * throughout the core application logic.
 */
export class SallaMapper {
    /**
     * Maps a Salla Order DTO to an internal Order entity.
     * @param dto The raw order data from Salla API
     * @returns Clean Order entity
     * @throws GatewayException if required fields are missing
     */
    public toDomainOrder(dto: SallaOrderDTO): Order {
        if (!dto || !dto.id) {
            throw new GatewayException(
                'Invalid Salla Order DTO: Missing ID',
                GatewayErrorType.VALIDATION_ERROR,
                { dto }
            );
        }

        try {
            const customer = this.toDomainCustomer(dto.customer);
            const items = Array.isArray(dto.items) 
                ? dto.items.map(item => this.toDomainOrderItem(item, dto.currency)) 
                : [];

            return {
                id: String(dto.id),
                referenceId: dto.reference_id || String(dto.id),
                status: dto.status?.slug || 'unknown',
                currency: dto.currency || 'SAR',
                totalAmount: this.parseMoney(dto.amounts?.total),
                subTotal: this.parseMoney(dto.amounts?.sub_total),
                taxAmount: this.parseMoney(dto.amounts?.tax),
                shippingAmount: this.parseMoney(dto.amounts?.shipping_cost),
                createdAt: this.parseDate(dto.created_at),
                customer: customer,
                items: items,
                paymentMethod: dto.payment_method || 'unknown'
            };
        } catch (error) {
            throw new GatewayException(
                `Failed to map Salla Order ${dto.id}`,
                GatewayErrorType.VALIDATION_ERROR,
                { originalError: error }
            );
        }
    }

    /**
     * Maps a Salla Customer DTO to an internal Customer entity.
     */
    public toDomainCustomer(dto: SallaCustomerDTO): Customer {
        if (!dto) {
            // Handle cases where customer data might be missing (e.g. guest checkout variations)
            return {
                id: 'guest',
                firstName: 'Guest',
                lastName: 'User',
                email: '',
                phone: '',
                country: 'Unknown',
                city: 'Unknown'
            };
        }

        return {
            id: String(dto.id),
            firstName: dto.first_name || '',
            lastName: dto.last_name || '',
            email: dto.email || '',
            phone: dto.mobile || '',
            country: dto.country || '',
            city: dto.city || ''
        };
    }

    /**
     * Maps a Salla Order Item DTO to an internal OrderItem entity.
     */
    public toDomainOrderItem(dto: SallaOrderItemDTO, currency: string): OrderItem {
        const amount = this.parseMoney(dto.amounts?.total);
        const quantity = dto.quantity || 0;
        
        // Calculate unit price if not explicitly provided in a clean format
        // Salla usually provides totals object
        const unitPrice = quantity > 0 ? amount / quantity : 0;

        return {
            id: String(dto.id),
            productId: String(dto.product?.id),
            productName: dto.product?.name || 'Unknown Product',
            sku: dto.sku || '',
            quantity: quantity,
            unitPrice: unitPrice,
            totalPrice: amount,
            currency: currency,
            imageUrl: dto.product?.thumbnail
        };
    }

    /**
     * Helper to safely parse monetary values which might come as strings or numbers.
     * Salla amounts object usually contains { amount: number, currency: string } 
     * or sometimes direct number values depending on endpoint versions.
     */
    private parseMoney(value: any): number {
        if (value === undefined || value === null) return 0;
        
        if (typeof value === 'number') return value;
        
        if (typeof value === 'object' && 'amount' in value) {
            return Number(value.amount) || 0;
        }

        const parsed = Number(value);
        return isNaN(parsed) ? 0 : parsed;
    }

    /**
     * Helper to safely parse dates.
     * Salla usually returns SallaDate object { date: string, timezone: string } or ISO string.
     */
    private parseDate(value: any): Date {
        if (!value) return new Date();

        if (value instanceof Date) return value;

        if (typeof value === 'object' && 'date' in value) {
            // Salla date object format: "2023-01-01 12:00:00.000000"
            return new Date(value.date);
        }

        return new Date(value);
    }
}