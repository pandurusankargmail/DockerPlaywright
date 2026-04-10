// utils/throttle.ts
export async function throttle(delay = 300) {
  return new Promise(resolve => setTimeout(resolve, delay));
}