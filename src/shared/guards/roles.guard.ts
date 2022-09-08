// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { plainToInstance } from 'class-transformer';
// import { UserEntity as User } from 'src/entities/user.entity';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles || roles.length == 0) return true;

//     const request = context.switchToHttp().getRequest();
//     const user = plainToInstance(User, request.user);
//     return matchRoles(roles, user?.roles);
//   }
// }

// function matchRoles(roles: string[], userRoles: string[] = []): boolean {
//   let f = false;
//   for (let idx = 0; idx < userRoles.length; idx++) {
//     const el = userRoles[idx];
//     if (roles.includes(el)) {
//       f = true;
//       break;
//     }
//   }

//   return f;
// }
