import { convertToLowerCase } from "@/utils/convertToLowerCase";

export const getTagKey = (str) =>
  convertToLowerCase(str.replace(/\s+/g, "%20"));
