<template>
  <HomeLayout>
    <Header title="Transactions"/>
    <FilterBar />
    <div class="relative">
      <table class="table-fixed w-full">
        <thead class="table-header-group">
          <tr class="table-row">
            <th class="table-cell text-left font-normal border-y border-slate-200 py-4 text-slate-400 w-1/2">Reference</th>
            <th class="table-cell text-left font-normal border-y border-slate-200 py-4 text-slate-400">Category</th>
            <th class="table-cell text-left font-normal border-y border-slate-200 py-4 text-slate-400 w-20">Date</th>
            <th class="table-cell text-right font-normal border-y border-slate-200 py-4 text-slate-400 w-32">Amount</th>
          </tr>
        </thead>
        <tbody class="table-row-group">
          <tr class="table-row" v-for="item in transactions" :key="item.id">
            <td :class="`table-cell py-3 border-y border-slate-100${item.reference ? '' : ' text-slate-300'}`"><nuxt-link :to="`/transactions/${item.id}`">{{ item.reference || 'No reference provided' }}</nuxt-link></td>
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
        </tbody>
      </table>
    </div>
  </HomeLayout>
</template>

<script>
import { format } from 'date-fns'
import Tag from '@/components/atoms/Tag.vue'
import FilterBar from '@/components/molecules/FilterBar.vue'
import HomeLayout from '@/components/templates/HomeLayout.vue'
import Header from '@/components/molecules/Header.vue';
import { getTransactions } from '~/apollo/queries/transactions.gql'

export default {
  components: {
    Header,
    HomeLayout,
    Tag,
    FilterBar,
  },
  apollo: {
    transactions: {
      prefetch: true,
      query: getTransactions,
    }
  },
  data() {
    return {
      format,
    }
  },
}
</script>

<style></style>
