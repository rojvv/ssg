import { z } from "zod"
import { SSG } from "./ssg"
import { displayError } from "./errors"
import { switchSection } from "./sections"
import { displayLoader } from "./loader"
import { getForm, handleZodErrors } from "./utils"
import { appHashS, appIdS, codeS, numberS, passwordS } from "./specifications"

let resolveCode = (_code: string) => {}
let resolvePassword = (_password: string) => {}

async function Fmain(event: Event) {
  const { appId, appHash, number } = z
    .object({
      appId: appIdS,
      appHash: appHashS,
      number: numberS,
    })
    .parse(getForm(event))

  await displayLoader()

  const ssg = new SSG(appId, appHash, number)

  try {
    await ssg.start({
      code: () =>
        new Promise((r) => {
          resolveCode = r
          switchSection("code")
        }),
      password: (hint) =>
        new Promise((r) => {
          if (typeof hint !== "undefined") {
            document
              .getElementById("Ipassword")!
              .setAttribute("placeholder", hint)
          }

          resolvePassword = r
          switchSection("password")
        }),
      error: async (err) => {
        await ssg.destroy()
        await displayError(err)
        return false
      },
    })
  } catch (err) {
    await ssg.destroy()
    await displayError(err)
    return
  }

  await ssg.sendString()

  switchSection("success")
}

async function Fcode(event: Event) {
  const code = codeS.parse(getForm(event).code)
  await displayLoader()
  resolveCode(code)
}

async function Fpassword(event: Event) {
  const password = passwordS.parse(getForm(event).password)
  await displayLoader()
  resolvePassword(password)
}

async function Bdismiss() {
  await switchSection()
}

export function addListeners() {
  document.getElementById("Fmain")!.onsubmit = (event) => {
    event.preventDefault()
    return handleZodErrors(() => Fmain(event))
  }

  document.getElementById("Fcode")!.onsubmit = (event) => {
    event.preventDefault()
    return handleZodErrors(() => Fcode(event))
  }

  document.getElementById("Fpassword")!.onsubmit = (event) => {
    event.preventDefault()
    return handleZodErrors(() => Fpassword(event))
  }

  document.getElementById("Bdismiss")!.onclick = Bdismiss
}
