import { User } from "./model";
import { Repository } from "@/global/classes";
import { SignUpUserDTO, EditUserDTO } from "./schema";

const select = "firstname lastname username email";

export class UserRepository extends Repository {
  async signUpUser(signUpUserDTO: SignUpUserDTO) {
    await this.saveOne(User, signUpUserDTO);
  }

  async getUserById(id: string) {
    return await this.getOne(User, { conditions: { _id: id }, select });
  }

  async getUserByUsername(username: string) {
    return await this.getOne(User, { conditions: { username }, select });
  }

  async getUserByEmail(email: string) {
    return await this.getOne(User, { conditions: { email }, select });
  }

  async editUserById(id: string, editUserDTO: EditUserDTO) {
    await this.editOne(User, {
      filter: { _id: id },
      update: editUserDTO,
      mode: "set",
    });
  }

  async editUserByEmail(email: string, editUserDTO: EditUserDTO) {
    await this.editOne(User, {
      filter: { email },
      update: editUserDTO,
      mode: "set",
    });
  }

  async editEmailById(id: string, email: string) {
    await this.editOne(User, {
      filter: { _id: id },
      update: { email },
      mode: "set",
    });
  }

  async editAvatarById(id: string, avatar: string) {
    await this.editOne(User, {
      filter: { _id: id },
      update: { avatar },
      mode: "set",
    });
  }

  async setFavBookIdById(id: string, favBookId: string) {
    await this.editOne(User, {
      filter: { _id: id },
      update: { favBookId },
      mode: "set",
    });
  }

  async unsetFavBookIdById(id: string) {
    await this.editOne(User, {
      filter: { _id: id },
      update: { favBookId: null },
      mode: "set",
    });
  }

  async unsetFavBookIdByFavBookId(favBookId: string, session?: any) {
    await this.editMany(
      User,
      {
        filter: { favBookId },
        update: { favBookId: null },
        mode: "set",
      },
      session
    );
  }

  async unsetFavBookIdFromAll(session?: any) {
    await this.editMany(
      User,
      {
        update: { favBookId: null },
        mode: "set",
      },
      session
    );
  }

  async dropUserById(id: string, session?: any) {
    await this.dropOne(User, { _id: id }, session);
  }
}
