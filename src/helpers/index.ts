export function copyObj(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}
