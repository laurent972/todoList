import {jwt,verify} from "jsonwebtoken";

export async function decrypt(token) {
    try {
      const { payload } = await verify(token, process.env.TOKEN_SECRET)
      return payload
    } catch (error) {
      console.log('Failed to verify session')
    }
  }