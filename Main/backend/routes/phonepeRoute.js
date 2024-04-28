import { newPayment, checkStatus} from '../Controller/PaymentController.js'; // Assuming PaymentController is in the same directory
import express from 'express';
import { MailtoAll } from '../Controller/SendEmail.js';
const router = express.Router();

router.post('/payment', newPayment);
router.post('/status/:txnId', checkStatus);
router.post('/sendemail',MailtoAll);
export default router;
