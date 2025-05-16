import mongoose, { ClientSession } from "mongoose";

export class Service {
  ids: Set<string>;

  constructor() {
    this.ids = new Set();
  }

  addId(id: string) {
    this.ids.add(id);
  }

  removeId(id: string) {
    this.ids.delete(id);
  }

  hasId(id: string) {
    return this.ids.has(id);
  }

  async runAtomic(callback: (session: ClientSession) => Promise<void>) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      await callback(session);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      console.error("Transaction aborted:", error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}
