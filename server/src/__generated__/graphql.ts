import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Account, Bank, Transaction } from '.prisma/client';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  bank?: Maybe<Bank>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type AddAccountMutationResponse = MutationResponse & {
  __typename?: 'AddAccountMutationResponse';
  account?: Maybe<Account>;
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type AddBankMutationResponse = MutationResponse & {
  __typename?: 'AddBankMutationResponse';
  bank?: Maybe<Bank>;
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type AddCategoryMutationResponse = MutationResponse & {
  __typename?: 'AddCategoryMutationResponse';
  category?: Maybe<Category>;
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type AddTransactionMutationResponse = MutationResponse & {
  __typename?: 'AddTransactionMutationResponse';
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  transaction?: Maybe<Transaction>;
};

export type Bank = {
  __typename?: 'Bank';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Category = {
  __typename?: 'Category';
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
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
  bankId?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationAddBankArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationAddCategoryArgs = {
  color?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationAddTransactionArgs = {
  account?: InputMaybe<Scalars['ID']>;
  amount?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<Scalars['ID']>;
  currency?: InputMaybe<Currency>;
  reference?: InputMaybe<Scalars['String']>;
};

export type MutationResponse = {
  code: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  accounts?: Maybe<Array<Maybe<Account>>>;
  banks?: Maybe<Array<Maybe<Bank>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};


export type QueryTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  account?: Maybe<Account>;
  amount: Scalars['Float'];
  category?: Maybe<Category>;
  currency: Currency;
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  reference: Scalars['String'];
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



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  AddAccountMutationResponse: ResolverTypeWrapper<Omit<AddAccountMutationResponse, 'account'> & { account?: Maybe<ResolversTypes['Account']> }>;
  AddBankMutationResponse: ResolverTypeWrapper<Omit<AddBankMutationResponse, 'bank'> & { bank?: Maybe<ResolversTypes['Bank']> }>;
  AddCategoryMutationResponse: ResolverTypeWrapper<AddCategoryMutationResponse>;
  AddTransactionMutationResponse: ResolverTypeWrapper<Omit<AddTransactionMutationResponse, 'transaction'> & { transaction?: Maybe<ResolversTypes['Transaction']> }>;
  Bank: ResolverTypeWrapper<Bank>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Currency: Currency;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolversTypes['AddAccountMutationResponse'] | ResolversTypes['AddBankMutationResponse'] | ResolversTypes['AddCategoryMutationResponse'] | ResolversTypes['AddTransactionMutationResponse'];
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Transaction: ResolverTypeWrapper<Transaction>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AddAccountMutationResponse: Omit<AddAccountMutationResponse, 'account'> & { account?: Maybe<ResolversParentTypes['Account']> };
  AddBankMutationResponse: Omit<AddBankMutationResponse, 'bank'> & { bank?: Maybe<ResolversParentTypes['Bank']> };
  AddCategoryMutationResponse: AddCategoryMutationResponse;
  AddTransactionMutationResponse: Omit<AddTransactionMutationResponse, 'transaction'> & { transaction?: Maybe<ResolversParentTypes['Transaction']> };
  Bank: Bank;
  Boolean: Scalars['Boolean'];
  Category: Category;
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  MutationResponse: ResolversParentTypes['AddAccountMutationResponse'] | ResolversParentTypes['AddBankMutationResponse'] | ResolversParentTypes['AddCategoryMutationResponse'] | ResolversParentTypes['AddTransactionMutationResponse'];
  Query: {};
  String: Scalars['String'];
  Transaction: Transaction;
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
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Account']>>>, ParentType, ContextType>;
  banks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bank']>>>, ParentType, ContextType>;
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  transactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Transaction']>>>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'limit' | 'offset'>>;
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

