import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse'
import { request } from 'undici'

const prisma = new PrismaClient()

async function main() {
  const parserOptions = {
    bom: true,
    columns: true,
  }

  const { body: categoriesBody } = await request('https://raw.githubusercontent.com/fridayfinance/challenges/main/dev-fullstack/data/categories.csv')
  const categoriesData = await categoriesBody.text()
  parse(categoriesData, parserOptions, async (err, data) => {
    for (const row of data) {
      await prisma.category.upsert({
        where: {
          id: row.id,
        },
        update: {},
        create: row,
      })
    }
  })

  const { body: accountsBody } = await request('https://raw.githubusercontent.com/fridayfinance/challenges/main/dev-fullstack/data/accounts.csv')
  const accountsData = await accountsBody.text()
  const banksMap = new Map()
  parse(accountsData, parserOptions, async (err, data) => {
    for (const row of data) {
      if (!banksMap.has(data.bank)) {
        const bank = await prisma.bank.upsert({
          where: {
            name: row.bank,
          },
          update: {},
          create: {name: row.bank},
        })
        banksMap.set(row.bank, bank)
      }

      await prisma.account.upsert({
        where: {
          id: row.id,
        },
        update: {},
        create: {
          ...row,
          bank: {
            connect: {
              id: banksMap.get(row.bank).id,
            }
          }
        },
      })
    }
  })

  const { body: transactionsBody } = await request('https://raw.githubusercontent.com/fridayfinance/challenges/main/dev-fullstack/data/transactions.csv')
  const transactionsData = await transactionsBody.text()
  parse(transactionsData, parserOptions, async (err, data) => {
    for (const row of data) {
      if (!row.categoryId) {
        delete row.categoryId
      }
      await prisma.transaction.upsert({
        where: {
          id: row.id,
        },
        update: {},
        create: {
          ...row,
          date: new Date(row.date),
          amount: parseFloat(row.amount)
        },
      })
      console.log(row.id)
    }
    console.log('End of seeding')
  })
  console.log('Seeded database')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
