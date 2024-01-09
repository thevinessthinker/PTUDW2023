const passwordEncoder = require('../utils/passwordEncoder');
const accountService = require('./accountService');
const { db } = require('../config/db');
const AppError = require('../utils/appError');
const mail = require('../utils/email');
const { randomUUID } = require('crypto');
const Account = require('../models/accountModel');
const VerificationToken = require('../models/verificationTokenModel');
const EXPIRATION = 60 * 24; // one day

const signup = async (username, password, email, name) => {
    try {
        // 1. Create new account
        const encodedPassword = await passwordEncoder.encode(password);
        const savedAccount = await accountService.create(
            username,
            encodedPassword,
            email,
            name,
        );
        if (!savedAccount) {
            throw new AppError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                'Reigstration failed. Please try again',
            );
        }

        // 2. Send email confirmation
        const token = randomUUID();
        sendVerificationEmail(email, token, username);

        // 3. Create new token

        const savedToken = await createToken(token, savedAccount.id);
        if (!savedToken) {
            throw new AppError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                'Reigstration failed. Please try again',
            );
        }
    } catch (err) {
        throw err;
    }
};
const createToken = async (token, accountId) => {
    try {
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + EXPIRATION);
        const verificationToken = new VerificationToken({
            token,
            account_id: accountId,
            expiry_date: expiryDate,
        });
        const savedToken = await db.verificationTokenRepository.save(
            verificationToken,
        );
        return savedToken;
    } catch (err) {
        throw err;
    }
};
const sendVerificationEmail = (email, token, username) => {
    const emailContent = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body
                style="
                    font-family: Arial, sans-serif;
                    color: grey;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                "
            >
                <div
                    style="
                        background-color: #fff;
                        width: 80%;
                        height: 80%;
                        padding: 20px;
                    "
                    class="container"
                >
                    <h3 style="color: black; text">Xin chào ${username},</h3>
                    <p>
                        Cảm ơn bạn đã đăng ký tài khoản. Trước khi bắt đầu sử dụng hệ
                        thống, chúng tôi chỉ cần xác nhận đây là bạn. Nhấp vào nút bên
                        dưới để xác minh rằng địa chỉ email này chắc chắn là của bạn:
                    </p>
                    <a
                        href="https://localhost:3000/auth/signup/email-confirmation?token=${token}"
                        style="
                            display: inline-block;
                            padding: 10px 20px;
                            text-align: center;
                            text-decoration: none;
                            background-color: #1877f2;
                            color: #fff;
                            border: none;
                            border-radius: 4px;
                        "
                        >Xác nhận email</a
                    >
                </div>
            </body>
        </html>
        `;
    const subject = 'Yêu cầu xác minh: Đăng ký tài khoản mới';
    mail.sendEmail(email, subject, emailContent);
};

const getVerificationToken = async (token) => {
    try {
        const savedToken = await db.verificationTokenRepository.findByToken(
            token,
        );
        return savedToken;
    } catch (err) {
        throw err;
    }
};

const validateVerificationToken = async (token) => {
    try {
        // 1. get token
        const storedToken = await db.verificationTokenRepository.findByToken(
            token,
        );

        if (!storedToken) {
            return 'invalid';
        }

        const currentDate = new Date();
        const expiryDate = storedToken.expiry_date;
        console.log(expiryDate);
        if (currentDate.getTime() >= expiryDate.getTime()) {
            await db.verificationTokenRepository.delete(storedToken);
            return 'expired';
        }

        const accountId = storedToken.account_id;
        const savedAccount = await db.accountRepository.findById(accountId);
        const validatedAccount = new Account(savedAccount);
        validatedAccount.enabled = true;
        await db.accountRepository.update(validatedAccount);
        await db.verificationTokenRepository.delete(storedToken);
        return 'valid';
    } catch (err) {
        throw err;
    }
};

module.exports = {
    signup,
    getVerificationToken,
    validateVerificationToken,
};
