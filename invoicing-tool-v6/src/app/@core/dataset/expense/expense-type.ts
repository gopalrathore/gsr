export class ExpenseType {
  private data: string[] = [
    "Credit Card Charges",
    "Bank Fees and Charges",
    "Parking",
    "Control Account",
    "Advertising And Marketing",
    "Meals and Entertainment",
    "Office Supplies",
    "Travel Expense",
    "Telephone Expense",
    "Postage",
    "Bad Debt",
    "Printing and Stationery",
    "Salaries and Employee Wages",
    "Janitorial Expense",
    "Depreciation Expense",
    "Consultant Expense",
    "Repairs and Maintenance",
    "Other Expenses",
    "Rent Expense",
    "IT and Internet Expenses",
    "Automobile Expense",
    "Lodging"
  ];

  public getExpenseType(extras:string[]=[]): string[] {
    let types = [
      ...this.data,
      ...extras
    ];
    types.sort();
    return types;
  }
}