<template>
  <div class="container">
    Transactions
    <div class="filter-block">
      <div class="filter-search">
        <input type="text" placeholder="Search" />
      </div>
      <div class="filter-bank">
        <input type="text" placeholder="Bank" />
      </div>
      <div class="filter-account">
        <input type="text" placeholder="Account" />
      </div>
      <div class="filter-starting-month">
        <input type="text" placeholder="Starting Month" />
      </div>
      <div class="filter-ending-month">
        <input type="text" placeholder="Ending Month" />
      </div>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="table-header-item">Reference</div>
        <div class="table-header-item">Category</div>
        <div class="table-header-item">Date</div>
        <div class="table-header-item">Amount</div>
      </div>
      <div class="table-data">
        <div class="table-data-item" v-for="item in transactions" :key="item.id">
          <div><nuxt-link :to="`/transactions/${item.id}`">{{ item.reference }}</nuxt-link></div>
          <div>{{ item.category }}</div>
          <div>{{ item.date }}</div>
          <div>{{ item.amount }}</div>
        </div>
      </div>
    </div>
    <nuxt-link to="/about">about</nuxt-link>
  </div>
</template>

<script>
import { getTransactions } from '~/apollo/queries/transactions.gql'

export default {
  apollo: {
    transactions: {
      prefetch: true,
      query: getTransactions,
    }
  }
}
</script>

<style></style>
