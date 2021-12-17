import { switchSection } from "./sections"

const Perror = document.getElementById("Perror")!

export function displayError(error: any) {
  Perror.innerText = String(error)
  return switchSection("error")
}
