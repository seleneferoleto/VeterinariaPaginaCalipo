import { BadRequestError } from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";

export const parseId = (value) => {
  const id = Number(value);
  if (!/^[1-9]\d*$/.test(String(value)) || !Number.isSafeInteger(id)) {
    throw new BadRequestError(Messages.INVALID_ID);
  }
  return id;
};
