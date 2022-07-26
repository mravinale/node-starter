import { generate } from "randomstring";

export const generateMockUUID = (): string => {
  return `${generate({charset: 'hex', length: 8})}-${generate({charset: 'hex', length: 4})}-${generate({charset: 'hex', length: 4})}-${generate({charset: 'hex', length: 4})}-${generate({charset: 'hex', length: 12})}`;
};

export const generateUserModel = () => ({
  id: generateMockUUID(),
  email: generate(20),
  name: generate(20),
  phone: generate(20),
  skypeId: generate(20)
});
