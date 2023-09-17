import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(
  process.env, {
    Mongo__connection__String: str(),
    PORT: port(),
  }
);
