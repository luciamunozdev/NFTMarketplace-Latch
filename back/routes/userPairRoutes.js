import express from "express";
const router = express.Router();
import dotenv from "dotenv";
import UserLatch from "../models/userLatch.js";
import latch from "../controller/index.js";

dotenv.config();
router.post('/', async (req, res) => {
	try {
		
	const { ClientWallet, code, ClientSignature } = req.body;
	console.log("Wallet: " + ClientWallet + " code: " + code + " signature: " + ClientSignature);
	let MY_APPID = process.env.MY_APPID
	let MY_SECRETKEY = process.env.MY_SECRETKEY


	let accountId = null;

	latch.init({ appId: MY_APPID, secretKey: MY_SECRETKEY });
	console.log("init done")
	latch.pair(code, async function (err, data) {
		if (data["data"]["accountId"]) {
			accountId = data["data"]["accountId"];

			UserLatch.findOne({ address: ClientWallet }, function (error, user) {
				if (error) {
					console.error(error);
					res.status(500).send("Server Error");
					return;
				}
				console.log("AccountId: " + accountId);

				if (!user) {
					user = new UserLatch({
						address: ClientWallet,
						paired: true,
						accountId: accountId
					});
				} else {
					user.paired = true;
					user.accountId = accountId;
				}

				user.save(function (error) {
					if (error) {
						console.error(error);
						res.status(500).send("Server Error");
					} else {
						res.json({ success: true });
					}
				});
			});
		} else if (data["error"]) {
			console.log(data);
		}
	}, ClientWallet, ClientSignature);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");

	}


});



export default router;
