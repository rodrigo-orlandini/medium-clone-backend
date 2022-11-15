import { TestSuiteTemplate } from "../helper/testing";

describe('Home', () => {
    it('GET /home', async () => {
        await TestSuiteTemplate.get200({ route: "/home" });
    });
});