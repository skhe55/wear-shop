import { ArrayService }  from "./array.service";

export class ObjectService {
    private arrayService: ArrayService;

    constructor() {
        this.arrayService = new ArrayService();
    }
    /**
     * Check object on iterable
     * @param object 
     * @returns {boolean}
     */
     public isIterable(object = {}): boolean {
        try {
            if( typeof object !== 'object') {
                return false;
            }
            for(const key in object) {
                if(Object.hasOwnProperty.call(object, key)) {
                    return true;
                }
            }
            return false;
        } catch(error) {
            console.error(`Object Service | isIterable: ${error}`);
            return false;
        }
    }

    /**
     * Return object withoud one field
     * @param field 
     * @param iterableObject 
     * @returns {object}
     */
    public overloadWithoutField(field:string = '', iterableObject:object): object {
        try {
            let args = {};

            if(!this.isIterable(iterableObject)) {
                return args;
            }

            for(const key in iterableObject) {
                if(Object.hasOwnProperty.call(iterableObject, key) && key !== field) {
                    args = {...args, [key]: iterableObject[key]};
                }
            }

            return args;
        } catch(error) {
            console.error(`Object Service | overloadWithoutField: ${error}`);
            return {};
        }
    }
    /**
     * Return object without many fields
     * @param fields 
     * @param iterableObject 
     * @returns {object}
     */
    overloadWithoutFields(fields:string[] = [], iterableObject:object): object {
        try {
            let tempSliceObject = [{...iterableObject}];
            if(!this.arrayService.isNotEmpty(fields)) {
                return {};
            }

            if(!this.isIterable(iterableObject)) {
                return {};
            }

            for(const fieldElement of fields) {
                tempSliceObject = [...tempSliceObject, {...this.overloadWithoutField(fieldElement, tempSliceObject[tempSliceObject.length - 1])}];
            }
            return tempSliceObject[tempSliceObject.length - 1];
        } catch(error) {
            console.error(`Object Service | overloadWithoutFields: ${error}`)
        }
    }
}