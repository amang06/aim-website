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
  udf1?: string;
  surl: string;
  furl: string;
  hash: string;
}

export interface PayUResponse {
  status: string;
  error_Message?: string;
  txnid?: string;
  mihpayid?: string;
  amount?: string;
  productinfo?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  mode?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
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
  key: string;
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  salt: string;
}): string {
  const { key, txnid, amount, productinfo, firstname, email, udf1, salt } =
    data;

  // PayU hash format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${
    udf1 || ""
  }||||||||||${salt}`;

  console.log("PayU Hash Generation:", {
    hashString,
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1,
    salt: salt ? "Present" : "Missing",
  });

  return crypto.createHash("sha512").update(hashString).digest("hex");
}

// Verify PayU response hash
export function verifyPayUResponse(
  data: PayUResponse,
  salt: string,
  key: string
): boolean {
  const { txnid, amount, productinfo, firstname, email, status, hash, udf1 } =
    data;

  // Check for minimum required fields
  const essentialFields = [];
  if (!txnid) essentialFields.push("txnid");
  if (!amount) essentialFields.push("amount");
  if (!status) essentialFields.push("status");

  if (essentialFields.length > 0) {
    console.error("PayU response missing essential fields:", essentialFields);
    return false;
  }

  // If no hash is provided, we can't verify - but in test mode this might be acceptable
  if (!hash) {
    console.warn("PayU response missing hash - cannot verify authenticity");
    return false;
  }

  // PayU response hash format (from working implementation):
  // SALT|status||||||||||UDF1|email|firstname|productinfo|amount|txnid|KEY
  const responseHashString = `${salt}|${status}||||||||||${
    udf1 || ""
  }|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
  const calculatedResponseHash = crypto
    .createHash("sha512")
    .update(responseHashString)
    .digest("hex");

  console.log("PayU Response Hash Verification (Working Format):", {
    responseHashString,
    calculatedResponseHash,
    receivedHash: hash,
    matches: calculatedResponseHash === hash,
    status,
    txnid,
    amount,
    udf1,
    salt: salt ? "Present" : "Missing",
    key: key ? "Present" : "Missing",
  });

  return calculatedResponseHash === hash;
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
    udf1: memberId || "", // Use memberId as UDF1
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
    udf1: memberId || "",
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
