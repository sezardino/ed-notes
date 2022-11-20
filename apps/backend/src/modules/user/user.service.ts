import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IUser } from 'shared';

import { PrismaService } from '@/modules/persistance/persistance.service';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(userData: Prisma.UserCreateInput) {
		const newUser = await this.prisma.user.create({ data: userData });

		delete newUser.password;

		return newUser;
	}

	async getUser(username: string): Promise<IUser | undefined> {
		return await this.prisma.user.findUnique({ where: { username } });
	}
}
