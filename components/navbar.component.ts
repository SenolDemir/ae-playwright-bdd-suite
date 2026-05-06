import type { Locator, Page } from "@playwright/test";

// components/NavBar.ts
export class NavBar {
  public readonly productsLink: Locator = this.page.getByRole("link", { name: "Products" });
  public readonly signupOrLoginLink: Locator = this.page.getByRole("link", { name: "Signup / Login" });
  public readonly logoutLink: Locator = this.page.getByRole("link", { name: "Logout" });
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
          // Add navigation logic for the "Cart" page here
          break;
        case "Contact Us":
          // Add navigation logic for the "Contact Us" page here
          break;
        default:
          throw new Error(`Unknown page: ${pageName}`);
      }
   }


   
}