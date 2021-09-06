import { SetMetadata } from "@nestjs/common";

export const IsPublicRouteKey = 'isPublicRoute';
export const PublicRoute = () => SetMetadata(IsPublicRouteKey, true);