import jwt from "jsonwebtoken";

export function generateToken(userId: number) {
  const secret = process.env.JWT_SECRET || "testandosevoceleumeucodigo";
  return jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
}

import { Request, Response, NextFunction } from "express";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ error: "Token não encontrado" });

  const secret = process.env.JWT_SECRET || "testandosevoceleumeucodigo";

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    (req as any).user = decoded;
    next();
  });
}
