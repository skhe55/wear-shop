import { WearEntity } from "../entities/wear.entity";
import { WEAR_REPOSITORY } from "./constants";

export const wearProvider = [
    {
        provide: WEAR_REPOSITORY,
        useValue: WearEntity
    }
]