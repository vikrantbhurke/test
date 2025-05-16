export class Exception {
  static getZodError(result: any) {
    return {
      success: false,
      error: "Validation failed",
      issues: result.error.flatten(),
    };
  }
}
