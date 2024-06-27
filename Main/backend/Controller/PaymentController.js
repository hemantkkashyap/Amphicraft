import crypto from 'crypto';
import axios from 'axios';
import Participant from '../models/Participant.js'; // Import Participant model
import{MailtoAll }from './SendEmail.js'
import dotenv from 'dotenv';
dotenv.config();





const newPayment = async (req, res) => {
    try {
        const { transactionId, MUID, name, amount, number } = req.body;

        if (!transactionId || !MUID || !name || !amount || !number) {
            return res.status(400).send({
                message: 'All input fields are required',
                success: false
            });
        }

        const merchantTransactionId = transactionId;
        const data = {
            merchantId: process.env.MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: MUID,
            name: name,
            amount: amount * 100, // Assuming amount is in the smallest currency unit
            redirectUrl: `http://localhost:5000/api/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const uat_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const options = {
            method: 'POST',
            url: uat_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        console.log('Request Payload:', options.data);
        
        const response = await axios(options);
        return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url);
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response ? {
                data: error.response.data,
                status: error.response.status,
                headers: error.response.headers
            } : null,
            request: error.request || null,
            config: error.config || null
        });

        return res.status(500).send({
            message: error.message,
            success: false
        });
    }
};

const checkStatus = async (req, res) => {
    const merchantTransactionId = res.req.body.transactionId;
    const merchantId = res.req.body.merchantId;
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    try {
        const response = await axios(options);
        if (response.data.success === true) {
            await updateParticipantStatus(merchantTransactionId, 'success');
            const url = `http://localhost:3000/success`;
            return res.redirect(url);
        } else {
            await updateParticipantStatus(merchantTransactionId, 'failure');
            const url = `http://localhost:3000/failure`;
            return res.redirect(url);
        }
    } catch (error) {
        console.error(error);
    }
};

const updateParticipantStatus = async (transactionId, status) => {
    try {
        // Find user by email and OTP      
        const participent = await Participant.findOne({ transactionId });

        participent.status = status,
        await participent.save();
        const allparticipent = await Participant.findOne({ transactionId });
        return allparticipent;
    } catch (error) {
 console.error(`Error updating participant status for transaction ID ${transactionId}:`, error);
    }
};

export { newPayment, checkStatus, updateParticipantStatus };
