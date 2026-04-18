// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';

export function resolveAvatarUrl(data: Parse.Object): string {
  const avatar = data.get('avatar');
  if (avatar && avatar.get('avatar')) {
    return avatar.get('avatar').url();
  }
  return '';
}
