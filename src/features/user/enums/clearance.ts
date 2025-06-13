import { Role } from "./role";

const LevelZero = [Role.Public];
const LevelOne = [Role.Public, Role.Private, Role.Paid, Role.Admin, Role.Root];
const LevelTwo = [Role.Private, Role.Paid, Role.Admin, Role.Root];
const LevelThree = [Role.Paid, Role.Admin, Role.Root];
const LevelFour = [Role.Admin, Role.Root];
const LevelFive = [Role.Root];

export const Clearance = {
  LevelZero,
  LevelOne,
  LevelTwo,
  LevelThree,
  LevelFour,
  LevelFive,
};
