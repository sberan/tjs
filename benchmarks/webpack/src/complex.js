/**
 * Complex test case: nested objects, arrays, $defs, conditionals
 * This represents a complex real-world schema with advanced features.
 */
import { schema } from 'tjs';

const orderSchema = schema({
  $defs: {
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string', minLength: 2, maxLength: 2 },
        zip: { type: 'string', pattern: '^[0-9]{5}(-[0-9]{4})?$' },
        country: { type: 'string', default: 'US' },
      },
      required: ['street', 'city', 'state', 'zip'],
    },
    product: {
      type: 'object',
      properties: {
        sku: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'number', minimum: 0 },
        quantity: { type: 'integer', minimum: 1 },
      },
      required: ['sku', 'name', 'price', 'quantity'],
    },
  },
  type: 'object',
  properties: {
    orderId: { type: 'string', format: 'uuid' },
    customer: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
      },
      required: ['id', 'name', 'email'],
    },
    items: {
      type: 'array',
      items: { $ref: '#/$defs/product' },
      minItems: 1,
    },
    shippingAddress: { $ref: '#/$defs/address' },
    billingAddress: { $ref: '#/$defs/address' },
    sameAsShipping: { type: 'boolean' },
    paymentMethod: {
      type: 'string',
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
    },
    notes: { type: 'string', maxLength: 500 },
    createdAt: { type: 'string', format: 'date-time' },
    status: {
      type: 'string',
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    },
  },
  required: ['orderId', 'customer', 'items', 'shippingAddress', 'paymentMethod'],
  if: {
    properties: { sameAsShipping: { const: false } },
  },
  then: {
    required: ['billingAddress'],
  },
});

export { orderSchema };

export function validateOrder(data) {
  return orderSchema.validate(data);
}
