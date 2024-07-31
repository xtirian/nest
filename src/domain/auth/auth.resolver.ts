/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { CreateUserInput } from './auth.input';

@Resolver((of: any) => AuthDto)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => [AuthDto])
  async users(): Promise<AuthDto[]> {
    return await this.authService.findAll();
  }
  @Query((returns) => AuthDto)
  async user(id: string): Promise<AuthDto | null> {
    return await this.authService.findOne(id);
  }

  @Mutation((returns) => AuthDto)
  async createUser(@Args('user') user: CreateUserInput): Promise<AuthDto> {
    console.log('ping');
    return await this.authService.create(user);
  }
  @Mutation((returns) => AuthDto)
  async updateUser(id: string, user: AuthDto): Promise<AuthDto | null> {
    return await this.authService.update(id, user);
  }
  @Mutation((returns) => AuthDto)
  async deleteUser(id: string): Promise<number> {
    return await this.authService.delete(id);
  }
}
