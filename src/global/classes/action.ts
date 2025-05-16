export type MSuccess = { success: boolean; message: string };
export type MError = { success: boolean; error: string; issues: any };
export type MResponse = MSuccess | MError;

export class Action {
  static isSuccess = (r: MResponse): r is MSuccess => r.success;
}
