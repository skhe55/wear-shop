enum WearTypes {
    TSHIRT = 'T-shirt',
    HOODIE = 'Hoodie',
    PANTS = 'Pants'
  }
  
enum SizeTypes {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XLXL = '2XL'
  }
  
export type WearBlockProps = {
    id: number;
    product_name: string;
    price: number;
    image_url: string;
    sizes: SizeTypes[];
    rating: number;
    wear_type: WearTypes;
}