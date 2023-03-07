import mongoose from "mongoose";

const userLatchSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  paired: {
    type: Boolean,
    default: false,
  },
  accountId: {
    type: String,
    default: null,
  }
});


const UserLatch = mongoose.model("UserLatch", userLatchSchema);


export default UserLatch;

