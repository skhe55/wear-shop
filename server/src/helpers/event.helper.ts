import { HttpException } from "@nestjs/common";

export interface ReturnHelper<ResultType> {
    result: ResultType | null;
    status: string | HttpException;
    message?: string;
}