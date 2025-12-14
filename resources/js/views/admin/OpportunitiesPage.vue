<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Manage Opportunities</h1>
        <p class="text-neutral-600 mt-2">Add, edit, or delete job postings and opportunities</p>
      </div>
      <button class="btn-primary">
        <Plus class="w-5 h-5 mr-2" />
        Add Opportunity
      </button>
    </div>

    <div class="space-y-4">
      <div v-for="opp in siteStore.opportunities" :key="opp.id" class="bg-white rounded-lg border border-neutral-200 p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3">
              <h3 class="text-xl font-bold">{{ opp.title }}</h3>
              <span :class="[
                'px-2 py-1 rounded text-xs font-medium',
                opp.type === 'job' ? 'bg-primary-100 text-primary-800' :
                opp.type === 'internship' ? 'bg-secondary-100 text-secondary-800' :
                'bg-accent-100 text-accent-800'
              ]">
                {{ opp.type }}
              </span>
            </div>
            <p class="text-neutral-600 mt-2">{{ opp.description }}</p>
            <p class="text-sm text-neutral-500 mt-2">Deadline: {{ opp.deadline }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 text-sm text-primary hover:bg-primary-50 rounded">Edit</button>
            <button class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
</script>

