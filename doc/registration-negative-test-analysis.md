# User Registration - Negative Test Cases Analysis

## Field Requirements Discovery

### Step 1: Signup Form

| Field | Type | Required | Constraints | Boundary Cases |
|-------|------|----------|-------------|-----------------|
| Name | Text | ✅ Yes | Non-empty | Empty, spaces only, special chars, max length |
| Email | Email | ✅ Yes | Valid format, unique | Invalid format, existing email, empty, spaces |

### Step 2: Account Information Form

| Field | Type | Required | Constraints | Boundary Cases |
|-------|------|----------|-------------|-----------------|
| Title | Radio | ✅ Yes | Mr. or Mrs. | None selected |
| Password | Text | ✅ Yes | Min length, complexity | Too short, weak, empty, spaces |
| Day | Dropdown | ❌ No | 1-31 | Out of range if required |
| Month | Dropdown | ❌ No | Valid months | Invalid if required |
| Year | Dropdown | ❌ No | Valid years | Invalid if required |
| Newsletter | Checkbox | ❌ No | Boolean | N/A |
| Offers | Checkbox | ❌ No | Boolean | N/A |
| First Name | Text | ✅ Yes | Non-empty | Empty, spaces, special chars, max length |
| Last Name | Text | ✅ Yes | Non-empty | Empty, spaces, special chars, max length |
| Company | Text | ❌ No | Any text | Max length |
| Address 1 | Text | ✅ Yes | Non-empty | Empty, spaces, max length |
| Address 2 | Text | ❌ No | Any text | Max length |
| Country | Dropdown | ✅ Yes | Valid country | None selected |
| State | Text | ✅ Yes | Non-empty | Empty, spaces, max length |
| City | Text | ✅ Yes | Non-empty | Empty, spaces, max length |
| Zipcode | Text | ✅ Yes | Format depends on country | Empty, invalid format, max length |
| Mobile Number | Text | ✅ Yes | Valid format | Empty, invalid format, wrong length |

---

## Acceptance Criteria (AC) for Negative Scenarios

### AC - Signup Form Validation

**AC1: Empty Name Field**
```
Given user is on the signup form
When user enters empty name
And user enters a valid email
And user clicks signup
Then user should see error message "Name is required"
And user should remain on the signup form
```

**AC2: Empty Email Field**
```
Given user is on the signup form
When user enters a valid name
And user enters empty email
And user clicks signup
Then user should see error message "Email is required"
And user should remain on the signup form
```

**AC3: Invalid Email Format**
```
Given user is on the signup form
When user enters a valid name
And user enters invalid email format (e.g. "notanemail", "user@", "@domain.com")
And user clicks signup
Then user should see error message "Please enter a valid email address"
And user should remain on the signup form
```

**AC4: Duplicate Email**
```
Given user has an existing account with email "existing@example.com"
When user tries to signup with the same email "existing@example.com"
And user enters a valid name
And user clicks signup
Then user should see error message "Email Address already exists!"
And user should remain on the signup form
```

---

### AC - Account Information Form Validation

**AC5: Empty Password Field**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user leaves password field empty
And user fills all other required fields
And user clicks create account
Then user should see error message "Password is required"
And user should remain on the account information form
```

**AC6: Weak Password (Too Short)**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user enters password with less than required characters (e.g., "Pass1@")
And user fills all other required fields
And user clicks create account
Then user should see error message about minimum password length
And user should remain on the account information form
```

**AC7: Password Without Special Characters**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user enters password without special characters (e.g., "Password123")
And user fills all other required fields
And user clicks create account
Then user should see error message about password complexity (if enforced)
And user should remain on the account information form
```

**AC8: No Title Selected**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user does not select a title (Mr. or Mrs.)
And user fills all other required fields including password
And user clicks create account
Then user should see error message "Please select a title"
And user should remain on the account information form
```

**AC9: Empty First Name**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user leaves first name field empty
And user fills all other required fields
And user clicks create account
Then user should see error message "First name is required"
And user should remain on the account information form
```

**AC10: Empty Last Name**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user leaves last name field empty
And user fills all other required fields
And user clicks create account
Then user should see error message "Last name is required"
And user should remain on the account information form
```

**AC11: Empty Address 1**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user leaves address 1 field empty
And user fills all other required fields
And user clicks create account
Then user should see error message "Address is required"
And user should remain on the account information form
```

**AC12: Empty City**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user leaves city field empty
And user fills all other required fields
And user clicks create account
Then user should see error message "City is required"
And user should remain on the account information form
```

**AC13: Empty State**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user leaves state field empty
And user fills all other required fields
And user clicks create account
Then user should see error message "State is required"
And user should remain on the account information form
```

**AC14: Empty Zipcode**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user leaves zipcode field empty
And user fills all other required fields
And user clicks create account
Then user should see error message "Zipcode is required"
And user should remain on the account information form
```

**AC15: Empty Mobile Number**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user leaves mobile number field empty
And user fills all other required fields
And user clicks create account
Then user should see error message "Mobile Number is required"
And user should remain on the account information form
```

**AC16: Invalid Mobile Number Format**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user enters invalid mobile number format
And user fills all other required fields
And user clicks create account
Then user should see error message "Please enter a valid mobile number"
And user should remain on the account information form
```

**AC17: Invalid Zipcode Format**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user enters invalid zipcode format
And user fills all other required fields
And user clicks create account
Then user should see error message "Please enter a valid zipcode"
And user should remain on the account information form
```

**AC18: No Country Selected**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user does not select a country
And user fills all other required fields
And user clicks create account
Then user should see error message "Please select a country"
And user should remain on the account information form
```

**AC19: Spaces-Only Name**
```
Given user is on the signup form
When user enters only spaces in the name field
And user enters a valid email
And user clicks signup
Then user should see error message or field should be treated as empty
And user should remain on the signup form
```

**AC20: Spaces-Only Required Text Fields**
```
Given user has submitted valid signup credentials
And user is on the account information page
When user enters only spaces in first name, last name, or address fields
And user fills other required fields with valid data
And user clicks create account
Then user should see error message or field should be treated as empty
And user should remain on the account information form
```

---

## Negative Test Scenarios (Prioritized)

### Priority 1 (Critical Path - Must Test)

1. Empty required fields (name, email, password, first name, last name, address, city, state, zipcode, mobile, country, title)
2. Invalid email format
3. Duplicate email registration

### Priority 2 (High - Field Format Validation)

4. Invalid password (too short, weak)
5. Invalid mobile number format
6. Invalid zipcode format
7. Spaces-only in required text fields

### Priority 3 (Medium - Edge Cases)

8. Special characters in name fields
9. Very long input values
10. SQL injection attempts in text fields
11. Date of birth validation (if dates are required)

### Priority 4 (Low - Optional Fields)

12. Invalid company name format
13. Address 2 constraints
14. Newsletter/Offers checkbox combinations

---

## Recommended Test Execution Order

**Batch 1: Signup Form (2 tests)**
- Empty name
- Empty email

**Batch 2: Email Validation (2 tests)**
- Invalid email format
- Duplicate email

**Batch 3: Title & Password (2 tests)**
- No title selected
- Empty password

**Batch 4: Required Text Fields (5 tests)**
- Empty first name
- Empty last name
- Empty address 1
- Empty city
- Empty state

**Batch 5: Number Fields (3 tests)**
- Empty zipcode
- Empty mobile number
- Invalid mobile number

**Batch 6: Boundary Cases (3 tests)**
- Spaces-only name
- Week password (if enforced)
- Invalid zipcode format
