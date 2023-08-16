import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
// @ts-ignore
import { Account, Bank, Transaction } from '.prisma/client';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  bank?: Maybe<Bank>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AddAccountMutationResponse = MutationResponse & {
  __typename?: 'AddAccountMutationResponse';
  account?: Maybe<Account>;
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AddBankMutationResponse = MutationResponse & {
  __typename?: 'AddBankMutationResponse';
  bank?: Maybe<Bank>;
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AddCategoryMutationResponse = MutationResponse & {
  __typename?: 'AddCategoryMutationResponse';
  category?: Maybe<Category>;
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AddTransactionMutationResponse = MutationResponse & {
  __typename?: 'AddTransactionMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  transaction?: Maybe<Transaction>;
};

export type Bank = {
  __typename?: 'Bank';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Category = {
  __typename?: 'Category';
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Currency =
  | 'EUR'
  | 'GBP'
  | 'USD';

export type Mutation = {
  __typename?: 'Mutation';
  addAccount?: Maybe<AddAccountMutationResponse>;
  addBank?: Maybe<AddBankMutationResponse>;
  addCategory?: Maybe<AddCategoryMutationResponse>;
  addTransaction?: Maybe<AddTransactionMutationResponse>;
};


export type MutationAddAccountArgs = {
  bankId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddBankArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddCategoryArgs = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddTransactionArgs = {
  account?: InputMaybe<Scalars['ID']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  currency?: InputMaybe<Currency>;
  reference?: InputMaybe<Scalars['String']['input']>;
};

export type MutationResponse = {
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  accounts: Array<Account>;
  banks: Array<Bank>;
  categories: Array<Category>;
  totalTransactionsCount: Scalars['Int']['output'];
  transactions: Array<Transaction>;
};


export type QueryAccountsArgs = {
  bankId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTotalTransactionsCountArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTransactionsArgs = {
  transactionsInput: TransactionsQueryInput;
};

export type Sort =
  | 'asc'
  | 'desc';

export type Transaction = {
  __typename?: 'Transaction';
  account?: Maybe<Account>;
  amount: Scalars['Float']['output'];
  category?: Maybe<Category>;
  currency: Currency;
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  reference: Scalars['String']['output'];
};

export type TransactionsQueryInput = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  bankId?: InputMaybe<Scalars['ID']['input']>;
  cursorId?: InputMaybe<Scalars['ID']['input']>;
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Sort>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  MutationResponse: ( Omit<AddAccountMutationResponse, 'account'> & { account?: Maybe<RefType['Account']> } ) | ( Omit<AddBankMutationResponse, 'bank'> & { bank?: Maybe<RefType['Bank']> } ) | ( AddCategoryMutationResponse ) | ( Omit<AddTransactionMutationResponse, 'transaction'> & { transaction?: Maybe<RefType['Transaction']> } );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  AddAccountMutationResponse: ResolverTypeWrapper<Omit<AddAccountMutationResponse, 'account'> & { account?: Maybe<ResolversTypes['Account']> }>;
  AddBankMutationResponse: ResolverTypeWrapper<Omit<AddBankMutationResponse, 'bank'> & { bank?: Maybe<ResolversTypes['Bank']> }>;
  AddCategoryMutationResponse: ResolverTypeWrapper<AddCategoryMutationResponse>;
  AddTransactionMutationResponse: ResolverTypeWrapper<Omit<AddTransactionMutationResponse, 'transaction'> & { transaction?: Maybe<ResolversTypes['Transaction']> }>;
  Bank: ResolverTypeWrapper<Bank>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  Currency: Currency;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['MutationResponse']>;
  Query: ResolverTypeWrapper<{}>;
  Sort: Sort;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionsQueryInput: TransactionsQueryInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AddAccountMutationResponse: Omit<AddAccountMutationResponse, 'account'> & { account?: Maybe<ResolversParentTypes['Account']> };
  AddBankMutationResponse: Omit<AddBankMutationResponse, 'bank'> & { bank?: Maybe<ResolversParentTypes['Bank']> };
  AddCategoryMutationResponse: AddCategoryMutationResponse;
  AddTransactionMutationResponse: Omit<AddTransactionMutationResponse, 'transaction'> & { transaction?: Maybe<ResolversParentTypes['Transaction']> };
  Bank: Bank;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  MutationResponse: ResolversInterfaceTypes<ResolversParentTypes>['MutationResponse'];
  Query: {};
  String: Scalars['String']['output'];
  Transaction: Transaction;
  TransactionsQueryInput: TransactionsQueryInput;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  bank?: Resolver<Maybe<ResolversTypes['Bank']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddAccountMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddAccountMutationResponse'] = ResolversParentTypes['AddAccountMutationResponse']> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddBankMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddBankMutationResponse'] = ResolversParentTypes['AddBankMutationResponse']> = {
  bank?: Resolver<Maybe<ResolversTypes['Bank']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddCategoryMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddCategoryMutationResponse'] = ResolversParentTypes['AddCategoryMutationResponse']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddTransactionMutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddTransactionMutationResponse'] = ResolversParentTypes['AddTransactionMutationResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BankResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bank'] = ResolversParentTypes['Bank']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAccount?: Resolver<Maybe<ResolversTypes['AddAccountMutationResponse']>, ParentType, ContextType, Partial<MutationAddAccountArgs>>;
  addBank?: Resolver<Maybe<ResolversTypes['AddBankMutationResponse']>, ParentType, ContextType, Partial<MutationAddBankArgs>>;
  addCategory?: Resolver<Maybe<ResolversTypes['AddCategoryMutationResponse']>, ParentType, ContextType, Partial<MutationAddCategoryArgs>>;
  addTransaction?: Resolver<Maybe<ResolversTypes['AddTransactionMutationResponse']>, ParentType, ContextType, Partial<MutationAddTransactionArgs>>;
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'AddAccountMutationResponse' | 'AddBankMutationResponse' | 'AddCategoryMutationResponse' | 'AddTransactionMutationResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType, Partial<QueryAccountsArgs>>;
  banks?: Resolver<Array<ResolversTypes['Bank']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  totalTransactionsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryTotalTransactionsCountArgs>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'transactionsInput'>>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['Currency'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  AddAccountMutationResponse?: AddAccountMutationResponseResolvers<ContextType>;
  AddBankMutationResponse?: AddBankMutationResponseResolvers<ContextType>;
  AddCategoryMutationResponse?: AddCategoryMutationResponseResolvers<ContextType>;
  AddTransactionMutationResponse?: AddTransactionMutationResponseResolvers<ContextType>;
  Bank?: BankResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
};

