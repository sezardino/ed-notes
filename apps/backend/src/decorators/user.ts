import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();

	if (!request.user) return null;

	return request.user.id;
});

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();

	if (!request.user) return null;

	return request.user;
});
