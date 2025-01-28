const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[],
): Partial<T> => {
  const finalObj: Partial<T> = {}

  for (const key of keys) {
    // if(obs[key]!== undefined){
    //     finalObj[key] = obs[key]
    // }
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key]
    }
  }
  return finalObj
}
export default pick
