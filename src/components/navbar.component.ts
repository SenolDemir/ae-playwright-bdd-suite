import { expect, type Locator, type Page } from "@playwright/test";

// components/NavBar.ts

export class NavBar {
  public readonly homePageLink: Locator = this.page.getByRole("link", { name: "Home" });
  public readonly productsLink: Locator = this.page.getByRole("link", { name: "Products" });
  public readonly cartLink: Locator = this.page.getByRole("link", { name: "Cart" });
  public readonly signupOrLoginLink: Locator = this.page.getByRole("link", { name: "Signup / Login" });
  public readonly logoutLink: Locator = this.page.getByRole("link", { name: "Logout" });
  public readonly contactUsLink: Locator = this.page.getByRole("link", { name: "Contact Us" });
  public readonly deleteAccountLink: Locator = this.page.getByRole("link", { name: "Delete Account" });
  public readonly loggedInAsText: Locator = this.page.getByText(/Logged in as/i);

  constructor(private readonly page: Page) {}

  async navigateTo(pageName: string): Promise<void> {
    pageName = pageName.trim();
    switch (pageName) {
      case "Signup / Login":
        await this.signupOrLoginLink.click();
        break;
      case "Products":
        await this.productsLink.click();
        break;
      case "Cart":
        await this.cartLink.click();
        break;
      case "Contact Us":
        await this.contactUsLink.click();
        break;
      default:
        throw new Error(`Unknown page: ${pageName}`);
    }
  }

  async getLoggedInUsername(): Promise<string> {
    const text = (await this.loggedInAsText.textContent())?.trim();
    if (!text) {
      throw new Error("Logged in username text not found");
    }
    return text;
  }

  async expectLoggedIn(fullName?: string): Promise<void> {
    await expect(this.page).toHaveURL(process.env.BASE_URL || "https://www.automationexercise.com/");
    await expect(this.loggedInAsText).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }

  async expectNotLoggedIn(): Promise<void> {
    const baseUrl = process.env.BASE_URL ?? "https://www.automationexercise.com";
    await expect(this.page).toHaveURL(new URL("/login", baseUrl).toString());
    await expect(this.signupOrLoginLink).toBeVisible();
    await expect(this.logoutLink).toHaveCount(0);
    await expect(this.deleteAccountLink).toHaveCount(0);
    await expect(this.loggedInAsText).toHaveCount(0);
  }
}
