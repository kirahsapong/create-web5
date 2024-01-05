import { Web5 } from "@web5/api";

export let web5: Web5, did: string;

export async function setupWeb5() {
  try {
    ({ web5, did } = await Web5.connect());
  } catch (e: any) {
    throw Error(e)
  }
}

