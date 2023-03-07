import express from "express";
const router = express.Router();
import UserLatch from "../models/userLatch.js";

router.post('/', async (req, res) => {
  const { address } = req.body;
  console.log(address);

  try {
    // Find user by address
    let user = await UserLatch.findOne({ address });

    // If user not found, create a new one
    if (!user) {
      user = new UserLatch({
        address: address,
        paired: false,
        accountId: null,
      });
    } 

    // Save user
    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


 
export default router;
