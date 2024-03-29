<template>
  <HomeLayout>
    <Header title="Transactions"/>
    <FilterBar :accounts="accounts" :reset-account-label="resetAccountLabel" :banks="banks" :selected-bank-id="selectedBankId" :selected-account-id="selectedAccountId" :filters-change="filtersChange"/>
    <div class="relative">
      <table class="table-fixed w-full">
        <thead class="block">
          <tr class="flex">
            <th class="block text-left font-normal border-y border-slate-200 py-4 text-slate-400 w-1/2">
              <span class="cursor-pointer select-none inline-block" @click="setSortBy('reference')">Reference</span>
              <client-only>
                <IconSort v-if="queryParameters.sortBy === 'reference'" :direction="queryParameters.sortOrder" />
              </client-only>
            </th>
            <th class="block text-left font-normal border-y border-slate-200 py-4 text-slate-400 w-2/6">
              <span class="cursor-pointer select-none inline-block" @click="setSortBy('category')">Category</span>
              <client-only>
                <IconSort v-if="queryParameters.sortBy === 'category'" :direction="queryParameters.sortOrder" />
              </client-only>
            </th>
            <th class="block text-left font-normal border-y border-slate-200 py-4 text-slate-400 w-1/12">
              <span class="cursor-pointer select-none inline-block" @click="setSortBy('date')">Date</span>
              <client-only>
                <IconSort v-if="queryParameters.sortBy === 'date'" :direction="queryParameters.sortOrder" />
              </client-only>
            </th>
            <th class="block text-right font-normal border-y border-slate-200 py-4 text-slate-400 w-1/12">
              <client-only>
                <IconSort v-if="queryParameters.sortBy === 'amount'" :direction="queryParameters.sortOrder" />
              </client-only>
              <span class="cursor-pointer select-none inline-block" @click="setSortBy('amount')">Amount</span>
            </th>
          </tr>
        </thead>
        <tbody class="block overflow-y-scroll" :style="{ width: 'calc(100vw - 3rem)', height: 'calc(100vh - 14rem)'}">
          <client-only>
            <tr v-if="$apollo.queries.transactions.loading && !transactions">
              <td>
                <div>Loading...</div>
              </td>
            </tr>
          </client-only>
          <tr :class="`flex ${index === transactions.length - 10 ? 'observing' : ''}`" v-for="(item, index) in transactions" :key="item.id">
            <td :class="`block py-3 border-y w-1/2 border-slate-100${item.reference ? '' : ' text-slate-300'}`">
              <nuxt-link :to="`/transactions/${item.id}`">{{ item.reference || 'No reference provided' }}</nuxt-link>
            </td>
            <td class="table-cell border-y border-slate-100 content-start w-2/6">
              <Tag
                v-if="item.category?.name"
                :name="item.category?.name"
                :color="item.category?.color"
              />
            </td>
            <td class="table-cell border-y border-slate-100 w-1/12">{{ format(new Date(item.date), 'MM/dd/yy') }}</td>
            <td class="table-cell border-y border-slate-100 text-right w-1/12">
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
import { format, lastDayOfMonth } from 'date-fns'
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
          dateFrom: this.dateFrom ? `${this.dateFrom}-01` : null,
          dateTo: this.dateTo ? format(lastDayOfMonth(new Date(`${this.dateTo}-01`)), 'yyyy-MM-dd') : null,
        };
      },
      result({ data }) {
        if (this.isClient && data.transactions.length > 0) {
          this.cursorId = data.transactions.at(-1).id;
          nextTick(() => {
            this.observer?.disconnect();
            const observingElement = document.querySelector(".observing");
            observingElement && this.observer?.observe(observingElement);
          })
        }
      },
    },
    accounts: {
      prefetch: true,
      query: getAccounts,
      variables() {
        return {
          bankId: this.selectedBankId
        };
      }
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
          dateFrom: this.dateFrom ? `${this.dateFrom}-01` : null,
          dateTo: this.dateTo ? format(lastDayOfMonth(new Date(`${this.dateTo}-01`)), 'yyyy-MM-dd') : null,
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
      dateFrom: '',
      dateTo: '',
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
    filtersChange(key, value) {
      switch (key) {
        case 'bankId':
          this.selectedBankId = value;
          this.selectedAccountId = null;
          this.resetAccountLabel = true; // trigger account dropdown label clearance
          break;
        case 'accountId':
          this.selectedAccountId = value;
          this.resetAccountLabel = false; // to make possible triggering it back
          if (!this.selectedBankId) {
            this.selectedBankId = this.accounts.find(account => account.id === value).bank.id;
          }
          break;
        case 'dateFrom':
          this.dateFrom = value;
          break;
        case 'dateTo':
          this.dateTo = value;
          break;
        case 'search':
          this.searchText = value;
          break;
      }
    },
  }
}
</script>

<style></style>
