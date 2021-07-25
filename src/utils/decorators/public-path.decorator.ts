import { SetMetadata } from "@nestjs/common";

export const IsPublicPathKey = 'isPublicPath';
export const PublicPath = () => SetMetadata(IsPublicPathKey, true);