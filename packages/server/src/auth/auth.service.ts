import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(private sequalize: Sequelize) {}
}
