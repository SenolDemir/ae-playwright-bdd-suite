import { test, expect } from "../../../src/fixtures/api.fixtures";
import { SignupClient } from "../../../src/clients/signup.client";
import { UserFactory } from "../../../src/data/UserFactory";

test.describe("Signup API CRUD Test", () => {

  test("CRUD Lifecycle", async ({ apiRequest, signupClient }) => {
    const payload = SignupClient.createNewUserPayload();
    let responseBody;
   

    await test.step("Create: new user account", async () => {
      const response = await apiRequest.post("createAccount", { form: payload });
      console.log(await response.json());
      // response message is 201 but the API returns 200
      expect(response.status()).toBe(200);
      responseBody = await response.json();
      expect(responseBody.responseCode).toBe(201);
    });

    await test.step("Read: verify user account", async () => {
      const response = await signupClient.getUserDetailsByEmail(payload.email);
      console.log(await response.json());
      expect(response.status()).toBe(200);
      responseBody = await response.json();
      expect(responseBody.responseCode).toBe(200);
    });

    await test.step("Update: Verify Update user account", async () => {
  
      // generate update palyoad with the same email and password of the existing user  
      const updatedPayload = SignupClient.createNewUserPayload({
        email: payload.email,
        password: payload.password,
      });
      
      const response = await apiRequest.put("updateAccount", { form: updatedPayload });
      console.log(await response.json());
      expect(response.status()).toBe(200);
      responseBody = await response.json();
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.message).toBe("User updated!");

    });

    await test.step("Delete: Verify Delete user account", async () => {

      const response = await apiRequest.delete("deleteAccount", { 
        form: { email: payload.email,
                password: payload.password }
      });
      console.log(await response.json());
      expect(response.status()).toBe(200);
      responseBody = await response.json();
      expect(responseBody.responseCode).toBe(200);
      expect(responseBody.message).toBe("Account deleted!");

    });
  });
});
