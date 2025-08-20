import crypto from "crypto";

export interface PayUConfig {
  merchantId: string;
  merchantKey: string;
  salt: string;
  isTestMode: boolean;
}

export interface PayUPaymentData {
  key: string;
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
}

export interface PayUResponse {
  status: string;
  error_Message?: string;
  txnid?: string;
  amount?: string;
  productinfo?: string;
  firstname?: string;
  email?: string;
  phone?: string;
  hash?: string;
}

// Get PayU configuration from environment variables
export function getPayUConfig(): PayUConfig {
  return {
    merchantId: process.env.PAYU_MERCHANT_ID || "",
    merchantKey: process.env.PAYU_MERCHANT_KEY || "",
    salt: process.env.PAYU_SALT || "",
    isTestMode:
      process.env.NODE_ENV === "development" ||
      process.env.PAYU_TEST_MODE === "true",
  };
}

// Generate a unique transaction ID
export function generateTxnId(memberId?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return memberId
    ? `AIM_${memberId}_${timestamp}_${random}`
    : `AIM_${timestamp}_${random}`;
}

// Generate PayU hash for payment
export function generatePayUHash(data: {
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  salt: string;
}): string {
  const { txnid, amount, productinfo, firstname, email, salt } = data;

  // PayU hash format: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
  const hashString = `${
    data.key || ""
  }|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;

  return crypto.createHash("sha512").update(hashString).digest("hex");
}

// Verify PayU response hash
export function verifyPayUResponse(data: PayUResponse, salt: string): boolean {
  const { txnid, amount, productinfo, firstname, email, phone, status, hash } =
    data;

  if (
    !txnid ||
    !amount ||
    !productinfo ||
    !firstname ||
    !email ||
    !phone ||
    !status ||
    !hash
  ) {
    return false;
  }

  const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}`;
  const calculatedHash = crypto
    .createHash("sha512")
    .update(hashString)
    .digest("hex");

  return calculatedHash === hash;
}

// Create PayU payment data
export function createPayUPaymentData(
  membershipType: string,
  amount: number,
  memberData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  },
  successUrl: string,
  failureUrl: string,
  memberId?: string
): PayUPaymentData {
  const config = getPayUConfig();
  const txnid = generateTxnId(memberId);
  const firstname = `${memberData.firstName} ${memberData.lastName}`;

  // Convert type to display name
  const typeToName = {
    associate: "Associate Member",
    allied: "Allied Member",
    premier: "Premier Member",
  };
  const displayName =
    typeToName[membershipType as keyof typeof typeToName] || membershipType;
  const productinfo = `AIM ${displayName}`;

  const hashData = {
    key: config.merchantKey,
    txnid,
    amount,
    productinfo,
    firstname,
    email: memberData.email,
    salt: config.salt,
  };

  const hash = generatePayUHash(hashData);

  return {
    key: config.merchantKey,
    txnid,
    amount,
    productinfo,
    firstname,
    email: memberData.email,
    phone: memberData.phone,
    surl: successUrl,
    furl: failureUrl,
    hash,
  };
}

// Get PayU payment URL
export function getPayUUrl(): string {
  const config = getPayUConfig();
  return config.isTestMode
    ? "https://test.payu.in/_payment"
    : "https://secure.payu.in/_payment";
}
