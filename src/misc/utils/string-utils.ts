export class StringUtils {
  public static format(value: string, ...args: any): string {
    return value.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  }
}
