export default function validateObject(target, message) {
  if (!target || typeof target !== 'object') {
    throw new TypeError(message);
  }
}
