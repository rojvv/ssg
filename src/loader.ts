import { sleep } from "./utils"

const loader = document.getElementById("loader")!

export async function displayLoader() {
  loader.style.display = "block"
  await sleep(500)
  loader.style.opacity = "1"
}

export async function hideLoader() {
  loader.style.opacity = "0"
  await sleep(500)
  loader.style.display = "none"
}
