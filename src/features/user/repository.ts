import { User } from "./model";
import { EditMode } from "@/global/enums";
import * as db from "@/global/utilities";
import { SignUpUserDTO, EditUserDTO } from "./schema";

const select =
  "firstname lastname username email role provider avatar hashedPassword isVerified payment subscriptionId";

export async function signUpUser(signUpUserDTO: SignUpUserDTO) {
  await db.saveOne(User, signUpUserDTO);
}

export async function getUserById(id: string) {
  return await db.getOne(User, {
    conditions: { _id: id },
    select,
  });
}

export async function getUserByUsername(username: string) {
  return await db.getOne(User, {
    conditions: { username },
    select,
  });
}

export async function getUserByEmail(email: string) {
  return await db.getOne(User, {
    conditions: { email },
    select,
  });
}

export async function editUserById(id: string, editUserDTO: EditUserDTO) {
  await db.editOne(User, {
    filter: { _id: id },
    update: editUserDTO,
    mode: EditMode.Set,
  });
}

export async function editUserByEmail(email: string, editUserDTO: EditUserDTO) {
  await db.editOne(User, {
    filter: { email },
    update: editUserDTO,
    mode: EditMode.Set,
  });
}

export async function editAvatarById(
  id: string,
  secure_url: string,
  public_id: string
) {
  await db.editOne(User, {
    filter: { _id: id },
    update: { avatar: { secureUrl: secure_url, publicId: public_id } },
    mode: EditMode.Set,
  });
}

export async function setFavBookIdById(id: string, favBookId: string) {
  await db.editOne(User, {
    filter: { _id: id },
    update: { favBookId },
    mode: EditMode.Set,
  });
}

export async function unsetFavBookIdById(id: string) {
  await db.editOne(User, {
    filter: { _id: id },
    update: { favBookId: null },
    mode: EditMode.Set,
  });
}

export async function unsetFavBookIdByFavBookId(
  favBookId: string,
  session?: any
) {
  await db.editMany(
    User,
    {
      filter: { favBookId },
      update: { favBookId: null },
      mode: EditMode.Set,
    },
    session
  );
}

export async function unsetFavBookIdFromAll(session?: any) {
  await db.editMany(
    User,
    {
      update: { favBookId: null },
      mode: EditMode.Set,
    },
    session
  );
}

export async function dropUserById(id: string, session?: any) {
  await db.dropOne(User, { _id: id }, session);
}
