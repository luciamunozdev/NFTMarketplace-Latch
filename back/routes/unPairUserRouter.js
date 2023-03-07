import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import UserLatch from "../models/userLatch.js";
import latch from "../controller/index.js";

dotenv.config();

router.post('/', async (req, res) => {

	let address = req.body.addr;
	// get the user from the database which matches the address and take the accountId
	console.log('The address: ' + address)
	let MY_APPID = process.env.MY_APPID
	let MY_SECRETKEY = process.env.MY_SECRETKEY

	latch.init({ appId: MY_APPID, secretKey: MY_SECRETKEY });
	let accountId = await getAccountId(address);
	console.log("AccountId: " + accountId);

	latch.unpair(accountId, async function (err, data) {
		// Update the user in the database
		try {
			await UserLatch.updateOne(
				{ address },
				{ $set: { accountId: null, paired: false } }
			);
			console.log(`User with address ${address} was updated`);
		} catch (error) {
			console.error(error);
		}
	});


});

async function getAccountId(address) {
	try {
		const user = await UserLatch.findOne({ address });
		if (!user) {
			throw new Error(`No user found with address: ${address}`);
		}
		return user.accountId;
	} catch (error) {
		console.error(error);
	}
}

export default router;
