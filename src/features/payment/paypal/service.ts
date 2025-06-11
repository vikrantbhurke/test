import { UserService } from "../..";
import { EditUserDTO } from "../../user/schema";

export class PayPalService {
  userService: UserService;

  setUserService(userService: UserService) {
    this.userService = userService;
  }

  async editUserByEmail(email: string, editUserDTO: EditUserDTO) {
    return await this.userService.editUserByEmail(email, editUserDTO);
  }
}
