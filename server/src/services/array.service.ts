export class ArrayService {
    /**
     * Check value is array
     * @param value 
     * @returns {boolean}
     */
    public isArray<Type>(value: Type):boolean {
        try {
            if(Array.isArray(value)) {
                return true;
            }
            return false;
        } catch(error) {
            console.error(`Array Service | isArray error: ${error}`);
            return false;
        }
    }
    /**
     * Check array is not empty
     * @param array 
     * @returns {boolean}
     */
     public isNotEmpty<Type>(array: Type[]): boolean {
        try {
            if(this.isArray(array)) {
                for(const element of array) {
                    return true;
                }
                return false;
            }
            return false;
        } catch(error) {
            console.error(`Array Service | isNotEmpty error: ${error}`);
            return false;
        }
    }
}