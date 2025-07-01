import { User } from "./model";
import { Repository } from "@/global/classes";
import { SignUpUserDTO, EditUserDTO } from "./schema";
import { EditMode, Type } from "@/global/enums";

export class UserRepository extends Repository {
  type = Type.All;
  select =
    "firstname lastname username email role provider avatar hashedPassword isVerified payment subscriptionId";

  async signUpUser(signUpUserDTO: SignUpUserDTO) {
    await this.saveOne(User, signUpUserDTO);
  }

  async getUserById(id: string) {
    return await this.getOne(User, {
      conditions: { _id: id },
      select: this.select,
    });
  }

  async getUserByUsername(username: string) {
    return await this.getOne(User, {
      conditions: { username },
      select: this.select,
    });
  }

  async getUserByEmail(email: string) {
    return await this.getOne(User, {
      conditions: { email },
      select: this.select,
    });
  }

  async editUserById(id: string, editUserDTO: EditUserDTO) {
    await this.editOne(User, {
      filter: { _id: id },
      update: editUserDTO,
      mode: EditMode.Set,
    });
  }

  async editUserByEmail(email: string, editUserDTO: EditUserDTO) {
    await this.editOne(User, {
      filter: { email },
      update: editUserDTO,
      mode: EditMode.Set,
    });
  }

  async editEmailById(id: string, email: string) {
    await this.editOne(User, {
      filter: { _id: id },
      update: { email },
      mode: EditMode.Set,
    });
  }

  async editAvatarById(id: string, secure_url: string, public_id: string) {
    await this.editOne(User, {
      filter: { _id: id },
      update: { avatar: { secureUrl: secure_url, publicId: public_id } },
      mode: EditMode.Set,
    });
  }

  async setFavBookIdById(id: string, favBookId: string) {
    await this.editOne(User, {
      filter: { _id: id },
      update: { favBookId },
      mode: EditMode.Set,
    });
  }

  async unsetFavBookIdById(id: string) {
    await this.editOne(User, {
      filter: { _id: id },
      update: { favBookId: null },
      mode: EditMode.Set,
    });
  }

  async unsetFavBookIdByFavBookId(favBookId: string, session?: any) {
    await this.editMany(
      User,
      {
        filter: { favBookId },
        update: { favBookId: null },
        mode: EditMode.Set,
      },
      session
    );
  }

  async unsetFavBookIdFromAll(session?: any) {
    await this.editMany(
      User,
      {
        update: { favBookId: null },
        mode: EditMode.Set,
      },
      session
    );
  }

  async dropUserById(id: string, session?: any) {
    await this.dropOne(User, { _id: id }, session);
  }
}
