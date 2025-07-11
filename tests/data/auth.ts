import * as dotenv from "dotenv";

dotenv.config();

export let VALID_USER = {
    EMAIL: process.env.EMAIL ?? "testtest@test.test",
    PASSWORD: process.env.PASSWORD ?? "123456",
    WRONG_PASSWORD: process.env.WRONG_PASSWORD ?? "654321",
    DEFAULT_NAME: process.env.DEFAULT_NAME ?? "Tester",
    EDIT_NAME: process.env.EDIT_NAME ?? "Edit tester"
};
