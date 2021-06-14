import { Request, Response } from 'express';

const errorCatch = (authF: (req: Request, res: Response, next?) => void) => {
  const handleError = async (req: Request, res: Response, next) => {
    try {
      await authF(req, res, next);
    } catch (error) {
      res.status(400).json(error);
    }
  };
  return handleError;
};

export default errorCatch;