import { NumberConstants } from "../constants";

export class DateUtils {
  public static toSimpleDateString(date?: Date): string {
    if (!date) {
      return "";
    }
    
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  public static addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + NumberConstants.millisecondsInADay * days);
  }
}
