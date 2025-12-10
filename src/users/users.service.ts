import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.phone) {
      user.phone = updateUserDto.phone;
    }
    if (updateUserDto.logoUrl) {
      user.logoUrl = updateUserDto.logoUrl;
    }
    if (updateUserDto.profession) {
      user.profession = updateUserDto.profession;
    }
    const updatedUser = await this.repository.save(user);
    const { password, ...result } = updatedUser;
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
