import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from 'shared';

import { PrismaService } from '@/modules/prisma';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(userData: Prisma.UserCreateInput) {
		const newUser = await this.prisma.user.create({ data: userData });

		delete newUser.password;

		return newUser;
	}

	async getUser(email: string): Promise<User | undefined> {
		return await this.prisma.user.findUnique({ where: { email } });
	}
}
