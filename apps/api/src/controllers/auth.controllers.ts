import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"
import {} from 'crypto'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  const newUser: PlatformUser = {
    id: null,
    email,
    password,
  }

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" })
    return
  }

  try {
    
    
    // do we need to set a jwt here? nothing specified!
    
    
    const hashedPw = (await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))).toString()
    await createUser({email, hashedPassword: hashedPw})
    res.status(201).json({ message: "User registered successfully" })


  } catch (error) {
    res.status(500).json({ message: "Error registering user", error })
  }
}
