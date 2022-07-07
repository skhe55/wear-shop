export const deleteItemsFromObj = (object: any) => {
    return Object.keys(object).forEach(key => object[key] === undefined && delete object[key])
}