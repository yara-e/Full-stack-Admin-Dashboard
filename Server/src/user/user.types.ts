//import { UserRole } from "../generated/prisma/enums";

// export interface FindUsersQuery{
//     page?:string;
//     limit?:string;
//     search?:string;
//     role?:UserRole  
// }

export type UserRole = "ADMIN" | "MANGER" | "USER";

export interface FindUsersQuery {
  limit?: string;
  after?: string;
  before?: string;
  search?: string;
  role?: UserRole;
}

