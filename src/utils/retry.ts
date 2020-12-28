import { threadId } from "worker_threads";
import { sleep } from "./sleep";

export async function retryAsync<T=any>(action: () => Promise<T>, retriesAllowed: number = 3, sleepBetweenRetries: number = 1): Promise<T> {
  let currentRetries = 0;
  while (currentRetries < retriesAllowed) {
    try {
      const result = await action();
      return result;
    } catch (err) {
      currentRetries++;
      await sleep(sleepBetweenRetries)
    }
  }
  throw new Error()
}