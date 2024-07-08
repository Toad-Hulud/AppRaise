import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserManagerDto,
} from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ['manager', 'subordinates'],
    });
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['manager', 'subordinates'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { name: createUserDto.name },
    });
    if (existingUser) {
      throw new HttpException(
        `User with name ${createUserDto.name} already exists`,
        400,
      );
    }
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const existingUser = await this.usersRepository.findOne({
      where: { name: updateUserDto.name },
    });
    if (existingUser && existingUser.id !== id) {
      throw new HttpException(
        `User with name ${updateUserDto.name} already exists`,
        400,
      );
    }
    const result = await this.usersRepository.update(id, {
      name: updateUserDto.name,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async isUserSubordinate(
    userId: string,
    potentialManagerId: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['subordinates'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const queue = [user];
    while (queue.length > 0) {
      const currentUser = queue.shift();
      if (currentUser?.id === potentialManagerId) {
        return true;
      }
      const subordinates = await this.usersRepository.find({
        where: { manager: currentUser },
        relations: ['subordinates'],
      });
      queue.push(...subordinates);
    }
    return false;
  }

  async updateManager(
    id: string,
    updateUserManagerDto: UpdateUserManagerDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['manager'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserManagerDto.managerId === null) {
      user.manager = null;
      return this.usersRepository.save(user);
    }

    const manager = await this.usersRepository.findOne({
      where: { id: updateUserManagerDto.managerId },
    });
    if (!manager) {
      throw new NotFoundException(
        `Manager with ID ${updateUserManagerDto.managerId} not found`,
      );
    }

    if (await this.isUserSubordinate(id, manager.id)) {
      throw new HttpException(
        `Cannot assign a subordinate as the manager`,
        400,
      );
    }

    user.manager = manager;

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['subordinates'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.manager) {
      for (const subordinate of user.subordinates) {
        subordinate.manager = user.manager;
        await this.usersRepository.save(subordinate);
      }
    } else {
      for (const subordinate of user.subordinates) {
        subordinate.manager = null;
        await this.usersRepository.save(subordinate);
      }
    }

    await this.usersRepository.delete(id);
  }

  async removeAll(): Promise<void> {
    await this.usersRepository.clear();
  }
}
