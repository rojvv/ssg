import { z } from "zod"

export const appIdS = z
  .string()
  .nonempty("The app ID can't be empty.")
  .regex(/^[0-9]+$/, "The app ID must be a number.")

export const appHashS = z.string().nonempty("The app hash can't be empty.")

export const numberS = z
  .string()
  .regex(/^\+/, 'The phone number must start with a "+".')
  .min(2, "The phone number is too short.")
  .regex(
    /^\+([0-9]| )+$/,
    "The phone number can only include a plus sign, numbers and spaces."
  )

export const codeS = z
  .string()
  .nonempty("The code can't be empty.")
  .regex(/^[0-9]+$/, "The code must be a number.")

export const passwordS = z.string().nonempty("The password can't be empty.")
