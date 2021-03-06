import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactionsReduced = this.transactions.reduce(
      (accumulator, { type, value }) => ({
        ...accumulator,
        [type]: accumulator[type] + value,
      }),
      { income: 0, outcome: 0 },
    );

    const { income, outcome } = transactionsReduced;

    const balance = {
      ...transactionsReduced,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
