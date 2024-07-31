import { CreateUserInput } from './auth.input';
import { AuthDto } from './auth.dto';
import { IAuthInterface } from '../interfaces/auth.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IAuthInterface>,
  ) {}

  async create(user: CreateUserInput): Promise<AuthDto> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
  async findAll(): Promise<IAuthInterface[]> {
    return await this.userModel.find().exec();
  }
  async findOne(id: string): Promise<IAuthInterface | null> {
    return await this.userModel.findOne({ _id: id });
  }
  async delete(id: string): Promise<any> {
    const deleteResult = await this.userModel.deleteOne({ _id: id });
    if (deleteResult.deletedCount === 0) {
      throw new Error('User not found');
    }
    return deleteResult.deletedCount;
  }
  async update(
    id: string,
    user: CreateUserInput,
  ): Promise<IAuthInterface | null> {
    return await this.userModel.findOneAndUpdate({ _id: id }, user, {
      new: true,
    });
  }
}
