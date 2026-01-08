import { NextFunction, Request, Response } from "express";
import { prisma } from "../connections/client";
import AppError from "../lib/custom-error";

/**
 * Transfer points from one user to another.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
export const transferPoints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, senderId, receiverId } = req.body;

  try {
    // Check if amount is valid
    if (amount <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }

    // Fetch sender and receiver
    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: senderId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    // Check if sender and receiver exists
    if (!sender) {
      throw new AppError("Sender not found", 404);
    }
    if (!receiver) {
      throw new AppError("Receiver not found", 404);
    }

    // Check if sender and receiver are the same
    if (sender.id === receiver.id) {
      throw new AppError("Sender and receiver cannot be the same", 400);
    }

    // Check if sender has enough points
    if (sender.points < amount) {
      throw new AppError("Sender does not have enough points", 400);
    }

    // Transfer points in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: senderId },
        data: { points: { decrement: amount } },
      });
      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });

      return res.status(200).json({
        status: "success",
        message: "Points transferred successfully",
      });
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * Get a user's points from the database.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function for error handling.
 *
 * @returns {Promise<Response>} A response object with the user's points.
 * If an error occurs, it returns a response object with a status code of 500 and an error message.
 */
export const getUsersPoint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user ID from the request parameters
    const { id } = req.params;

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, points: true },
    });

    // Check if the user exists
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Return the user's points
    return res
      .status(200)
      .json({ status: "success", message: "User found", data: user });
  } catch (error) {
    // Handle any errors that occurred
    next(error);
  }
};
