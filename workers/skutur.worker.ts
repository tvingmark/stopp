import * as Comlink from "comlink";

export interface SkuturWorkerApi {
  getBikes: typeof getBikes;
}

const skuturApi: SkuturWorkerApi = {
  getBikes,
};

async function getBikes() {
  const res = await fetch("URL");
  const json = res.json()
  // Store request locall
  console.dir(json)
  return []
}
