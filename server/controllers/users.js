import mongoose from "mongoose";
import users from "../models/auth.js";
import logInInfo from "../models/logInInfo.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
        points:user.points
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

export const userLoginInfo = async (req, res) => {
  const userId = req.userId
  try {
    const logininfo = await logInInfo.find({ id: userId });
    if (!logininfo) {
      return res.status(404).json({ message: "Login info not found" });
    }
    const loginHistory=logininfo.map((info) => {
      return {_id:info._id,deviceType:info.deviceType,os:info.os,ip:info.ip,browser:info.browser,loginAt:info.loginAt}
    })
    res.status(200).json({message:'ok',loginHistory})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
