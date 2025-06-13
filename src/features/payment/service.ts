import { Status } from "../user/enums";
import { UserService } from "..";
import { EditUserDTO } from "../user/schema";

export class PaymentService {
  userService: UserService;

  setUserService(userService: UserService) {
    this.userService = userService;
  }

  async editUserByEmail(email: string, editUserDTO: EditUserDTO) {
    return await this.userService.editUserByEmail(email, editUserDTO);
  }

  getStatusColor = (status: Status) => {
    switch (status) {
      case Status.Active:
        return "green";
      case Status.Inactive:
        return "red";
      case Status.Suspended:
        return "yellow";
      default:
        return "gray";
    }
  };

  formatDateTime(isoString: any) {
    const date = new Date(isoString);

    // Extract date components
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getUTCFullYear();

    // Extract time components
    // let hours = date.getUTCHours();
    // const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    // const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    // hours = hours % 12 || 12;

    return `${day}/${month}/${year}`;
  }

  getDaySuffix(day: number) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
}
