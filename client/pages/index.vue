<template>
  <HomeLayout>
    <Header title="Transactions"/>
    <FilterBar :accounts="accounts" :reset-account-label="resetAccountLabel" :banks="banks" :filters-change="filtersChange"/>
    <div class="relative">
      <table class="table-fixed w-full">
        <thead class="table-header-group">
          <tr class="table-row">
            <th class="table-cell text-left font-normal border-y border-slate-200 py-4 text-slate-400 w-1/2">
              <span class="cursor-pointer select-none inline-block" @click="setSortBy('reference')">Reference</span>
              <client-only>
                <IconSort v-if="queryParameters.sortBy === 'reference'" :direction="queryParameters.sortOrder" />
              </client-only>
            </th>
            <th class="table-cell text-left font-normal border-y border-slate-200 py-4 text-slate-400">
              <span class="cursor-pointer select-none inline-block" @click="setSortBy('category')">Category</span>
              <client-only>
                <IconSort v-if="queryParameters.sortBy === 'category'" :direction="queryParameters.sortOrder" />
              </client-only>
            </th>
            <th class="table-cell text-left font-normal border-y border-slate-200 py-4 text-slate-400 w-20">
              <span class="cursor-pointer select-none inline-block" @click="setSortBy('date')">Date</span>
              <client-only>
                <IconSort v-if="queryParameters.sortBy === 'date'" :direction="queryParameters.sortOrder" />
              </client-only>
            </th>
            <th class="table-cell text-right font-normal border-y border-slate-200 py-4 text-slate-400 w-32">
              <client-only>
                <IconSort v-if="queryParameters.sortBy === 'amount'" :direction="queryParameters.sortOrder" />
              </client-only>
              <span class="cursor-pointer select-none inline-block" @click="setSortBy('amount')">Amount</span>
            </th>
          </tr>
        </thead>
        <tbody class="table-row-group">
          <tr v-if="$apollo.queries.transactions.loading && !transactions">
            <td>
              <div>Loading...</div>
            </td>
          </tr>
          <tr :class="`table-row ${index === transactions.length - 10 ? 'observing' : ''}`" v-for="(item, index) in transactions" :key="item.id">
            <td :class="`table-cell py-3 border-y border-slate-100${item.reference ? '' : ' text-slate-300'}`">
              <nuxt-link :to="`/transactions/${item.id}`">{{ item.reference || 'No reference provided' }}</nuxt-link>
            </td>
            <td class="table-cell border-y border-slate-100 content-start">
              <Tag
                v-if="item.category?.name"
                :name="item.category?.name"
                :color="item.category?.color"
              />
            </td>
            <td class="table-cell border-y border-slate-100">{{ format(new Date(item.date), 'MM/dd/yy') }}</td>
            <td class="table-cell border-y border-slate-100 text-right">
              {{ item.amount.toFixed(2) }}
              <span class="text-slate-400">{{ item.currency }}</span>
            </td>
          </tr>
          <tr v-if="$apollo.queries.transactions.loading && transactions">
            <td>
              <div>Loading...</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </HomeLayout>
</template>

<script>
import { format } from 'date-fns'
import { nextTick } from 'vue'
import Tag from '@/components/atoms/Tag.vue'
import IconSort from '@/components/atoms/IconSort.vue';
import FilterBar from '@/components/molecules/FilterBar.vue'
import HomeLayout from '@/components/templates/HomeLayout.vue'
import Header from '@/components/molecules/Header.vue';
import { getTransactions, getTransactionsCount } from '~/apollo/queries/transactions.gql'
import { getAccounts } from '~/apollo/queries/accounts.gql'
import { getBanks } from '~/apollo/queries/banks.gql'
import { getQueryParameters, setQueryParameters } from '~/apollo/queries/queryParameters.gql'

export default {
  components: {
    Header,
    HomeLayout,
    Tag,
    FilterBar,
    IconSort,
  },
  apollo: {
    transactions: {
      prefetch: false,
      query: getTransactions,
      variables() {
        return {
          accountId: this.selectedAccountId,
          sortBy: this.queryParameters.sortBy,
          sortOrder: this.queryParameters.sortOrder,
          search: this.searchText,
        };
      },
      result({ data }) {
        if (this.isClient) {
          this.cursorId = data.transactions.at(-1).id;
          nextTick(() => {
            this.observer?.disconnect();
            this.observer?.observe(document.querySelector(".observing"));
          })
        }
      },
    },
    accounts: {
      prefetch: false,
      query: getAccounts,
      skip() {
        return !this.selectedBankId;
      },
      variables() {
        return {
          bankId: this.selectedBankId
        };
      },
    },
    banks: () => {
      return {
        prefetch: true,
        query: getBanks,
      };
    },
    totalTransactionsCount: {
      prefetch: true,
      query: getTransactionsCount,
      variables() {
        return {
          accountId: this.queryParameters.accountId,
          search: this.queryParameters.search,
        };
      }
    },
    queryParameters: {
      query: getQueryParameters,
      fetchPolicy: 'cache-only',
    },
  },
  data() {
    return {
      format,
      accounts: [],
      banks: [],
      selectedBankId: null,
      selectedAccountId: null,
      resetAccountLabel: false,
      searchText: '',
      totalTransactionsCount: 0,
      isClient: false,
      observer: null,
      cursorId: null,
      previousCursorId: null,
      queryParameters: {},
      intersectionCallback: (entries) => {
        if (entries[0].isIntersecting && this.transactions.length < this.totalTransactionsCount && this.cursorId !== this.previousCursorId) {
          this.$apollo.queries.transactions.fetchMore({
            variables: {
              cursorId: this.cursorId,
              sortBy: this.queryParameters.sortBy,
              sortOrder: this.queryParameters.sortOrder,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;

              return Object.assign({}, prev, {
                transactions: [...prev.transactions, ...fetchMoreResult.transactions]
              });
            },
          });
          this.previousCursorId = this.cursorId;
        }
      },
    }
  },
  mounted() {
    this.isClient = true;
    this.observer = new IntersectionObserver(this.intersectionCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    setSortBy(sortBy) {
      let sortOrder
      this.cursorId = null;
      if (this.queryParameters.sortBy === sortBy) {
        sortOrder = this.queryParameters.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        sortOrder = 'asc';
      }
      this.$apollo.mutate({
        mutation: setQueryParameters,
        variables: {
          sortBy,
          sortOrder,
        }
      })
    },
    filtersChange(diff) {
      if (diff.bankId) {
        this.selectedBankId = diff.bankId;
        this.selectedAccountId = null;
        this.resetAccountLabel = true; // trigger account dropdown label clearance
      } else if (diff.accountId) {
        this.selectedAccountId = diff.accountId;
        this.resetAccountLabel = false; // to make possible triggering it back
      } else if (diff.search) {
        this.searchText = diff.search;
      }
    },
  }
}
</script>

<style></style>
