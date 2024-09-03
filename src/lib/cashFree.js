import { Cashfree } from "cashfree-pg"; 

Cashfree.XClientId = process.env.CASH_FREE_CLIENT_ID
Cashfree.XClientSecret = process.env.CASH_FREE_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
// console.log(Cashfree.XClientId)
let cashfree =null

if (process.env.NODE_ENV === 'production') {
    cashfree = Cashfree
} else {
  if (!global.cashfree) {
    global.cashfree = Cashfree;
  }
  cashfree = global.cashfree;
}

export default cashfree;