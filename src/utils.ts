import { ZodError } from "zod"
import { displayError } from "./errors"

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export function getForm(event: any) {
  return Object.fromEntries(new FormData(event.currentTarget).entries())
}

export async function handleZodErrors(func: () => Promise<unknown>) {
  try {
    await func()
  } catch (err) {
    if (!(err instanceof ZodError)) {
      throw err
    }

    const flatErr = err.flatten()
    const errors = new Array<string>()

    for (const formError of flatErr.formErrors) {
      errors.push(formError)
    }

    for (const fieldError of Object.values(flatErr.fieldErrors)) {
      if (fieldError?.[0]) {
        errors.push(fieldError[0])
      }
    }

    await displayError(errors[0] ?? "An input is invalid.")
  }
}
