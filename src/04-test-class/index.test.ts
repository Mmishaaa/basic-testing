// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';
describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100000;

    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100000;

    const bankAccount = getBankAccount(initialBalance);
    const currentBalance = bankAccount.getBalance();
    expect(() => bankAccount.withdraw(currentBalance + 1000)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100000;

    const senderAccount = getBankAccount(initialBalance);
    const recipientAccount = getBankAccount(initialBalance);
    const moneyToTransfer = senderAccount.getBalance() + 1000;
    expect(() =>
      senderAccount.transfer(moneyToTransfer, recipientAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100000;
    const moneyToTransfer = 1000;

    const senderAccount = getBankAccount(initialBalance);
    expect(() =>
      senderAccount.transfer(moneyToTransfer, senderAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100000;

    const bankAccount = getBankAccount(initialBalance);
    const moneyToDeposit = 1000;
    bankAccount.deposit(moneyToDeposit);
    expect(bankAccount.getBalance()).toBe(initialBalance + moneyToDeposit);
  });

  test('should withdraw money', () => {
    const initialBalance = 100000;
    const bankAccount = getBankAccount(initialBalance);
    const moneyToWithdraw = 1000;
    bankAccount.withdraw(moneyToWithdraw);
    expect(bankAccount.getBalance()).toBe(initialBalance - moneyToWithdraw);
  });

  test('should transfer money', () => {
    const initialBalance = 100000;
    const moneyToTransfer = 1000;

    const senderAccount = getBankAccount(initialBalance);
    const recipientAccount = getBankAccount(initialBalance);

    senderAccount.transfer(moneyToTransfer, recipientAccount);

    expect(senderAccount.getBalance()).toBe(initialBalance - moneyToTransfer);
    expect(recipientAccount.getBalance()).toBe(
      initialBalance + moneyToTransfer,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 100000;
    const bankAccount = getBankAccount(initialBalance);
    const randomBalance = 50;
    const randomRequestFailed = 1;
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(randomBalance)
      .mockReturnValueOnce(randomRequestFailed);

    const res = await bankAccount.fetchBalance();
    expect(res).toBe(randomBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100000;
    const balanceAfterFetch = 10;
    const bankAccount = getBankAccount(initialBalance);

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValueOnce(balanceAfterFetch);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(balanceAfterFetch);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 100000;
    const balanceAfterFetch = null;

    const bankAccount = getBankAccount(initialBalance);

    jest
      .spyOn(bankAccount, 'fetchBalance')
      .mockResolvedValueOnce(balanceAfterFetch);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
