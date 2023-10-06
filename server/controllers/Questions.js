import mongoose from "mongoose";
import Questions from "../models/Questions.js";
import User from "../models/auth.js";

export const AskQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const userId = req.userId;
  const postQuestion = new Questions(postQuestionData);
  try {
    await postQuestion.save();
    const user = await User.findById(userId);
    if (user) {
      user.points += 2;
    }
    await user.save();
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Questions.find();
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    await Questions.findByIdAndRemove(_id);
    const user = await User.findById(userId);
    if (user) {
      user.points -= 2;
    }
    await user.save();
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(409).send("question unavailable...");
  }

  try {
    const question = await Questions.findById(_id);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }
    const questionAuthor = await User.findById(question.userId);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
        if (questionAuthor) {
          questionAuthor.points += 5;
        }
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
        questionAuthor.points -= 5;
      }
      
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
        questionAuthor.points-=5;
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await questionAuthor.save();
    await Questions.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "voted successfully..." });
  } catch (error) {
    res.status(501).json({ message: "id not found" });
  }
};
