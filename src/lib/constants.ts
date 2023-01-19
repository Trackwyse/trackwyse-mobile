/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import ExpoConstants from "expo-constants";

import { stringifyVersion } from "@/lib/util/string";

const AppConstants = {
  version: ExpoConstants.manifest?.version,
  versionInt: stringifyVersion(ExpoConstants.manifest?.version || "0.0.0"),
};

export const TransactionStatusMessages = {
  UNCONFIRMED: {
    chipMessage: "Unconfirmed",
    chipType: "warning",
  },
  UNFULFILLED: {
    chipMessage: "Processing",
    chipType: "warning",
  },
  PARTIALLY_FULFILLED: {
    chipMessage: "Processing",
    chipType: "warning",
  },
  PARTIALLY_RETURNED: {
    chipMessage: "Processing",
    chipType: "warning",
  },
  RETURNED: {
    chipMessage: "Returned",
    chipType: "error",
  },
  FULFILLED: {
    chipMessage: "Completed",
    chipType: "success",
  },
  CANCELED: {
    chipMessage: "Canceled",
    chipType: "error",
  },
};

export const EventStatusMessages: { [key: string]: string } = {
  DRAFT_CREATED: "Draft order created",
  DRAFT_CREATED_FROM_REPLACE: "Draft order created from replace",
  ADDED_PRODUCTS: "Products were added to the order",
  REMOVED_PRODUCTS: "Products were removed from the order",
  PLACED: "Order was placed",
  PLACED_FROM_DRAFT: "Order was placed from draft",
  OVERSOLD_ITEMS: "Oversold items",
  CANCELED: "Order was canceled",
  ORDER_MARKED_AS_PAID: "Order was marked as paid",
  ORDER_FULLY_PAID: "Order was fully paid",
  ORDER_REPLACEMENT_CREATED: "Order replacement was created",
  ORDER_DISCOUNT_ADDED: "Order discount was added",
  ORDER_DISCOUNT_AUTOMATICALLY_UPDATED: "Order discount was automatically updated",
  ORDER_DISCOUNT_UPDATED: "Order discount was updated",
  ORDER_DISCOUNT_DELETED: "Order discount was deleted",
  ORDER_LINE_DISCOUNT_UPDATED: "Order line discount was updated",
  ORDER_LINE_DISCOUNT_REMOVED: "Order line discount was removed",
  ORDER_LINE_PRODUCT_DELETED: "Order line product was deleted",
  ORDER_LINE_VARIANT_DELETED: "Order line variant was deleted",
  UPDATED_ADDRESS: "Address was updated",
  EMAIL_SENT: "Email was sent",
  CONFIRMED: "Order was confirmed",
  PAYMENT_AUTHORIZED: "Payment was authorized",
  PAYMENT_CAPTURED: "Payment was captured",
  EXTERNAL_SERVICE_NOTIFICATION: "External service notification",
  PAYMENT_REFUNDED: "Payment was refunded",
  PAYMENT_VOIDED: "Payment was voided",
  PAYMENT_FAILED: "Payment failed",
  TRANSACTION_EVENT: "Transaction event",
  TRANSACTION_CAPTURE_REQUESTED: "Transaction capture requested",
  TRANSACTION_REFUND_REQUESTED: "Transaction refund requested",
  TRANSACTION_VOID_REQUESTED: "Transaction void requested",
  INVOICE_REQUESTED: "Invoice was requested",
  INVOICE_GENERATED: "Invoice was generated",
  INVOICE_UPDATED: "Invoice was updated",
  INVOICE_SENT: "Invoice was sent",
  FULFILLMENT_CANCELED: "Fulfillment was canceled",
  FULFILLMENT_RESTOCKED_ITEMS: "Fulfillment restocked items",
  FULFILLMENT_FULFILLED_ITEMS: "Fulfilled items",
  FULFILLMENT_REFUNDED: "Fulfillment was refunded",
  FULFILLMENT_RETURNED: "Fulfillment was returned",
  FULFILLMENT_REPLACED: "Fulfillment was replaced",
  FULFILLMENT_AWAITS_APPROVAL: "Fulfillment awaits approval",
  TRACKING_UPDATED: "Tracking was updated",
  NOTE_ADDED: "Note was added",
  OTHER: "Other",
};

export default AppConstants;
